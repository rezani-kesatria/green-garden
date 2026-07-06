import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Batch fade-up for everything marked [data-reveal] inside `ref`.
 * Hidden states are applied only inside the motion branch, so content can
 * never be stranded invisible under prefers-reduced-motion.
 */
export function useReveal(ref, { selector = '[data-reveal]', y = 28, stagger = 0.09, start = 'top 82%' } = {}) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray(selector, ref.current)
        if (!items.length) return
        gsap.set(items, { opacity: 0, y })
        ScrollTrigger.batch(items, {
          start,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger, overwrite: true }),
        })
      })
    },
    { scope: ref },
  )
}
