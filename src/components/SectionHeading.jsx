import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { revealLines } from '../lib/splitReveal'

/**
 * Eyebrow + serial index + oversized serif heading, with the section's
 * signature entrance built in: hairline draws, eyebrow fades, lines unmask.
 */
export default function SectionHeading({ eyebrow, index, title, dark = false, className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const st = { trigger: ref.current, start: 'top 85%' }
        gsap.from(ref.current.querySelector('[data-sh-rule]'), {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.9,
          ease: 'power2.inOut',
          scrollTrigger: st,
        })
        gsap.from(ref.current.querySelector('[data-sh-eyebrow]'), {
          opacity: 0,
          y: 14,
          duration: 0.8,
          scrollTrigger: st,
        })
        revealLines(ref.current.querySelector('[data-sh-title]'), {
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        })
      })
    },
    { scope: ref },
  )

  return (
    <header ref={ref} className={className}>
      <div className="flex items-baseline gap-5">
        {index && (
          <span className={`font-display text-meta italic ${dark ? 'text-gold' : 'text-gold-deep'}`}>
            ({index})
          </span>
        )}
        <span data-sh-eyebrow className={dark ? 'eyebrow-light' : 'eyebrow'}>
          {eyebrow}
        </span>
        <span
          data-sh-rule
          className={`h-px flex-1 ${dark ? 'bg-canvas/15' : 'bg-line'}`}
          aria-hidden="true"
        />
      </div>
      <h2
        data-sh-title
        className={`mt-8 max-w-[18ch] font-display text-display-lg font-[380] ${
          dark ? 'text-canvas' : 'text-ink'
        }`}
      >
        {title}
      </h2>
    </header>
  )
}
