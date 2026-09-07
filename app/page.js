import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import BrandStory from '@/components/sections/BrandStory'
import Services from '@/components/sections/Services'
import GrowthJourney from '@/components/sections/GrowthJourney'
import Work from '@/components/sections/Work'
import Results from '@/components/sections/Results'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/ui/FloatingCTA'
import ScrollProgress from '@/components/effects/ScrollProgress'

export default function Home() {
    return (
        <>
            <Navbar />
            <ScrollProgress />
            <main>
                <Hero />
                <BrandStory />
                <Services />
                <GrowthJourney />
                <Work />
                <Results />
                <Testimonials />
                <Contact />
            </main>
            <Footer />
            <FloatingCTA />
        </>
    )
}
