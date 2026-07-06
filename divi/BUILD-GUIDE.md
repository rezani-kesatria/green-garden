# GGIS × Divi 5 — Build Guide

Recreates the approved mockup (https://rezani-kesatria.github.io/green-garden/)
on WordPress + Divi 5. Layout and styling are built natively in Divi; the
signature motion (masked text reveals, ink scrub, pinned Process, marquee,
smooth scroll) comes from the `ggis-divi-child` theme in this folder, driven
entirely by CSS classes you assign in the builder.

**Copy deck:** all final copywriting lives in the mockup repo at
`src/data/site.js`, `services.js`, `projects.js`, `process.js` — paste from
there, don't rewrite. **Images:** reuse `public/projects/*.jpg` (real GGIS
photos extracted from the company profile) — upload to the Media Library.

---

## 1 · Install

1. WordPress + Divi 5 active.
2. Zip the `ggis-divi-child` folder → Appearance → Themes → Add New → Upload.
   Activate **GGIS Divi Child**.
3. That's it — GSAP 3.13, Lenis and the motion layer load site-wide (footer,
   deferred). Pages that don't use `.ggis-*` classes are unaffected.

> The motion layer deliberately **does nothing inside the Visual Builder**
> (`et-fb`) and under `prefers-reduced-motion` — the page just renders static.
> Preview animations on the live front end.

## 2 · Global setup

**Design Variables** (create these as global colors/variables and use them
everywhere instead of raw hex):

| Variable | Hex | Role |
|---|---|---|
| Green 800 (brand) | `#283F27` | buttons, wordmark |
| Green 900 | `#1E3320` | Contact CTA band |
| Green 950 | `#122114` | hero scrim, Command Centre, footer |
| Green 700 / 500 | `#345233` / `#587F56` | icons, secondary text |
| Canvas | `#FAF7F0` | page background (warm ivory) |
| Canvas Tint | `#F3EEE3` | Process band |
| Canvas Bright | `#FDFBF7` | cards |
| Ink | `#171B16` | headings/body |
| Ink Mid / Faint | `#6B7066` / `#9AA095` | meta, tertiary |
| Gold / Gold Deep / Gold Soft | `#B99755` / `#8F6F2E` / `#EBDFC2` | accents, tags, glyphs |
| Line | `#E2DCCC` | hairline borders |

(The same tokens exist as CSS custom properties — `var(--ggis-green-800)`
etc. — for Custom CSS fields.)

