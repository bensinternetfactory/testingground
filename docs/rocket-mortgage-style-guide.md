# Rocket Mortgage - Brand Style Guide (shadcn/Tailwind)

> Design system extracted from rocketmortgage.com, mapped to shadcn UI conventions and Tailwind CSS.

---

## 1. Color System (CSS Variables)

Add these to your `globals.css` using the shadcn convention of HSL values in `@layer base`:

```css
@layer base {
  :root {
    /* --- Core --- */
    --background: 0 0% 100%;            /* #FFFFFF */
    --foreground: 0 0% 7%;              /* #111111 */

    /* --- Card --- */
    --card: 0 0% 100%;                  /* #FFFFFF */
    --card-foreground: 0 0% 7%;         /* #111111 */

    /* --- Popover --- */
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 7%;

    /* --- Primary (Brand Red) --- */
    --primary: 355 73% 54%;             /* #DE3341 */
    --primary-foreground: 0 0% 100%;    /* White on red */

    /* --- Secondary (Neutral Dark) --- */
    --secondary: 0 0% 97%;              /* #F7F7F7 */
    --secondary-foreground: 0 0% 7%;    /* #111111 */

    /* --- Muted --- */
    --muted: 0 0% 97%;                  /* #F7F7F7 */
    --muted-foreground: 0 0% 33%;       /* #545454 */

    /* --- Accent (Deep Maroon) --- */
    --accent: 346 96% 18%;              /* #590213 */
    --accent-foreground: 0 0% 100%;     /* White on maroon */

    /* --- Destructive --- */
    --destructive: 355 73% 54%;         /* Same as brand red */
    --destructive-foreground: 0 0% 100%;

    /* --- Border / Input / Ring --- */
    --border: 0 0% 91%;                 /* #E9E9E9 */
    --input: 0 0% 91%;                  /* #E9E9E9 */
    --ring: 0 0% 7%;                    /* #111111 — focus rings */

    /* --- Chart Colors --- */
    --chart-1: 355 73% 54%;             /* Brand Red #DE3341 */
    --chart-2: 346 96% 18%;             /* Deep Maroon #590213 */
    --chart-3: 152 79% 21%;             /* Green #0B5E36 */
    --chart-4: 230 100% 96%;            /* Light Blue #EDF1FF */
    --chart-5: 30 35% 93%;              /* Warm Beige #F3EEE7 */

    /* --- Sidebar (shadcn sidebar component) --- */
    --sidebar: 0 0% 97%;
    --sidebar-foreground: 0 0% 7%;
    --sidebar-primary: 355 73% 54%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 0 0% 93%;
    --sidebar-accent-foreground: 0 0% 7%;
    --sidebar-border: 0 0% 91%;
    --sidebar-ring: 0 0% 7%;

    /* --- Radius --- */
    --radius: 0.5rem;                   /* 8px base */
  }

  .dark {
    /* Footer / dark sections */
    --background: 0 0% 7%;              /* #111111 */
    --foreground: 0 0% 100%;            /* White */
    --card: 0 0% 10%;
    --card-foreground: 0 0% 100%;
    --popover: 0 0% 10%;
    --popover-foreground: 0 0% 100%;
    --primary: 355 73% 54%;             /* Brand Red stays */
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 15%;
    --secondary-foreground: 0 0% 100%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 64%;       /* #A3A3A3 */
    --accent: 330 58% 17%;              /* #441227 wine */
    --accent-foreground: 0 0% 100%;
    --border: 0 0% 20%;
    --input: 0 0% 20%;
    --ring: 355 73% 54%;
  }
}
```

---

## 2. Extended Color Palette (Tailwind Config)

