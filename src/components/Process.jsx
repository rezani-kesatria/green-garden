import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import { processMeta, steps } from '../data/process'

/**
 * The page's single pinned moment: five workflow stages on a horizontal
 * track, scrubbed by scroll. Below lg (or under reduced motion) it degrades
 * to a calm vertical stack.
 */
export default function Process() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          desktopMotion: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
          mobileMotion: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
        },
        (ctx) => {
          const { desktopMotion } = ctx.conditions
          const track = ref.current.querySelector('[data-track]')
          const counter = ref.current.querySelector('[data-counter]')
          const progress = ref.current.querySelector('[data-progress]')
          const numerals = gsap.utils.toArray('[data-numeral]', ref.current)

          if (desktopMotion) {
            const distance = () => {
              const left = track.getBoundingClientRect().left
              return Math.max(0, track.scrollWidth - window.innerWidth + left * 2)
            }

            const tl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: ref.current,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                start: 'top top',
                end: () => '+=' + distance(),
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const step = Math.min(steps.length, Math.round(self.progress * (steps.length - 1)) + 1)
                  counter.textContent = `${String(step).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`
                },
              },
            })

            tl.to(track, { x: () => -distance() }, 0)
              .fromTo(progress, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center' }, 0)
              .to(numerals, { xPercent: -14 }, 0)
          } else {
            // Vertical fallback — simple batch reveals
            const cards = gsap.utils.toArray('[data-step-card]', ref.current)
            gsap.set(cards, { opacity: 0, y: 32 })
            ScrollTrigger.batch(cards, {
              start: 'top 85%',
              once: true,
              onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }),
            })
          }
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="process" className="overflow-hidden bg-canvas-tint">
      <div className="flex min-h-screen flex-col justify-center py-24 lg:h-screen lg:py-0">
        <div className="container-max">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={processMeta.eyebrow} index="04" title={processMeta.heading} />
            <span
              data-counter
              className="mb-2 font-sans text-meta uppercase tracking-micro text-ink-mid"
            >
              01 / 05
            </span>
          </div>
          <div className="mt-10 h-px w-full bg-line" aria-hidden="true">
            <div data-progress className="h-px w-full origin-left scale-x-0 bg-green-800" />
          </div>
        </div>

        <div className="container-max mt-14 lg:mt-20">
          <div data-track className="flex flex-col gap-6 lg:w-max lg:flex-row lg:gap-8">
            {steps.map((step) => (
              <article
                key={step.no}
                data-step-card
                className="relative w-full shrink-0 overflow-hidden rounded-2xl border border-line bg-canvas-bright p-8 lg:w-[440px] lg:p-10 xl:w-[460px]"
              >
                <span
                  data-numeral
                  className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7.5rem] font-[340] italic leading-none text-green-950/[0.06]"
                  aria-hidden="true"
                >
                  {step.no}
                </span>
                <p className="font-display text-meta italic text-gold-deep">({step.no})</p>
                <h3 className="mt-16 max-w-[16ch] font-display text-title-lg font-[440] text-ink lg:mt-24">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[38ch] font-sans text-body-lg text-ink-mid">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
