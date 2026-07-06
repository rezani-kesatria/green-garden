import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import { consultancy } from '../data/services'

/**
 * Pillar 01 — an editorial index of the five consultancy disciplines.
 * Tall hairline rows; a thumbnail surfaces on hover (desktop only).
 */
export default function Services() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-service-row]', ref.current).forEach((row) => {
          const rule = row.querySelector('[data-rule]')
          const content = row.querySelector('[data-content]')
          gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' })
          gsap.set(content, { opacity: 0, y: 36 })
          ScrollTrigger.create({
            trigger: row,
            start: 'top 85%',
            once: true,
            onEnter: () =>
              gsap
                .timeline()
                .to(rule, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' })
                .to(content, { opacity: 1, y: 0, duration: 1 }, 0.15),
          })
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="services" className="section-pad bg-canvas">
      <div className="container-max">
        <SectionHeading eyebrow={consultancy.eyebrow} index="02" title={consultancy.heading} />
        <p className="mt-8 max-w-[52ch] font-sans text-lead text-ink-mid">{consultancy.intro}</p>

        <div className="mt-20 md:mt-28">
          {consultancy.items.map((item, i) => (
            <article
              key={item.no}
              data-service-row
              className={`group relative ${i === consultancy.items.length - 1 ? 'border-b border-line' : ''}`}
            >
              <span data-rule className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />
              <div
                data-content
                className="grid grid-cols-[3.5rem_1fr] items-center gap-x-4 py-10 md:grid-cols-[6rem_1fr_minmax(0,38ch)] md:gap-x-8 md:py-14 xl:grid-cols-[6rem_1fr_minmax(0,38ch)_220px]"
              >
                <span className="font-display text-title-lg italic text-gold-deep">{item.no}</span>

                <h3 className="font-display text-display font-[400] text-ink transition-colors duration-300 group-hover:text-green-800">
                  {item.title}
                </h3>

                <p className="col-span-2 mt-4 font-sans text-meta uppercase tracking-micro text-ink-mid md:col-span-1 md:mt-0">
                  {item.points.join(' · ')}
                </p>

                <div className="hidden h-[140px] w-[220px] overflow-hidden rounded-xl xl:block">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full scale-105 object-cover opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
