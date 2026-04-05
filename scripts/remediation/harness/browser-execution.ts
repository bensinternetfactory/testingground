import type { BrowserCheck, BrowserCheckObservation, RemediationUnit } from "../types.ts";
import { defaultCommandExecutor, type CommandExecutor } from "../validators/command.ts";
import { expandViewport, type ConcreteViewport } from "../validators/shared.ts";

interface BrowserAssertionResult {
  pass: boolean;
  notes: string[];
}

interface BrowserExecutionContext {
  baseUrl: string;
  check: BrowserCheck;
  viewport: ConcreteViewport;
  sessionName: string;
  commandExecutor: CommandExecutor;
  cwd: string;
}

export interface BrowserExecutionEnvironment {
  commandExecutor?: CommandExecutor;
  sessionName?: string;
}

type BrowserAssertionHandler = (context: BrowserExecutionContext) => BrowserAssertionResult;

function runAgentBrowser(
  context: BrowserExecutionContext,
  args: string[],
): { ok: boolean; stdout: string; stderr: string } {
  const result = context.commandExecutor("agent-browser", ["--session", context.sessionName, ...args], context.cwd);

  return {
    ok: result.exitCode === 0,
    stdout: result.stdout.trim(),
    stderr: result.stderr.trim(),
  };
}

function unwrapJsonString(value: string): string {
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "string" ? parsed : value;
  } catch {
    return value;
  }
}

function runEval(
  context: BrowserExecutionContext,
  body: string,
): BrowserAssertionResult {
  const wrapped = `
    (async () => {
      const text = (value) => (value ?? "").toString().replace(/\\s+/g, " ").trim();
      const isVisible = (element) => Boolean(element && (element.offsetWidth || element.offsetHeight || element.getClientRects().length));
      const rgbBrightness = (value) => {
        const match = /rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/.exec(value ?? "");
        if (!match) return 255;
        return (Number(match[1]) + Number(match[2]) + Number(match[3])) / 3;
      };
      const result = await (async () => { ${body} })();
      return JSON.stringify(result);
    })()
  `;
  const response = runAgentBrowser(context, ["eval", wrapped]);

  if (!response.ok) {
    return {
      pass: false,
      notes: [response.stderr || response.stdout || "agent-browser eval failed."],
    };
  }

  const raw = unwrapJsonString(response.stdout);

  try {
    const parsed = JSON.parse(raw) as BrowserAssertionResult;
    return {
      pass: Boolean(parsed.pass),
      notes: Array.isArray(parsed.notes) ? parsed.notes : [],
    };
  } catch {
    return {
      pass: false,
      notes: [`Could not parse agent-browser eval output: ${response.stdout}`],
    };
  }
}

function configureViewport(context: BrowserExecutionContext): BrowserAssertionResult {
  const response = context.viewport === "mobile"
    ? runAgentBrowser(context, ["set", "device", "iPhone 14"])
    : runAgentBrowser(context, ["set", "viewport", "1440", "1024"]);

  return response.ok
    ? {
        pass: true,
        notes: [`Viewport configured for ${context.viewport}.`],
      }
    : {
        pass: false,
        notes: [response.stderr || response.stdout || `Could not configure ${context.viewport} viewport.`],
      };
}

function openRoute(context: BrowserExecutionContext): BrowserAssertionResult {
  const targetUrl = new URL(context.check.route, context.baseUrl).toString();
  const openResult = runAgentBrowser(context, ["open", targetUrl]);

  if (!openResult.ok) {
    return {
      pass: false,
      notes: [openResult.stderr || openResult.stdout || `Could not open ${targetUrl}.`],
    };
  }

  const waitResult = runAgentBrowser(context, ["wait", "--load", "networkidle"]);

  if (!waitResult.ok) {
    return {
      pass: false,
      notes: [waitResult.stderr || waitResult.stdout || `Could not settle ${targetUrl}.`],
    };
  }

  runAgentBrowser(context, ["wait", "500"]);

  return runEval(
    context,
    `
      const main = document.querySelector("main");
      const bodyText = text(document.body?.textContent);
      return {
        pass: Boolean(main) && bodyText.length > 0,
        notes: [
          main ? "Main landmark detected." : "Missing <main> landmark.",
          bodyText.length > 0 ? "Page body rendered." : "Page body was empty.",
        ],
      };
    `,
  );
}

