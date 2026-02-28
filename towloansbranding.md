# TowLoans Brand System

> Single source of truth for the TowLoans visual identity.
> The brand page at `/brand` renders directly from this document.

---

## 1. Primary Colors

| Name       | Hex       | CSS Variable        | Tailwind Class          | Usage                              |
|------------|-----------|---------------------|-------------------------|------------------------------------|
| White      | `#FFFFFF` | `--color-white`     | `bg-white` / `text-white` | Backgrounds, inverted text       |
| Black 6C   | `#101820` | `--color-black-6c`  | `bg-[#101820]` / `text-[#101820]` | Primary text, dark surfaces |
| Green      | `#22C55E` | `--color-green`     | `bg-[#22C55E]` / `text-[#22C55E]` | Accent, CTAs, icons          |
| Dark Green | `#15803D` | `--color-dark-green` | `bg-[#15803D]` / `text-[#15803D]` | Hover states, secondary accent |

---

## 2. Neutral Gray Scale

A pure neutral ramp (no warm/cool tint) derived from Black 6C.

| Step     | Hex       | Tailwind Class        |
|----------|-----------|-----------------------|
| Gray 50  | `#FAFAFA` | `bg-[#FAFAFA]`        |
| Gray 100 | `#F5F5F5` | `bg-[#F5F5F5]`        |
| Gray 200 | `#E5E5E5` | `bg-[#E5E5E5]`        |
| Gray 300 | `#D4D4D4` | `bg-[#D4D4D4]`        |
| Gray 400 | `#A3A3A3` | `bg-[#A3A3A3]`        |
| Gray 500 | `#737373` | `bg-[#737373]`        |
| Gray 600 | `#545454` | `bg-[#545454]`        |
| Gray 700 | `#404040` | `bg-[#404040]`        |
| Gray 800 | `#262626` | `bg-[#262626]`        |
| Gray 900 | `#171717` | `bg-[#171717]`        |

---

## 3. Surface Colors

Green-derived tints and functional surfaces.

| Name        | Hex       | CSS Variable           | Usage                              |
|-------------|-----------|------------------------|------------------------------------|
| Green Wash  | `#F0FDF4` | `--surface-green-wash` | Light green backgrounds, highlights |
| Green Mist  | `#DCFCE7` | `--surface-green-mist` | Badges, tags, subtle accent areas   |
| Neutral Bg  | `#F5F5F5` | `--surface-neutral`    | Section backgrounds, card groups    |
| Dark Surface | `#101820` | `--surface-dark`      | Dark hero sections, inverted cards  |

---

## 4. Typography

### Font Family

**Geist Sans** — loaded via `next/font/google`. Variable: `--font-geist-sans`.

Weights: Regular (400), Medium (500), Semibold (600), Bold (700).

### Type Scale

| Level     | Size  | Weight | Line Height | Tag   | Tailwind Class                              |
|-----------|-------|--------|-------------|-------|---------------------------------------------|
| Display   | 56px  | 700    | 1.1         | `h1`  | `text-[56px] font-bold leading-[1.1]`       |
| Heading 1 | 48px  | 700    | 1.15        | `h1`  | `text-5xl font-bold leading-[1.15]`         |
| Heading 2 | 36px  | 600    | 1.2         | `h2`  | `text-4xl font-semibold leading-[1.2]`      |
| Heading 3 | 24px  | 600    | 1.3         | `h3`  | `text-2xl font-semibold leading-[1.3]`      |
| Body      | 16px  | 400    | 1.5         | `p`   | `text-base leading-relaxed`                 |
| Small     | 14px  | 400    | 1.5         | `p`   | `text-sm leading-relaxed`                   |
| Caption   | 12px  | 500    | 1.4         | `span`| `text-xs font-medium leading-[1.4]`         |

---

## 5. Component Patterns

### Buttons

All buttons use `rounded-full` (pill shape). Minimum touch target: 44px height.

| Variant   | Classes                                              | Usage                |
|-----------|------------------------------------------------------|----------------------|
| Primary   | `rounded-full bg-[#101820] text-white px-8 py-3`    | Main CTAs            |
| Accent    | `rounded-full bg-[#22C55E] text-white px-8 py-3`    | High-emphasis CTAs   |
| Outline   | `rounded-full border border-[#101820] px-8 py-3`    | Secondary actions    |
| Ghost     | `inline-flex items-center gap-2 font-medium`        | Text links with arrow |
| Inverted  | `rounded-full bg-white text-[#101820] px-8 py-3`    | On dark backgrounds  |

