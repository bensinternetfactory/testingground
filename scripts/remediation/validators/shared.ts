import type { ViewportTarget } from "../types.ts";

export type ConcreteViewport = Exclude<ViewportTarget, "both">;

export function expandViewport(viewport: ViewportTarget): ConcreteViewport[] {
  return viewport === "both" ? ["desktop", "mobile"] : [viewport];
}

export function formatRouteViewportKey(route: string, viewport: ConcreteViewport): string {
  return `${route} [${viewport}]`;
}