const ASSERTION_HANDLERS: Record<string, BrowserAssertionHandler> = {
  "FAQ renders in-flow and one item remains expanded by the single-open accordion logic.": (context) =>
    runEval(
      context,
      `
        const buttons = [...document.querySelectorAll("#faq button[aria-expanded]")];
        if (buttons.length < 2) {
          return { pass: false, notes: ["Expected at least two FAQ accordion buttons."] };
        }
        buttons[1].click();
        await new Promise((resolve) => setTimeout(resolve, 200));
        const openButtons = buttons.filter((button) => button.getAttribute("aria-expanded") === "true");
        return {
          pass: openButtons.length === 1 && openButtons[0] === buttons[1],
          notes: [
            \`Accordion button count: \${buttons.length}\`,
            \`Expanded button count after click: \${openButtons.length}\`,
          ],
        };
      `,
    ),
  "Schema and visible answer copy are produced from the same canonical answer source.": (context) =>
    runEval(
      context,
      `
        const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
        const schemaAnswers = [];
        for (const script of scripts) {
          try {
            const payload = JSON.parse(script.textContent ?? "null");
            const candidates = Array.isArray(payload) ? payload : [payload];
            for (const candidate of candidates) {
              if (candidate?.["@type"] === "FAQPage" && Array.isArray(candidate.mainEntity)) {
                for (const entity of candidate.mainEntity) {
                  const answerText = text(entity?.acceptedAnswer?.text);
                  if (answerText) schemaAnswers.push(answerText);
                }
              }
            }
          } catch {}
        }
        const visibleAnswers = [...document.querySelectorAll("#faq [role='region'] p")]
          .map((node) => text(node.textContent))
          .filter(Boolean);
        const missing = schemaAnswers.filter((answer) => !visibleAnswers.includes(answer));
        return {
          pass: schemaAnswers.length > 0 && missing.length === 0,
          notes: [
            \`Schema answers: \${schemaAnswers.length}\`,
            \`Visible answers: \${visibleAnswers.length}\`,
            ...(missing.length > 0 ? [\`Missing visible answers: \${missing.join(" | ")}\`] : []),
          ],
        };
      `,
    ),
  "Drawer still opens from a financing route after the provider moves out of RootLayout.": (context) =>
    runEval(
      context,
      `
        const trigger = document.querySelector("a[href='#get-pre-approved'], a[href$='#get-pre-approved'], a[data-drawer-title], button[data-drawer-title]");
        if (!trigger) {
          return { pass: false, notes: ["Could not find a drawer trigger on the page."] };
        }
        trigger.click();
        await new Promise((resolve) => setTimeout(resolve, 300));
        const dialog = document.querySelector("[role='dialog'], [data-state='open']");
        return {
          pass: Boolean(dialog) && isVisible(dialog),
          notes: [dialog ? "Drawer dialog opened." : "Drawer dialog did not open."],
        };
      `,
    ),
  "Sticky-nav primary CTA resolves to the same-page drawer hash instead of the rollback route.": (context) =>
    runEval(
      context,
      `
        const nav = document.querySelector("[data-sticky-nav-root]");
        const links = [...(nav?.querySelectorAll("a[href]") ?? [])];
        const match = links.find((link) => {
          const url = new URL(link.href, window.location.href);
          return url.pathname === window.location.pathname && url.hash === "#get-pre-approved";
        });
        return {
          pass: Boolean(match),
          notes: [
            nav ? "Sticky nav detected." : "Sticky nav root missing.",
            match ? \`Resolved CTA href: \${match.getAttribute("href")}\` : "No same-page drawer CTA found in the sticky nav.",
          ],
        };
      `,
    ),
  "Framed hero variant still renders with the same CTA enablement and media layout behavior after shell extraction.": (context) =>
    runEval(
      context,
      `
        const heading = document.querySelector("main h1");
        const cta = [...document.querySelectorAll("a,button")].find((node) => /pre-approval|estimate|get financed|apply/i.test(text(node.textContent)));
        const media = [...document.querySelectorAll("main img, main video")].find((node) => isVisible(node));
        return {
          pass: Boolean(heading) && Boolean(cta) && Boolean(media) && !cta?.hasAttribute("disabled"),
          notes: [
            heading ? "Hero heading rendered." : "Hero heading missing.",
            cta ? "Primary CTA rendered." : "Primary CTA missing.",
            media ? "Hero media rendered." : "Hero media missing.",
          ],
        };
      `,
    ),
  "Arrow key navigation moves selection across hero tiles with radiogroup semantics.": (context) =>
    runEval(
      context,
      `
        const group = document.querySelector("[role='radiogroup']");
        const radios = [...document.querySelectorAll("[role='radio']")];
        if (!group || radios.length < 2) {
          return { pass: false, notes: ["Radiogroup semantics were not found on the hero selector."] };
        }
        radios[0].focus();
        radios[0].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
        await new Promise((resolve) => setTimeout(resolve, 100));
        const checkedIndex = radios.findIndex((node) => node.getAttribute("aria-checked") === "true");
        return {
          pass: checkedIndex === 1,
          notes: [\`Checked radio index after ArrowRight: \${checkedIndex}\`],
        };
      `,
    ),
  "The active hero gallery image is no longer lazy-loaded on first render.": (context) =>
    runEval(
      context,
      `
        const image = [...document.querySelectorAll("main img")].find((node) => isVisible(node)) ?? document.querySelector("main img");
        return {
          pass: Boolean(image) && image.loading !== "lazy",
          notes: [image ? \`Image loading attribute: \${image.loading || "default"}\` : "No visible hero image found."],
        };
      `,
    ),
  "Countdown text remains stable across hydration and reflects one canonical date source.": (context) =>
    runEval(
      context,
      `
        const findCountdown = () =>
          [...document.querySelectorAll("main *")]
            .find((node) => {
              const value = text(node.textContent);
              return value.length > 0 && value.length < 80 && /(day|hour|min|sec)/i.test(value);
            });
        const countdownNode = findCountdown();
        const initial = text(countdownNode?.textContent);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const later = text(findCountdown()?.textContent);
        return {
          pass: Boolean(initial) && initial === later,
          notes: [
            initial ? \`Initial countdown text: \${initial}\` : "Countdown text was not found.",
            later ? \`Later countdown text: \${later}\` : "Countdown text was missing after hydration delay.",
          ],
        };
      `,
    ),
  "One accessible manufacturer list is exposed while the duplicate animation track stays hidden from assistive tech.": (context) =>
    runEval(
      context,
      `
        const images = [...document.querySelectorAll("main img[alt]")].filter((image) => text(image.getAttribute("alt")).length > 0);
        const accessible = images.filter((image) => !image.closest("[aria-hidden='true']"));
        const hidden = images.filter((image) => image.closest("[aria-hidden='true']"));
        const uniqueAccessible = new Set(accessible.map((image) => text(image.getAttribute("alt"))));
        return {
          pass: uniqueAccessible.size > 0 && accessible.length === uniqueAccessible.size && hidden.length >= accessible.length,
          notes: [
            \`Accessible manufacturer marks: \${accessible.length}\`,
            \`Hidden duplicated marks: \${hidden.length}\`,
          ],
        };
      `,
    ),
  "Only one purchase source grid and one term slider mount while the layout still stacks on mobile and splits on desktop.": (context) =>
    runEval(
      context,
      `
        const sliders = [...document.querySelectorAll("input[type='range']")];
        const purchaseCandidates = [...document.querySelectorAll("main section, main div")]
          .filter((node) => /dealer|auction|private seller|fleet/i.test(text(node.textContent)));
        const purchaseGrid = purchaseCandidates.find((node) => node.querySelector("svg, img"));
        let layoutOk = true;
        if (purchaseGrid && sliders[0]) {
          const purchaseRect = purchaseGrid.getBoundingClientRect();
          const sliderRect = sliders[0].getBoundingClientRect();
          layoutOk = window.innerWidth >= 768
            ? Math.abs(purchaseRect.left - sliderRect.left) > 40
            : Math.abs(purchaseRect.left - sliderRect.left) <= 40;
        }
        return {
          pass: Boolean(purchaseGrid) && sliders.length === 1 && layoutOk,
          notes: [
            \`Purchase grid present: \${Boolean(purchaseGrid)}\`,
            \`Term slider count: \${sliders.length}\`,
            \`Responsive layout check: \${layoutOk}\`,
          ],
        };
      `,
    ),
  "Disclosure copy is visibly darker, larger, and readable without changing the section's structure.": (context) =>
    runEval(
      context,
      `
        const candidates = [...document.querySelectorAll("main p, main li, main small")]
          .filter((node) => /disclosure|subject to|approval|rate|term|credit/i.test(text(node.textContent)));
        const candidate = candidates.at(-1);
        if (!candidate) {
          return { pass: false, notes: ["Could not find disclosure copy to inspect."] };
        }
        const styles = getComputedStyle(candidate);
        const fontSize = Number.parseFloat(styles.fontSize || "0");
        const brightness = rgbBrightness(styles.color);
        return {
          pass: fontSize >= 14 && brightness < 180,
          notes: [
            \`Disclosure font size: \${fontSize}px\`,
            \`Disclosure color brightness: \${brightness}\`,
          ],
        };
      `,
    ),
  "Related links render as labeled navigation with touch-friendly targets.": (context) =>
    runEval(
      context,
      `
        const nav = document.querySelector("nav[aria-label*='related' i], [role='navigation'][aria-label*='related' i]");
        const links = [...(nav?.querySelectorAll("a[href]") ?? [])];
        const touchFriendly = links.every((link) => {
          const rect = link.getBoundingClientRect();
          return rect.height >= 44 || rect.width >= 44;
        });
        return {
          pass: Boolean(nav) && links.length > 0 && touchFriendly,
          notes: [
            nav ? "Related links navigation is labeled." : "Labeled related-links navigation was not found.",
            \`Link count: \${links.length}\`,
          ],
        };
      `,
    ),
  "Fallback phone contact renders as a touch-sized secondary action below the primary CTA.": (context) =>
    runEval(
      context,
      `
        const cta = [...document.querySelectorAll("main a, main button")]
          .find((node) => !node.matches("a[href^='tel:']") && /pre-approval|estimate|get financed|apply/i.test(text(node.textContent)));
        const phone = [...document.querySelectorAll("main a[href^='tel:']")].find((node) => isVisible(node));
        if (!cta || !phone) {
          return { pass: false, notes: ["Could not find both the primary CTA and fallback phone action."] };
        }
        const ctaRect = cta.getBoundingClientRect();
        const phoneRect = phone.getBoundingClientRect();
        return {
          pass: phoneRect.top >= ctaRect.bottom - 4 && (phoneRect.height >= 44 || phoneRect.width >= 44),
          notes: [
            \`CTA bottom: \${Math.round(ctaRect.bottom)}\`,
            \`Phone top: \${Math.round(phoneRect.top)}\`,
            \`Phone target size: \${Math.round(phoneRect.width)}x\${Math.round(phoneRect.height)}\`,
          ],
        };
      `,
    ),
};

