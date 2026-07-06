import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { ArrowUpRight } from 'lucide-react'

const VARIANTS = {
  solid: 'bg-green-800 text-canvas hover:bg-green-950',
  solidLight: 'bg-canvas text-green-950 hover:bg-canvas-tint',
  ghost: 'border border-line text-ink hover:border-green-700 hover:text-green-800',
  ghostLight: 'border border-canvas/30 text-canvas hover:border-canvas/70',
}

/**
 * Pill button. `magnetic` adds a gentle cursor-follow on pointer-fine
 * devices only — the one flourish, reserved for primary CTAs.
 */
export default function Button({
  as: Tag = 'a',
  href,
  variant = 'solid',
  magnetic = false,
  arrow = true,
  children,
  className = '',
  ...rest
}) {
  const ref = useRef(null)

  useGSAP(
    (context, contextSafe) => {
      if (!magnetic) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
        const el = ref.current
        const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

        const onMove = contextSafe((e) => {
          const rect = el.getBoundingClientRect()
          xTo((e.clientX - (rect.left + rect.width / 2)) * 0.3)
          yTo((e.clientY - (rect.top + rect.height / 2)) * 0.3)
        })
        const onLeave = contextSafe(() => {
          xTo(0)
          yTo(0)
        })

        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        return () => {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
        }
      })
    },
    { scope: ref, dependencies: [magnetic] },
  )

  return (
    <Tag
      ref={ref}
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-8 py-4 font-sans text-meta font-medium uppercase tracking-micro transition-colors duration-300 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
      {arrow && (
        <ArrowUpRight
          size={16}
          strokeWidth={1.75}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </Tag>
  )
}
