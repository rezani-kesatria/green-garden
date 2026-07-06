import { useRef } from 'react'
import SectionHeading from './SectionHeading'
import ParallaxImage from './ParallaxImage'
import Button from './Button'
import { useReveal } from '../hooks/useReveal'
import { projectsMeta, featuredProjects, indexProjects } from '../data/projects'

// Asymmetric editorial placement — deliberate offsets, generous ivory gutters
const PLACEMENT = [
  'md:col-span-7',
  'md:col-span-5 md:col-start-8 md:mt-44',
  'md:col-span-4 md:col-start-2 md:mt-8',
  'md:col-span-6 md:col-start-7 md:mt-40',
  'md:col-span-4 md:col-start-1 md:mt-12',
  'md:col-span-5 md:col-start-8 md:mt-32',
]

export default function Projects() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} id="projects" className="section-pad bg-canvas">
      <div className="container-max">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={projectsMeta.eyebrow} index="03" title={projectsMeta.heading} />
          <span
            data-reveal
            className="mb-2 font-display text-title-lg italic text-gold-deep"
            aria-label="Ten projects"
          >
            {projectsMeta.count}
          </span>
        </div>

        {/* Featured figures — real photographs from the GGIS portfolio */}
        <div className="mt-20 grid grid-cols-1 gap-y-20 md:mt-28 md:grid-cols-12 md:gap-x-6 md:gap-y-28">
          {featuredProjects.map((p, i) => (
            <figure key={p.id} className={`col-span-1 ${PLACEMENT[i]}`}>
              <div
                className={`overflow-hidden ${p.size === 'tall' ? 'aspect-[4/5]' : 'aspect-[3/2]'}`}
              >
                <ParallaxImage
                  src={p.image}
                  alt={`${p.name}, ${p.location} — ${p.concept} landscape design by GGIS`}
                  speed={i % 2 === 0 ? 1.05 : 0.95}
                />
              </div>
              <figcaption className="mt-6" data-reveal>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="font-display text-title-lg font-[440] text-ink">{p.name}</h3>
                  {p.status === 'In Progress' && (
                    <span className="rounded-full bg-gold-soft px-3 py-1 font-sans text-caption font-medium uppercase tracking-micro text-gold-deep">
                      In Progress
                    </span>
                  )}
                </div>
                <p className="mt-2 font-sans text-meta uppercase tracking-micro text-ink-mid">
                  {p.concept} · {p.category} · {p.year}
                </p>
                {p.story && (
                  <p className="mt-3 max-w-[44ch] font-display text-body-lg italic text-ink-soft">
                    {p.story}
                  </p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* The rest of the record — every project appears */}
        <div className="mt-28 md:mt-36">
          {indexProjects.map((p, i) => (
            <div
              key={p.id}
              data-reveal
              className={`grid grid-cols-1 gap-y-1 border-t border-line py-6 sm:grid-cols-[1fr_auto] sm:items-baseline md:grid-cols-[minmax(0,20rem)_1fr_auto] ${
                i === indexProjects.length - 1 ? 'border-b' : ''
              }`}
            >
              <h3 className="font-display text-title font-[440] text-ink">{p.name}</h3>
              <p className="font-sans text-meta uppercase tracking-micro text-ink-mid">
                {p.concept} · {p.category}
              </p>
              <p className="font-sans text-meta text-ink-faint sm:col-start-2 md:col-start-3">
                {p.location} — {p.year}
              </p>
            </div>
          ))}

          <div className="mt-14" data-reveal>
            <Button
              variant="ghost"
              href="mailto:admin@greengarden.my?subject=Portfolio%20enquiry"
            >
              Enquire About Our Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
