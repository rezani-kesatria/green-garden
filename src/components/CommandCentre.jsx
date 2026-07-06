import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { MonitorDot, Cpu, Activity, Gauge } from 'lucide-react'
import { gsap } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import ParallaxImage from './ParallaxImage'
import { commandCentre } from '../data/services'

const ICONS = { MonitorDot, Cpu, Activity, Gauge }

/**
 * Pillar 02 — the page's one dark moment. The band expands to full bleed as
 * it enters; a floating status card hints at live monitoring.
 */
export default function CommandCentre() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          ref.current,
          { scale: 0.96, borderTopLeftRadius: '2.5rem', borderTopRightRadius: '2.5rem' },
          {
            scale: 1,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'top 35%', scrub: 1 },
          },
        )

        gsap.from('[data-cc-feature]', {
          opacity: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.9,
          scrollTrigger: { trigger: '[data-cc-features]', start: 'top 80%', once: true },
        })

        // Status card idles with a slow float, paused while offscreen
        gsap.to('[data-cc-card]', {
          y: -8,
          duration: 2.6,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
          scrollTrigger: {
            trigger: '[data-cc-card]',
            start: 'top bottom',
            toggleActions: 'play pause resume pause',
          },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="overflow-hidden bg-green-950 py-28 md:py-40">
      <div className="container-max grid grid-cols-12 items-center gap-x-6 gap-y-16">
        {/* Copy + features */}
        <div className="col-span-12 lg:col-span-5">
          <SectionHeading dark eyebrow={commandCentre.eyebrow} title={commandCentre.heading} />
          <p className="mt-8 max-w-[46ch] font-sans text-lead text-canvas/70">{commandCentre.body}</p>

          <div data-cc-features className="mt-14 grid grid-cols-1 sm:grid-cols-2">
            {commandCentre.features.map((f, i) => {
              const Icon = ICONS[f.icon]
              return (
                <div
                  key={f.title}
                  data-cc-feature
                  className={`border-t border-canvas/10 py-7 sm:pr-8 ${i % 2 === 1 ? 'sm:pl-8' : ''}`}
                >
                  <Icon size={20} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-title font-[440] text-canvas">{f.title}</h3>
                  <p className="mt-2 font-sans text-body text-canvas/60">{f.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Imagery + status card */}
        <div className="relative col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl">
            <ParallaxImage src={commandCentre.image} alt={commandCentre.imageAlt} speed={0.95} />
          </div>

          <div
            data-cc-card
            className="absolute -bottom-8 left-4 w-[300px] rounded-2xl border border-canvas/10 bg-green-900/95 p-6 shadow-frame md:left-10"
          >
            <p className="eyebrow-light">Command Centre — Live</p>
            <ul className="mt-4 space-y-3">
              {commandCentre.status.map((row) => (
                <li key={row.site} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5 font-sans text-meta text-canvas/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-glow" aria-hidden="true" />
                    {row.site}
                  </span>
                  <span className="font-sans text-caption uppercase tracking-micro text-gold-soft">
                    {row.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
