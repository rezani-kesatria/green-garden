import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '../lib/gsap'

const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

/**
 * Single Lenis instance driving native scroll, wired into GSAP's ticker so
 * ScrollTrigger and Lenis share one clock. Not instantiated at all under
 * prefers-reduced-motion — the page falls back to native scrolling.
 */
export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('nolenis')) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const instance = new Lenis({ autoRaf: true, duration: 1.15 })
    instance.on('scroll', ScrollTrigger.update)
    setLenis(instance)

    // Backstop refresh once every asset has landed
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
