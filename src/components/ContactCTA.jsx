import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { revealLines } from '../lib/splitReveal'
import Button from './Button'
import { cta, contact } from '../data/site'

/**
 * The close — the company's own words, typeset as the largest statement on
 * the page, over the deepest green.
 */
export default function ContactCTA() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealLines(ref.current.querySelector('[data-cta-tagline]'), {
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        })
        gsap.from('[data-cta-fade]', {
          opacity: 0,
          y: 20,
          duration: 0.9,
          stagger: 0.1,
          delay: 0.3,
          scrollTrigger: { trigger: ref.current, start: 'top 65%', once: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="contact" className="bg-green-900 py-36 md:py-52">
      <div className="container-max flex flex-col items-center text-center">
        <p className="eyebrow-light" data-cta-fade>
          Start a Conversation
        </p>

        <h2
          data-cta-tagline
          className="mt-10 max-w-[22ch] text-balance font-display text-display-xl font-[360] text-canvas"
        >
          {cta.tagline.map((seg, i) =>
            seg.em ? (
              <em key={i} className="italic text-gold-soft">
                {seg.text}
              </em>
            ) : (
              <span key={i}>{seg.text}</span>
            ),
          )}
        </h2>

        <div data-cta-fade className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <Button variant="solidLight" href={cta.primary.href} magnetic>
            {cta.primary.label}
          </Button>
          <Button variant="ghostLight" href={cta.secondary.href} arrow={false}>
            {cta.secondary.label}
          </Button>
        </div>

        <a
          data-cta-fade
          href={contact.emailHref}
          className="mt-12 font-display text-title italic text-canvas/70 underline decoration-canvas/30 underline-offset-8 transition-colors duration-300 hover:text-gold-soft"
        >
          {contact.email}
        </a>
      </div>
    </section>
  )
}