Beyond the shadcn variables, Rocket Mortgage uses tinted surface colors. Add these to your `tailwind.config.ts`:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        // Brand palette
        rocket: {
          red: "#DE3341",
          maroon: "#590213",
          wine: "#441227",
          black: "#111111",
          gray: "#545454",
        },
        // Tinted surfaces
        surface: {
          DEFAULT: "#F7F7F7",
          pink: "#FBF0F6",
          blue: "#EDF1FF",
          beige: "#F3EEE7",
          green: "#EFF7F3",
        },
        // Semantic
        success: {
          DEFAULT: "#0B5E36",
          light: "#EFF7F3",
        },
      },
    },
  },
};

export default config;
```

---

## 3. Typography

### Font Family

Rocket Mortgage uses **Wintle Text** (proprietary). Use a geometric sans-serif substitute:

```css
@layer base {
  :root {
    --font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;
    --font-heading: "Inter", "Helvetica Neue", Arial, sans-serif;
  }
}
```

Or in Tailwind config:

```ts
fontFamily: {
  sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
},
```

### Type Scale

| Level   | Size    | Weight | Line Height | Tailwind Class                          |
|---------|---------|--------|-------------|-----------------------------------------|
| H1      | 56px    | 500    | 1.1         | `text-[3.5rem] font-medium leading-tight` |
| H2      | 48px    | 500    | 1.15        | `text-5xl font-medium leading-tight`    |
| H3      | 28px    | 500    | 1.3         | `text-[1.75rem] font-medium leading-snug` |
| H4      | 24px    | 500    | 1.3         | `text-2xl font-medium`                  |
| Body    | 16px    | 400    | 1.5         | `text-base`                             |
| Body LG | 18px    | 400    | 1.5         | `text-lg`                               |
| Small   | 14px    | 400    | 1.5         | `text-sm`                               |
| XS      | 12px    | 400    | 1.5         | `text-xs`                               |

### Color Usage

| Context         | Color    | Tailwind                    |
|-----------------|----------|-----------------------------|
| Headings        | #111111  | `text-foreground`           |
| Body text       | #545454  | `text-muted-foreground`     |
| On dark         | #FFFFFF  | `text-white`                |
| Links           | #111111  | `text-foreground underline` |
| Accent text     | #DE3341  | `text-primary`              |

---

## 4. Border Radius

Rocket Mortgage uses a mix of soft and pill-shaped radii:

```ts
borderRadius: {
  none: "0px",
  sm: "8px",       // Cards, inputs — var(--radius)
  md: "20px",      // Large cards
  lg: "24px",      // Feature cards, hero images
  full: "9999px",  // Buttons, pills, badges
},
```

| Element          | Radius     | Tailwind       |
|------------------|------------|----------------|
| Buttons          | 9999px     | `rounded-full` |
| Badges/pills     | 9999px     | `rounded-full` |
| Cards            | 8-24px     | `rounded-lg` to `rounded-3xl` |
| Inputs           | 8px        | `rounded-lg`   |
| Images (hero)    | 24px       | `rounded-3xl`  |
| Avatar           | 50%        | `rounded-full` |

---

## 5. Shadows

```ts
boxShadow: {
  "card": "0 0 0 1px rgba(0,0,0,0.04)",
  "card-border": "inset 0 0 0 1px #E9E9E9",
  "elevated": "0 10px 30px rgba(0,0,0,0.10)",
  "soft": "0 10px 20px rgba(0,0,0,0.02)",
  "focus": "inset 0 0 0 1.5px #111111",
},
```

| Usage            | Shadow          | Tailwind              |
|------------------|-----------------|-----------------------|
| Card default     | card-border     | `shadow-card-border`  |
| Card hover       | elevated        | `shadow-elevated`     |
| Dropdown/popover | elevated        | `shadow-elevated`     |
| Subtle surface   | soft            | `shadow-soft`         |
| Input focus      | focus           | `shadow-focus`        |

---

## 6. Component Patterns

### Buttons

#### Primary Button (CTA)
```tsx
<Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 py-4 text-base font-medium">
  Apply now
</Button>
```
Specs: `bg: #111111` | `text: #FFFFFF` | `rounded-full` | `px-6 py-4` | `font-medium`