function evaluateAssertion(
  context: BrowserExecutionContext,
  assertion: string,
): BrowserAssertionResult {
  const handler = ASSERTION_HANDLERS[assertion];

  if (!handler) {
    return {
      pass: false,
      notes: [`No browser assertion handler is registered for: ${assertion}`],
    };
  }

  return handler(context);
}

function buildObservation(
  context: BrowserExecutionContext,
): BrowserCheckObservation {
  runAgentBrowser(context, ["errors", "--clear"]);

  const configureResult = configureViewport(context);

  if (!configureResult.pass) {
    return {
      route: context.check.route,
      viewport: context.viewport,
      assertionsPassed: [],
      status: "failed",
      notes: configureResult.notes,
    };
  }

  const routeResult = openRoute(context);

  if (!routeResult.pass) {
    return {
      route: context.check.route,
      viewport: context.viewport,
      assertionsPassed: [],
      status: "failed",
      notes: [...configureResult.notes, ...routeResult.notes],
    };
  }

  const assertionsPassed: string[] = [];
  const notes = [...configureResult.notes, ...routeResult.notes];
  let failed = false;

  for (const assertion of context.check.assertions) {
    const result = evaluateAssertion(context, assertion);
    notes.push(...result.notes);

    if (result.pass) {
      assertionsPassed.push(assertion);
    } else {
      failed = true;
    }
  }

  const errorCheck = runAgentBrowser(context, ["errors"]);

  if (errorCheck.ok && errorCheck.stdout) {
    notes.push(`Browser errors: ${errorCheck.stdout}`);
    failed = true;
  }

  return {
    route: context.check.route,
    viewport: context.viewport,
    assertionsPassed,
    status: failed ? "failed" : "passed",
    ...(notes.length > 0 ? { notes } : {}),
  };
}

export function executeDeclaredBrowserChecks(
  cwd: string,
  unit: Pick<RemediationUnit, "id" | "browserChecks">,
  baseUrl: string,
  environment: BrowserExecutionEnvironment = {},
): BrowserCheckObservation[] {
  const commandExecutor = environment.commandExecutor ?? defaultCommandExecutor;
  const sessionName = environment.sessionName ?? `remediation-${unit.id.toLowerCase()}`;
  const observations: BrowserCheckObservation[] = [];

  try {
    for (const check of unit.browserChecks) {
      for (const viewport of expandViewport(check.viewport)) {
        observations.push(
          buildObservation({
            baseUrl,
            check,
            viewport,
            sessionName,
            commandExecutor,
            cwd,
          }),
        );
      }
    }
  } finally {
    commandExecutor("agent-browser", ["--session", sessionName, "close"], cwd);
  }

  return observations;
}