**Typography** (both on Google Fonts, available in Divi's font picker):
- Headings: **Fraunces** — weights 300–650 only, never bold; italic for
  emphasis words. Tight line-height (0.98–1.15 on display sizes).
- Body/UI: **Instrument Sans**. Labels/eyebrows: 11px, uppercase,
  0.18em tracking (or just add class `ggis-eyebrow`).

**Layout:** default content width **1800px**; section padding rhythm
~96px mobile → 176px desktop; hairline borders in `Line`; page background
`Canvas`.

## 3 · The class API (assign in Advanced → CSS ID & Classes)

| Class | Put on | Effect |
|---|---|---|
| `ggis-navbar` | Theme Builder header section | slides in on load; gets `is-scrolled` class after 120px (style the solid state with it) |
| `ggis-hero` | hero section | scopes the hero choreography |
| `ggis-hero-img` | hero Image module | slow scale-settle intro + downward parallax |
| `ggis-hero-headline` | hero H1 (Text module) | masked line reveal, 0.35s after load |
| `ggis-hero-fade` | eyebrow / support / meta modules | staggered fade-up at 0.9s |
| `ggis-hero-content` | the hero's inner content wrapper (optional) | drifts up + dims while scrolling away |
| `ggis-split` | any display heading | masked line reveal when scrolled into view |
| `ggis-ink-scrub` | the vision statement | word-by-word saturation scrub |
| `ggis-reveal` | any module | fade-up on enter (batched, staggered) |
| `ggis-rule` | divider modules | hairline draws left→right |
| `ggis-parallax` (+ `data-speed="0.95"`, opt. `data-no-clip`) | Image modules | clip-path unmask + scrubbed drift; speeds 0.92–1.08, alternate per figure |
| `ggis-band` | Command Centre section | enters at 96% scale with rounded top corners, expands to full bleed |
| `ggis-float` | the "Command Centre — Live" card | slow idle float, paused offscreen |
| `ggis-marquee` / `ggis-marquee-track` | values band (Code module) | infinite drift, tempo reacts to scroll velocity |
| `ggis-process` / `ggis-process-track` / `ggis-process-progress` / `ggis-process-counter` / `ggis-process-numeral` | Process section parts | pinned horizontal scrub ≥1024px, vertical stack below |
| `ggis-magnetic` | primary CTA buttons | cursor-follow hover (desktop only) |
| `ggis-ghost` | footer wordmark Text module | rises as the footer enters |

`data-*` attributes go in the same Advanced tab (Custom attributes) or via a
Code module wrapper.

## 4 · Theme Builder

**Header (global):** transparent fixed section, class `ggis-navbar`.
Left: "GreenGarden" (Fraunces 480) over "INTEGRATED SERVICES" (eyebrow).
Center: anchor menu Services / Projects / Process / Studio / Contact
(`#services` … `#contact` — the motion layer routes them through smooth
scroll with the right offset). Right: phone + pill button "Start a Project"
(mailto). Style the scrolled state via `.ggis-navbar.is-scrolled` custom CSS
(background `rgba(250,247,240,.95)`, ink text, bottom hairline) — or use
Divi's native sticky style-change instead and skip the class styling.

**Footer (global):** background Green 950. Four columns — brand + tagline /
address (from `site.js`, keep it exact for local SEO) / contact links /
anchor nav + "Back to top". Below: a full-width Text module "GreenGarden",
class `ggis-ghost` (size is preset: 15vw, 5% ivory). © 2026 GreenGarden
Integrated Services · GGIS Sdn. Bhd.

## 5 · Page build, section by section

IDs on sections make the anchor nav work: `#services`, `#projects`,
`#process`, `#studio`, `#contact`.

1. **Hero** — full-viewport section (`min-height:100svh`), class `ggis-hero`.
   Image module (the Supertrees/dusk hero or a client photo) stretched
   full-bleed, class `ggis-hero-img` + `data-no-clip`; dark gradient overlay
   (Green 950, 70%→20% bottom-up). Content bottom-left: eyebrow
   (`ggis-hero-fade`), H1 "Sustainable outdoor environments, designed with
   *intent.*" (`ggis-hero-headline`, Fraunces ~clamp to 8rem), support
   paragraph + "Scroll — (01)" cue (`ggis-hero-fade`), hairline-topped meta
   strip (`ggis-hero-fade`).
2. **Manifesto** — ivory, huge padding. Small column: "(01) OUR VISION" +
   `ggis-rule`. Wide column: the vision statement as one Text module,
   Fraunces display-lg, class `ggis-ink-scrub`, italic on "forward-thinking".
3. **Services** — heading "Landscape consultancy, end to end." (`ggis-split`)
   + intro (`ggis-reveal`). Five rows (one Divi row each, top hairline):
   gold italic numeral `01`, service title (Fraunces display), sub-points as
   tracked-caps meta text. Class `ggis-reveal` per row (the mockup's
   rule-draw + fade combo is approximated by `ggis-rule` on the divider +
   `ggis-reveal` on content). Hover thumbnail is optional — Divi hover
   opacity on an Image module.
4. **Command Centre** — full-bleed Green 950 section. Left: eyebrow, heading
   (`ggis-split`, ivory), body, 2×2 feature grid (Divi Icon/Blurb modules,
   gold icons, `ggis-reveal` each). Right: portrait Image module
   (`command-centre-marina.jpg`), class `ggis-parallax`,
   `data-speed="0.95"`; overlay a small "Command Centre — Live" card
   (Green 900 blurb with the three status rows, `ggis-reveal`).
5. **Projects** — heading "Ten landscapes, ten living concepts." + "(10)".
   Asymmetric grid: alternate wide (3:2) and tall (4:5) Image modules with
   offset top margins, each `ggis-parallax` with alternating
   `data-speed` 1.05 / 0.95. Captions under each (`ggis-reveal`): name
   (Fraunces), "CONCEPT · CATEGORY · YEAR" meta, gold "In Progress" pill for
   Mayfair Modern + MOE Kindergarten, Marina One's story line in italic.
   Then the four-row text index (Bowment Garden, Faber Terrace, 3 Seraya
   Ave, Saraca Road) + ghost button "Enquire About Our Portfolio".
6. **Values marquee** — hairline-bordered band. One Code module:

   ```html
   <div class="ggis-marquee" data-duration="46">
     <div class="ggis-marquee-track">
       <div class="ggis-marquee-run">Professionalism ❋ Sustainability ❋ Innovation ❋ Commitment ❋ Practicality ❋&nbsp;</div>
       <div class="ggis-marquee-run" aria-hidden="true">Professionalism ❋ Sustainability ❋ Innovation ❋ Commitment ❋ Practicality ❋&nbsp;</div>
     </div>
   </div>
   ```

   Style `.ggis-marquee-run` via Custom CSS: Fraunces italic, display-xl,
   Green 900, gold `❋`.
7. **Process** — section on Canvas Tint, class `ggis-process`. Header row:
   heading (`ggis-split`) + counter Text module "01 / 05"
   (`ggis-process-counter`); under it a 1px bar whose inner fill has
   `ggis-process-progress`. Then a Code-module-wrapped (or row with class)
   `ggis-process-track` containing five cards: bordered Canvas Bright boxes,
   ghost numeral behind (`ggis-process-numeral`), "(0X)" gold label, step
   title + two-line description from `process.js`. The pin/scrub is
   automatic ≥1024px.
8. **Studio** — two columns: left portrait Image
   (`studio-marina-walkway.jpg`, `ggis-parallax`, `data-speed="0.95"`,
   sticky if desired), right heading "Practical by discipline, green by
   conviction." (`ggis-split`) + intro + five mission rows (hairlines, sprout
   icon, `ggis-reveal` each) + three "at a glance" stats (`ggis-reveal`).
