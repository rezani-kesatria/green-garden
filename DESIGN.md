# GGIS — Design System

**GreenGarden Integrated Services** · Company-profile mockup · 2026

Creative north star: **quiet luxury landscape studio**. Warm ivory canvas, deep
forest ink, oversized Fraunces serif, edge-to-edge botanical photography, slow
confident motion. Kinfolk energy, not tech-startup energy.

---

## Palette

| Token | Hex | Role |
|---|---|---|
| `green-50…300` | `#F4F7F3 → #A3C09F` | tinted panels, rules on dark, foliage accents |
| `green-500/600/700` | `#587F56 / #40653F / #345233` | secondary text, hovers, icon strokes |
| `green-800` **(DEFAULT)** | `#283F27` | brand — buttons, wordmark |
| `green-900` | `#1E3320` | Contact CTA band |
| `green-950` | `#122114` | hero scrim, Command Centre band, footer |
| `canvas` | `#FAF7F0` | page background (warm ivory) |
| `canvas-bright` | `#FDFBF7` | cards on ivory |
| `canvas-tint` | `#F3EEE3` | Process band, alternating sections |
| `ink` | `#171B16` | primary text (green-cast near-black) |
| `ink-soft / mid / faint` | `#3D423C / #6B7066 / #9AA095` | body / meta / tertiary |
| `gold` | `#B99755` | accent — tags, glyphs, "In Progress" |
| `gold-deep / soft` | `#8F6F2E / #EBDFC2` | gold on ivory / gold tints |
| `line / line-soft` | `#E2DCCC / #EDE8DA` | hairlines on ivory |

Rule: green dominates, gold appears in whispers (≤ 5% of any viewport).

## Typography

- **Display:** Fraunces (variable: `ital,opsz,wght 9..144, 300..650`). Weights
  340–560 only — weight restraint is the elegance. Italic for emphasis words.
  `.font-display-soft` (SOFT 60) for the manifesto voice.
- **Labels/UI:** Instrument Sans. Eyebrows = `text-micro uppercase` (0.18em tracking).
- Both families swap in exactly two places: `tailwind.config.js` `fontFamily` +
  the Google Fonts `<link>` in `index.html`.

Fluid scale (tokens in `tailwind.config.js`): `display-2xl` (hero, → 8rem),
`display-xl` (CTA tagline, marquee), `display-lg` (manifesto, section H2s),
`display` (service rows, project names), then `title-lg / title / lead /
body-lg / body / meta / caption / micro`.

## Layout

- Site frame: `.container-max` = `max-w-site` (**1800px**) + gutters
  `px-6 md:px-10 xl:px-16 2xl:px-24`.
- Section rhythm: `.section-pad` = `py-24 md:py-36 xl:py-44`.
- Hairlines everywhere; borders `line`, radius reserved for image frames
  (`rounded-frame` 2.5rem) and pills.

## Motion (GSAP + Lenis)

- Two eases site-wide: `power4.out` (reveals), `none` (scrubs).
- Reveal durations ≤ 1.2s; parallax travel ≤ 12%; scrub 0.8–1.2.
- Exactly **one pinned section** (Process). Everything else: masked line
  reveals (SplitText), clip-path image unmasks, batch fade-ups.
- All animation inside `useGSAP({ scope })`; hidden initial states applied only
  via `gsap.set` inside motion branches (never `opacity-0` classes).
- `prefers-reduced-motion`: no Lenis, no pin, no marquee autoplay; content
  always visible.

## Imagery

- Atmosphere: Unsplash (`?q=80&w=1600&auto=format&fit=crop`), warm-green
  grading — tropical/biophilic architecture, zen courtyards, canopy light.
- Featured projects: real photos extracted from the GGIS company profile PDF →
  `public/projects/*.jpg` (slug names).
- Every figure sits in a locked aspect-ratio wrapper (no CLS).
