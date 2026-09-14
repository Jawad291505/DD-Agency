import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import BrandStory from '@/components/sections/BrandStory'
import Services from '@/components/sections/Services'
import GrowthJourney from '@/components/sections/GrowthJourney'
import Results from '@/components/sections/Results'
import Coverage from '@/components/sections/Coverage'
import TechEcosystem from '@/components/sections/TechEcosystem'
import Testimonials from '@/components/sections/Testimonials'

import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/ui/FloatingCTA'
import ScrollProgress from '@/components/effects/ScrollProgress'
import Preloader from '@/components/effects/Preloader'

export default function Home() {
    return (
        <>
            <Preloader />
            <Navbar />
            <ScrollProgress />
            <main>
                <Hero />
                <BrandStory />
                <Services />
                <GrowthJourney />

                <Results />
                <Coverage />
                <TechEcosystem />
    

                <Contact />
            </main>
            <Footer />
            <FloatingCTA />
        </>
    )
}
