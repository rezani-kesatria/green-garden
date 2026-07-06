# GreenGarden Integrated Services — Website Mockup

Home-page mockup for **GGIS Sdn. Bhd.** (greengarden.my) — a landscape
consultancy designing, managing and maintaining gardens for offices,
condominiums and public places across Malaysia & Singapore.

Quiet-luxury landscape studio direction: warm ivory canvas, deep forest green,
Fraunces display serif, GSAP scroll choreography, 1800px site frame. All copy
and featured-project photography come from the real GGIS Company Profile 2026.
See [DESIGN.md](DESIGN.md) for the design system.

## Stack

- Vite 5 + React 18, Tailwind CSS 3
- GSAP (ScrollTrigger + SplitText) + Lenis smooth scroll
- Content lives in `src/data/*.js`; sections in `src/components/`

## Develop

```sh
npm install
npm run dev        # http://localhost:5173
```

Handy flag: append `?nolenis` to the URL to disable smooth scrolling while
debugging.

## Deploy — Cloudflare Workers (static assets)

The site ships as an assets-only Worker (`wrangler.toml`, no worker script):

```sh
npx wrangler login   # once, if not already authenticated
npm run deploy       # vite build + wrangler deploy
```

`not_found_handling = "single-page-application"` serves `index.html` for any
unknown path, so shared preview links never 404.
