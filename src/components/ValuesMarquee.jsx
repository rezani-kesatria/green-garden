import Marquee from './Marquee'
import { values } from '../data/site'

/**
 * A breathing line of the five GGIS values — rhythm break between the
 * portfolio and the process. Tempo responds to scroll velocity.
 */
export default function ValuesMarquee() {
  return (
    <section aria-label="Our values" className="border-y border-line bg-canvas py-16 md:py-20">
      <Marquee duration={46}>
        {values.map((value) => (
          <span key={value} className="flex items-center">
            <span className="whitespace-nowrap px-8 font-display text-display-xl font-[340] italic text-green-900 md:px-12">
              {value}
            </span>
            <span className="text-[1.5rem] text-gold" aria-hidden="true">
              ❋
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
