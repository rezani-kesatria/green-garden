import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { inkScrub } from '../lib/splitReveal'
import { vision } from '../data/site'

/**
 * The palate cleanser after the photographic hero: one idea, typeset huge,
 * words saturating from faint to full ink as the reader scrolls through.
 */
export default function Manifesto() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(ref.current.querySelector('[data-mn-rule]'), {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.9,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        })
        inkScrub(ref.current.querySelector('[data-mn-statement]'), {
          fromColor: 'rgba(23, 27, 22, 0.14)',
          toColor: '#171B16',
          trigger: ref.current,
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-canvas py-32 md:py-48">
      <div className="container-max grid grid-cols-12 gap-6">
        <div className="col-span-12 mb-10 flex items-baseline gap-5 md:col-span-2 md:mb-0 md:block">
          <span className="font-display text-meta italic text-gold-deep">(01)</span>
          <p className="eyebrow md:mt-3">Our Vision</p>
          <span data-mn-rule className="mt-0 h-px flex-1 bg-line md:mt-6 md:block md:w-16" aria-hidden="true" />
        </div>

        <p
          data-mn-statement
          className="col-span-12 font-display text-display-lg font-[400] leading-[1.18] text-ink md:col-span-10 md:col-start-3 lg:col-span-9"
        >
          {vision.map((seg, i) =>
            seg.em ? (
              <em key={i} className="font-display-soft italic">
                {seg.text}
              </em>
            ) : (
              <span key={i}>{seg.text}</span>
            ),
          )}
        </p>
      </div>
    </section>
  )
}