### Cards

- Border: `shadow-[inset_0_0_0_1px_#E9E9E9]`
- Radius: `rounded-3xl` (24px)
- Hover: `hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]`
- Padding: `p-8` (32px)
- Transition: `transition-shadow duration-200`

### Border Radius

| Element       | Value          | Tailwind        |
|---------------|----------------|-----------------|
| Buttons       | Full (9999px)  | `rounded-full`  |
| Cards         | 24px           | `rounded-3xl`   |
| Feature cards | 24px           | `rounded-3xl`   |
| Icon boxes    | 16px           | `rounded-2xl`   |
| Inputs        | 12px           | `rounded-xl`    |

---

## 6. Icon Usage

### Benefit Icons

Located in `public/brand-assets/benefit-icons/`. Seven categories:

| Category   | Variants Available              | Path Prefix                         |
|------------|---------------------------------|-------------------------------------|
| Zero Down  | dark, light                     | `/brand-assets/benefit-icons/zero-down/` |
| Inquiry    | dark, green                     | `/brand-assets/benefit-icons/inquiry/`   |
| Fast       | dark, light, watch-dark, watch-light | `/brand-assets/benefit-icons/fast/` |
| Deferment  | 60/90/180 × dark/light          | `/brand-assets/benefit-icons/deferment/` |
| Terms      | dark, light                     | `/brand-assets/benefit-icons/terms/`     |
| Best       | dark, green, light, trophy variants | `/brand-assets/benefit-icons/best/`  |
| Miles      | dark, light, odometer variants  | `/brand-assets/benefit-icons/miles/`     |

### Truck Icons

Located in `public/brand-assets/truck-icons/`. Four types:

| Type          | Variants                                         |
|---------------|--------------------------------------------------|
| Rollback      | dark, green, light, light-dark, light-green, light-light |
| Wrecker       | dark, green, light                               |
| Rotator       | dark, green, light                               |
| Heavy Wrecker | dark, green, light                               |

### Prescriptive Rules

- **Dark icons** on light backgrounds (white, gray 50–200)
- **Light icons** on dark backgrounds (#101820, gray 700–900)
- **Green icons** on white backgrounds only — never on colored or dark backgrounds
- Never recolor icons — use the provided variant for each context

---

## 7. Spacing System

Based on a 4px grid. All spacing uses Tailwind utilities.

| Step | Value | Tailwind |
|------|-------|----------|
| 1    | 4px   | `p-1`    |
| 2    | 8px   | `p-2`    |
| 3    | 12px  | `p-3`    |
| 4    | 16px  | `p-4`    |
| 5    | 20px  | `p-5`    |
| 6    | 24px  | `p-6`    |
| 8    | 32px  | `p-8`    |
| 10   | 40px  | `p-10`   |
| 12   | 48px  | `p-12`   |
| 16   | 64px  | `p-16`   |
| 20   | 80px  | `p-20`   |
| 24   | 96px  | `p-24`   |

### Section Layout

- Horizontal padding: `px-6` (24px)
- Vertical section padding: `py-20 md:py-28` (80px mobile, 112px desktop)
- Content max width: `max-w-7xl` (1280px)
- Grid gap: `gap-6` (24px)
- Center wrapper: `mx-auto max-w-7xl px-6`

---

## 8. Logo Usage

### Files

- Dark logo (for light backgrounds): `public/brand-assets/logo/towloans-dark-logo.svg`
- Light logo (for dark backgrounds): `public/brand-assets/logo/towloans-light-logo.svg`
- Favicon: `public/brand-assets/favicon/towloans-favicon.png`

### Do

- Use dark logo on white or light gray backgrounds
- Use light logo on #101820 or dark surfaces
- Maintain minimum clear space equal to the "T" character height
- Render at minimum 120px width for legibility

### Don't

- Stretch, skew, or rotate the logo
- Recolor the logo — always use provided dark or light variants
- Place dark logo on dark backgrounds or light logo on light backgrounds
- Add drop shadows, outlines, or effects to the logo
- Use the logo smaller than 120px width