#### Secondary / Outline Button
```tsx
<Button variant="outline" className="rounded-full border-foreground px-6 py-4 text-base font-medium">
  Get my custom rate
</Button>
```
Specs: `bg: transparent` | `border: #111111` | `text: #111111` | `rounded-full`

#### Ghost / Link Button
```tsx
<Button variant="ghost" className="gap-2 p-0 text-base font-medium hover:bg-transparent">
  Learn more <ArrowRight className="h-4 w-4" />
</Button>
```
Specs: No background | `text: #111111` | Arrow icon suffix

### shadcn Button Variants Override

```ts
// components/ui/button.tsx — variant overrides
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        destructive: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-foreground bg-transparent hover:bg-muted",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-4",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-5 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Cards

#### Standard Card (with border)
```tsx
<Card className="rounded-3xl border-0 shadow-[inset_0_0_0_1px_#E9E9E9] p-6">
  <CardHeader className="p-0 pb-4">
    <Icon className="h-6 w-6 text-foreground" />
    <CardTitle className="text-xl font-medium">First-time buyer advantage</CardTitle>
  </CardHeader>
  <CardContent className="p-0 text-muted-foreground">
    Put just 1% down and earn cash rewards toward your first home.
  </CardContent>
  <CardFooter className="p-0 pt-4">
    <ArrowRight className="h-5 w-5" />
  </CardFooter>
</Card>
```

#### Feature Card (with image)
```tsx
<Card className="overflow-hidden rounded-3xl border-0 shadow-[inset_0_0_0_1px_#E9E9E9]">
  <div className="aspect-[4/3] overflow-hidden">
    <Image src="..." alt="..." className="h-full w-full object-cover" />
  </div>
  <CardContent className="space-y-2 p-6">
    <h3 className="text-xl font-medium">Buy with Preferred Pricing</h3>
    <p className="text-muted-foreground">Description text here.</p>
    <Button variant="ghost" className="gap-2 p-0">
      Learn more <ArrowRight className="h-4 w-4" />
    </Button>
  </CardContent>
</Card>
```

#### Navigation Card (clickable row)
```tsx
<Card className="flex cursor-pointer items-center justify-between rounded-2xl border-0 p-6 shadow-[inset_0_0_0_1px_#E9E9E9] transition hover:shadow-elevated">
  <span className="text-xl font-medium">Buying</span>
  <ArrowRight className="h-5 w-5" />
</Card>
```

### Badges

#### Trending Badge (Green)
```tsx
<Badge className="rounded-full bg-success-light text-success border-0 text-sm font-medium px-3 py-1">
  <TrendingUp className="mr-1 h-3 w-3" />
  Trending
</Badge>
```

#### Tag/Label Badge
```tsx
<Badge className="rounded-full bg-primary text-primary-foreground text-xs font-medium px-3 py-1">
  Build your custom guide
</Badge>
```

### Navigation / Header

```tsx
<header className="sticky top-0 z-50 bg-background border-b border-border">
  <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
    {/* Logo */}
    <Logo className="text-primary" />

    {/* Nav Links */}
    <div className="flex items-center gap-8">
      <a className="text-base font-medium text-foreground hover:text-foreground/70">Buy</a>
      <a className="text-base font-medium text-foreground hover:text-foreground/70">Refinance</a>
      <a className="text-base font-medium text-foreground hover:text-foreground/70">Rates</a>
      <a className="text-base font-medium text-foreground hover:text-foreground/70">Loan options</a>
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-6">
      <a className="text-base font-medium">(888) 452-8179</a>
      <a className="text-base font-medium">Sign in</a>
      <Button className="bg-foreground text-background rounded-full px-5 py-2">
        Apply now
      </Button>
    </div>
  </nav>
