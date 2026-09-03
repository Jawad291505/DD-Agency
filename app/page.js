import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Trust from './components/Trust'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Work from './components/Work'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Trust />
                <Services />
                <WhyUs />
                <Process />
                <Work />
                <Testimonials />
                <Contact />
            </main>
            <Footer />
            <FloatingCTA />
        </>
    )
}
