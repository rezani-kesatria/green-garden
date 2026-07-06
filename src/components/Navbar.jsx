import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useLenis } from './SmoothScroll'
import { brand, nav, contact } from '../data/site'

export default function Navbar() {
  const ref = useRef(null)
  const lenis = useLenis()
  const [scrolled, setScrolled] = useState(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Enters after the hero headline has landed
        gsap.from(ref.current, { yPercent: -100, duration: 0.8, delay: 0.9, ease: 'power3.out' })
      })
      // Solid chrome once the hero is left behind (state, not animation —
      // runs regardless of motion preference)
      ScrollTrigger.create({
        start: 120,
        end: 'max',
        onEnter: () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      })
    },
    { scope: ref },
  )

  const handleAnchor = (e, href) => {
    if (!lenis) return // reduced motion → native jump
    e.preventDefault()
    lenis.scrollTo(href, { offset: -88, duration: 1.4 })
  }

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'border-b border-line/70 bg-canvas/95 text-ink'
          : 'border-b border-transparent bg-transparent text-canvas'
      }`}
    >
      <div className="container-max flex h-20 items-center justify-between md:h-24">
        {/* Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            if (!lenis) return
            e.preventDefault()
            lenis.scrollTo(0, { duration: 1.6 })
          }}
          className="flex flex-col leading-none"
          aria-label="GreenGarden Integrated Services — back to top"
        >
          <span className="font-display text-[1.45rem] font-[480] tracking-tight">
            {brand.name}
          </span>
          <span
            className={`mt-1 font-sans text-micro uppercase ${
              scrolled ? 'text-ink-mid' : 'text-canvas/70'
            }`}
          >
            {brand.suffix}
          </span>
        </a>

        {/* Anchors */}
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleAnchor(e, item.href)}
              className={`font-sans text-meta font-medium uppercase tracking-micro transition-opacity hover:opacity-60 ${
                scrolled ? 'text-ink-soft' : 'text-canvas/90'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Contact + CTA */}
        <div className="flex items-center gap-7">
          <a
            href={contact.phoneHref}
            className={`hidden font-sans text-meta xl:block ${
              scrolled ? 'text-ink-mid' : 'text-canvas/80'
            } transition-opacity hover:opacity-60`}
          >
            {contact.phone}
          </a>
          <a
            href={contact.emailHref}
            className={`rounded-full px-6 py-3 font-sans text-meta font-medium uppercase tracking-micro transition-colors duration-300 ${
              scrolled
                ? 'bg-green-800 text-canvas hover:bg-green-950'
                : 'bg-canvas/15 text-canvas ring-1 ring-inset ring-canvas/40 hover:bg-canvas hover:text-green-950'
            }`}
          >
            Start a Project
          </a>
        </div>
      </div>
    </header>
  )
}
