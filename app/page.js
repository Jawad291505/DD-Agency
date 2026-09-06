import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Trust from '@/components/sections/Trust'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'
import Process from '@/components/sections/Process'
import Work from '@/components/sections/Work'
import Owner from '@/components/sections/Owner'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/ui/FloatingCTA'

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
                <Owner />
                <Testimonials />
                <Contact />
                <About />
            </main>
            <Footer />
            <FloatingCTA />
        </>
    )
}
