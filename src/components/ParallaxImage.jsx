import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/gsap'

// Debounced global refresh — late-loading images change layout, and every
// ScrollTrigger downstream needs remeasuring exactly once.
let refreshTimer = null
function queueRefresh() {
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200)
}

/**
 * Masked image figure: once-only clip-path unmask on enter, then a scrubbed
 * parallax drift. `speed` ≈ 0.92–1.08 (labaik-style data-speed semantics);
 * amplitude is capped so the over-scaled image never shows its edges.
 * Wrap it in an element that owns the aspect ratio.
 */
export default function ParallaxImage({
  src,
  alt = '',
  speed = 1,
  reveal = true,
  eager = true,
  className = '',
  imgClassName = '',
}) {
  const wrap = useRef(null)

  // All local (public/) imagery renders through this component, so resolve
  // root-relative paths against Vite's base URL here — on GitHub Pages the
  // site lives under /green-garden/, not the domain root.
  const resolvedSrc = src.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const el = wrap.current
        const img = el.querySelector('img')
        const amp = gsap.utils.clamp(-7, 7, (speed - 1) * 100)

        if (reveal) {
          gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' })
          gsap.set(img, { scale: 1.25 })
          gsap
            .timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
            .to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut' })
            .to(img, { scale: 1.14, duration: 1.5, ease: 'power3.out' }, '<')
        } else {
          gsap.set(img, { scale: 1.14 })
        }

        if (amp !== 0) {
          gsap.fromTo(
            img,
            { yPercent: -amp },
            {
              yPercent: amp,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        }
      })
    },
    { scope: wrap, dependencies: [speed, reveal] },
  )

  return (
    <div ref={wrap} className={`relative h-full w-full overflow-hidden ${className}`}>
      <img
        src={resolvedSrc}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        onLoad={queueRefresh}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
