import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Services from './components/Services'
import CommandCentre from './components/CommandCentre'
import Projects from './components/Projects'
import ValuesMarquee from './components/ValuesMarquee'
import Process from './components/Process'
import Studio from './components/Studio'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <CommandCentre />
        <Projects />
        <ValuesMarquee />
        <Process />
        <Studio />
        <ContactCTA />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
