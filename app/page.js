import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import About from './components/About'
import Paths from './components/Paths'
import Services from './components/Services'
import Experience from './components/Experience'
import Philosophy from './components/Philosophy'
import Gallery from './components/Gallery'
import Clients from './components/Clients'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Intro />
                <About />
                <Paths />
                <Services />
                <Experience />
                <Philosophy />
                <Gallery />
                <Clients />
                <Testimonials />
                <FinalCTA />
                <Contact />
            </main>
            <Footer />
            <FloatingCTA />
        </>
    )
}
