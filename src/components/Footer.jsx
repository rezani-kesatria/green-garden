import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ArrowUp } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { useLenis } from './SmoothScroll'
import { useReveal } from '../hooks/useReveal'
import { brand, nav, contact } from '../data/site'

export default function Footer() {
  const ref = useRef(null)
  const lenis = useLenis()
  useReveal(ref, { start: 'top 90%' })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          ref.current.querySelector('[data-ghost]'),
          { yPercent: 44 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: true,
            },
          },
        )
      })
    },
    { scope: ref },
  )

  const toTop = (e) => {
    e.preventDefault()
    if (lenis) lenis.scrollTo(0, { duration: 1.6 })
    else window.scrollTo({ top: 0 })
  }

  const handleAnchor = (e, href) => {
    if (!lenis) return
    e.preventDefault()
    lenis.scrollTo(href, { offset: -88, duration: 1.4 })
  }

  return (
    <footer ref={ref} className="relative overflow-hidden bg-green-950 text-canvas">
      <div className="container-max relative z-10 grid grid-cols-1 gap-12 py-20 sm:grid-cols-2 md:py-24 lg:grid-cols-4">
        {/* Brand */}
        <div data-reveal>
          <p className="font-display text-title-lg font-[480]">{brand.name}</p>
          <p className="mt-1 font-sans text-micro uppercase tracking-micro text-canvas/60">
            {brand.suffix}
          </p>
          <p className="mt-6 max-w-[30ch] font-sans text-body text-canvas/55">{brand.tagline}</p>
        </div>

        {/* Contact — consistent NAP for local SEO */}
        <address data-reveal className="not-italic">
          <p className="eyebrow-light">Visit</p>
          <p className="mt-4 space-y-1 font-sans text-body leading-relaxed text-canvas/70">
            {contact.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </address>

        {/* Reach */}
        <div data-reveal>
          <p className="eyebrow-light">Reach</p>
          <ul className="mt-4 space-y-2 font-sans text-body text-canvas/70">
            <li>
              <a href={contact.phoneHref} className="transition-colors hover:text-gold-soft">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="transition-colors hover:text-gold-soft">
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={`https://${contact.website}`}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-gold-soft"
              >
                {contact.website}
              </a>
            </li>
          </ul>
        </div>

        {/* Navigate */}
        <div data-reveal>
          <p className="eyebrow-light">Navigate</p>
          <ul className="mt-4 space-y-2 font-sans text-body text-canvas/70">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleAnchor(e, item.href)}
                  className="transition-colors hover:text-gold-soft"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#top"
            onClick={toTop}
            className="mt-8 inline-flex items-center gap-2 font-sans text-meta uppercase tracking-micro text-canvas/60 transition-colors hover:text-canvas"
          >
            <ArrowUp size={14} aria-hidden="true" /> Back to top
          </a>
        </div>
      </div>

      <div className="container-max relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-canvas/10 py-8">
        <p className="font-sans text-caption text-canvas/45">
          © 2026 {brand.name} {brand.suffix} · {brand.legalName}
        </p>
        <p className="font-sans text-caption text-canvas/45">
          Landscape Consultancy · Malaysia & Singapore
        </p>
      </div>

      {/* Ghost wordmark — the closing frame */}
      <div
        data-ghost
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[15vw] font-[420] leading-[0.78] text-canvas/[0.05]"
        aria-hidden="true"
      >
        {brand.name}
      </div>
    </footer>
  )
}
