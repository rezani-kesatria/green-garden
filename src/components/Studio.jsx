import { useRef } from 'react'
import { Sprout } from 'lucide-react'
import SectionHeading from './SectionHeading'
import ParallaxImage from './ParallaxImage'
import { useReveal } from '../hooks/useReveal'
import { studio, mission } from '../data/site'

/**
 * The trust layer: mission, discipline and geography — beside a real
 * GGIS-designed walkway at Marina One.
 */
export default function Studio() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} id="studio" className="section-pad bg-canvas">
      <div className="container-max grid grid-cols-12 gap-x-6 gap-y-16">
        <div className="col-span-12 md:col-span-5">
          <div className="aspect-[3/4] overflow-hidden rounded-2xl md:sticky md:top-28">
            <ParallaxImage src={studio.image} alt={studio.imageAlt} speed={0.95} />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <SectionHeading eyebrow={studio.eyebrow} index="05" title={studio.heading} />
          <p data-reveal className="mt-8 max-w-[50ch] font-sans text-lead text-ink-mid">
            {studio.intro}
          </p>

          <ul className="mt-14">
            {mission.map((line, i) => (
              <li
                key={i}
                data-reveal
                className={`flex items-start gap-4 border-t border-line py-6 ${
                  i === mission.length - 1 ? 'border-b' : ''
                }`}
              >
                <Sprout size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-green-700" aria-hidden="true" />
                <p className="font-sans text-body-lg text-ink-soft">{line}</p>
              </li>
            ))}
          </ul>

          <dl className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {studio.glance.map((item) => (
              <div key={item.label} data-reveal>
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-3 font-display text-title font-[440] italic text-green-900">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
