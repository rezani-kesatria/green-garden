import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { revealLines } from '../lib/splitReveal'
import { hero } from '../data/site'

export default function Hero() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const img = ref.current.querySelector('[data-hero-img]')
        const veil = ref.current.querySelector('[data-hero-veil]')

        // Opening frame — one slow, confident composition
        gsap.set(img, { scale: 1.14 })
        gsap
          .timeline()
          .to(veil, { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
          .to(img, { scale: 1, duration: 1.8 }, 0)

        revealLines(ref.current.querySelector('[data-hero-headline]'), { delay: 0.35 })

        gsap.from('[data-hero-fade]', {
          opacity: 0,
          y: 16,
          duration: 0.9,
          stagger: 0.12,
          delay: 0.9,
        })

        // Scrolling away: image parallaxes down, content drifts up and dims
        gsap.to(img, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('[data-hero-content]', {
          yPercent: -8,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-green-950">
      {/* Full-bleed imagery */}
      <div className="absolute inset-0">
        <img
          data-hero-img
          src={hero.image}
          alt={hero.imageAlt}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-green-950/25 to-green-950/20"
          aria-hidden="true"
        />
        {/* Load veil — fades out as the image settles */}
        <div data-hero-veil className="absolute inset-0 bg-green-950/60" aria-hidden="true" />
      </div>

      {/* Content */}
      <div
        data-hero-content
        className="container-max relative flex min-h-[100svh] flex-col justify-end pb-10 pt-40 md:pb-14"
      >
        <p data-hero-fade className="eyebrow-light mb-7 max-w-[46ch]">
          {hero.eyebrow}
        </p>

        <h1
          data-hero-headline
          className="max-w-[13ch] font-display text-display-2xl font-[380] text-canvas"
        >
          {hero.headline.slice(0, -1).join(' ')}{' '}
          <em className="italic text-canvas/95">{hero.headline.at(-1)}</em>
        </h1>

        <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p data-hero-fade className="max-w-[52ch] font-sans text-lead text-canvas/85">
            {hero.support}
          </p>
          <p
            data-hero-fade
            className="shrink-0 font-sans text-meta uppercase tracking-micro text-canvas/60"
          >
            Scroll — ( 01 )
          </p>
        </div>

        {/* Meta strip */}
        <div
          data-hero-fade
          className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-canvas/25 pt-6"
        >
          {hero.meta.map((item) => (
            <span key={item} className="font-sans text-meta text-canvas/75">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
