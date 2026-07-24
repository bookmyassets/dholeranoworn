# Design Agent Rules — Dholera Event Page

> Scope: **Design only.** This file governs visual/styling decisions — colors, typography, spacing, layout. Do NOT use this file to make content, copy, or business-logic decisions.

---

## Color Tokens

| Name  | Hex       | Usage                                  |
|-------|-----------|-----------------------------------------|
| Black | `#17171a` | Primary text, headings, dark surfaces  |
| Red   | `#c91f2e` | Accent, CTAs, highlights, badges       |
| White | `#ffffff` | Base background (pure white only)      |

**Rules:**
- Background stays pure white (`#ffffff`) unless a section explicitly needs a black `#17171a` inverted block for contrast/emphasis.
- Red (`#c91f2e`) is an accent — use for CTAs, key numbers, active states, badges. Never as a large background fill.
- No new colors, tints, or shades may be introduced without explicit approval. No gradients unless derived from these two colors.

```css
@theme {
  --color-ink: #17171a;
  --color-accent: #c91f2e;
  --color-base: #ffffff;
}
```

---

## Typography

| Role                              | Font              | Weight(s)      |
|------------------------------------|-------------------|-----------------|
| Heading                            | Playfair Display  | 600, 700        |
| Body                                | Inter             | 400, 500, 600   |
| Special text (dates, CTAs, quotes) | Marcellus         | 400             |

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&family=Marcellus&display=swap');

@theme {
  --font-heading: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
  --font-special: "Marcellus", serif;
}
```

**Usage rules:**
- `font-heading` → H1–H3, hero titles only.
- `font-body` → paragraphs, nav, form labels, general UI text.
- `font-special` → dates, countdown labels, CTA button text, badges, pull-quotes. Do not use for long-form paragraphs.
- Never mix a 4th font family into the page.

---

## Fluid Sizing (clamp / calc required)

All font sizes, section spacing, and key layout dimensions must use `clamp()` for fluid scaling — no fixed `px` breakpoint-jumps for typography or vertical rhythm. Use `calc()` when combining viewport units with fixed offsets (e.g. safe-area, header height).

```css
--fs-h1: clamp(2rem, 1.2rem + 3.5vw, 4.5rem);
--fs-h2: clamp(1.5rem, 1rem + 2vw, 2.75rem);
--fs-body: clamp(1rem, 0.95rem + 0.3vw, 1.125rem);
--fs-special: clamp(0.875rem, 0.8rem + 0.4vw, 1.125rem);

--space-section: clamp(3rem, 2rem + 4vw, 8rem);
```

**Rules:**
- Every heading and body size token must be defined via `clamp(min, preferred, max)`.
- Prefer `clamp()` over Tailwind's default breakpoint scale (`sm:`, `md:`, `lg:`) for type and section spacing. Tailwind breakpoints are fine for layout structure (grid/flex changes), not for scaling numbers.
- Use `calc()` for any measurement that depends on another token (e.g. `calc(var(--space-section) / 2)` for sub-section gaps).

---

## Out of Scope for This File
- Copy, headlines, CTA wording, event content
- Component logic / data fetching
- SEO metadata
- Anything unrelated to color, type, or fluid layout sizing