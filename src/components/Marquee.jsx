import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Seamless marquee whose tempo breathes with scroll velocity.
 * Children are rendered twice (clone is aria-hidden) for the loop; under
 * prefers-reduced-motion the track simply doesn't animate.
 */
export default function Marquee({ children, duration = 46, className = '' }) {
  const wrap = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const track = wrap.current.querySelector('[data-track]')
        const tween = gsap.to(track, { xPercent: -50, ease: 'none', duration, repeat: -1 })

        // Lenis velocity (via ScrollTrigger) modulates playback rate
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = Math.abs(self.getVelocity()) / 1200
            gsap.to(tween, {
              timeScale: gsap.utils.clamp(0.6, 2.4, 0.8 + boost),
              duration: 0.5,
              overwrite: true,
            })
          },
        })
        return () => st.kill()
      })
    },
    { scope: wrap, dependencies: [duration] },
  )

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <div data-track className="flex w-max">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
