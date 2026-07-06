// Single import point for GSAP — plugins registered exactly once.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Site-wide motion voice: slow, confident. Two eases only —
// power4.out for reveals, 'none' for scrubs.
gsap.defaults({ ease: 'power4.out', duration: 1 })

export { gsap, ScrollTrigger, SplitText }