9. **Contact CTA** — full-bleed Green 900, centered. Eyebrow, the tagline as
   display type with italic gold-soft "sustainable" (`ggis-split`), two pill
   buttons — "Start a Project" (`ggis-magnetic`, ivory solid) and
   "Call +60 10-903 1808" (ghost) — and the email as an italic underlined
   serif link.
10. **Footer** — see Theme Builder above.

## 6 · Gotchas

- **Turn off Divi's own entrance animations** on anything carrying a
  `ggis-*` motion class — one animation owner per element.
- **Keep the Process section transform-free**: don't apply Divi scroll
  effects or transforms to `.ggis-process` or its parents — ScrollTrigger
  pinning misbehaves inside transformed ancestors.
- Image modules must output a real `<img>` (default behavior) — don't use
  section *background* images for parallax figures.
- If a caching/optimization plugin rewrites scripts, exclude the `gsap`,
  `lenis` and `ggis-motion` handles from combining/minifying (they're
  already deferred in the right order).
- Don't add anchor-smooth-scroll plugins or Divi's smooth scroll options —
  Lenis owns scrolling.
- SEO: set title/description per the mockup's `index.html`, and add its
  `ProfessionalService` JSON-LD via your SEO plugin's custom schema slot.
- Test motion on a staging URL, not in the Visual Builder (intentionally
  static there).