</header>
```

### Footer (Dark)

```tsx
<footer className="bg-foreground text-background">
  <div className="mx-auto max-w-7xl px-6 py-16">
    <div className="grid grid-cols-4 gap-12">
      {/* Brand column */}
      <div className="space-y-8">
        <Logo className="text-background" />
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-background">Rocket Mortgage</h4>
          <p className="text-sm text-background/60">Description text</p>
        </div>
      </div>
      {/* Link columns */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-background">Links</h4>
        <a className="block text-sm text-background/80 hover:text-background">Link</a>
      </div>
    </div>
  </div>
</footer>
```

---

## 7. Spacing System

Rocket Mortgage uses Tailwind's default 4px grid with emphasis on these values:

| Token | Value | Usage                  |
|-------|-------|------------------------|
| 4     | 16px  | Compact padding        |
| 6     | 24px  | Card padding, gaps     |
| 8     | 32px  | Section inner spacing  |
| 12    | 48px  | Section gaps           |
| 16    | 64px  | Section vertical padding |
| 20    | 80px  | Large section padding  |
| 24    | 96px  | Hero section spacing   |

### Layout Grid
- Max width: `max-w-7xl` (1280px)
- Horizontal padding: `px-6` (24px)
- 3-column card grid: `grid grid-cols-1 md:grid-cols-3 gap-6`
- 2-column split: `grid grid-cols-1 lg:grid-cols-2 gap-12`

---

## 8. Tinted Section Backgrounds

Rocket Mortgage uses warm, tinted section backgrounds instead of plain gray:

```tsx
{/* Light pink/rose tint — hero, CTAs */}
<section className="bg-[#FBF0F6]">...</section>

{/* Warm beige — trust, calculators */}
<section className="bg-[#F3EEE7]">...</section>

{/* Light blue — informational */}
<section className="bg-[#EDF1FF]">...</section>

{/* Light green — success, trending */}
<section className="bg-[#EFF7F3]">...</section>

{/* Deep maroon — testimonials, emphasis */}
<section className="bg-[#590213] text-white">...</section>

{/* Dark — footer, CTA */}
<section className="bg-foreground text-background">...</section>
```

---

## 9. Interaction Patterns

### Hover States
- Buttons: `hover:bg-foreground/90` (opacity shift, no color change)
- Cards: `hover:shadow-elevated` (shadow elevation on hover)
- Links: `hover:text-foreground/70` (subtle opacity)
- Nav links: Underline on hover

### Focus States
- All interactive: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Inputs: `focus:shadow-[inset_0_0_0_1.5px_#111111]`

### Transitions
- Default: `transition-colors duration-200`
- Cards: `transition-shadow duration-200`

---

## 10. Quick Reference — Color Swatches

```
Brand Red        #DE3341  ████  Primary CTAs, logo, alerts
Deep Maroon      #590213  ████  Accent sections, emphasis
Wine             #441227  ████  Dark accent variant
Black            #111111  ████  Text, buttons, footer
Gray             #545454  ████  Muted/secondary text
Light Gray       #F7F7F7  ████  Card backgrounds, surfaces
Border           #E9E9E9  ████  Card borders, dividers
White            #FFFFFF  ████  Background
Pink Tint        #FBF0F6  ████  Warm surface backgrounds
Beige Tint       #F3EEE7  ████  Warm surface backgrounds
Blue Tint        #EDF1FF  ████  Cool surface backgrounds
Green Tint       #EFF7F3  ████  Success surface backgrounds
Success Green    #0B5E36  ████  Badges, positive indicators
```

---

## 11. Design Principles Summary

1. **Pill-shaped buttons** — All buttons use `rounded-full`, never square
2. **Inset borders** — Cards use `box-shadow: inset 0 0 0 1px` instead of `border`
3. **Warm neutrals** — Backgrounds are tinted (pink, beige) not flat gray
4. **High contrast CTAs** — Black buttons on white, white on dark sections
5. **Brand red is accent only** — Used for logo, badges, and emphasis, never for primary buttons
6. **Clean type hierarchy** — `font-medium` (500) for all headings, `font-normal` (400) for body
7. **Arrow affordances** — Clickable cards and links use `→` arrow icons as interaction cues
8. **Generous spacing** — Large padding (24-96px) creates breathing room between sections
