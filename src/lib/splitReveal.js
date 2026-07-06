import { gsap, SplitText } from './gsap'

/**
 * Masked line reveal for display type.
 * autoSplit waits for document.fonts.ready before the first split and
 * re-splits on late font swaps / resizes; returning the tween from onSplit
 * lets SplitText revert + rebuild it safely each time.
 */
export function revealLines(target, vars = {}) {
  return SplitText.create(target, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'line',
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.lines, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.09,
        ease: 'power4.out',
        ...vars,
      }),
  })
}

/**
 * Word-level ink scrub — words start faint and saturate to full ink as the
 * reader scrolls through (the Manifesto moment).
 */
export function inkScrub(target, { fromColor, toColor, trigger, start = 'top 75%', end = 'center 40%' } = {}) {
  return SplitText.create(target, {
    type: 'words',
    autoSplit: true,
    onSplit: (self) =>
      gsap.fromTo(
        self.words,
        { color: fromColor },
        {
          color: toColor,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger, start, end, scrub: 1 },
        },
      ),
  })
}
