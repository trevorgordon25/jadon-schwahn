import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import WorksStrip from '@/components/WorksStrip';
import AboutStatement from '@/components/AboutStatement';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <>
            <Nav />
            <Hero />
            <Gallery />
            <WorksStrip />
            <AboutStatement />
            <ContactSection />
            <Footer />
        </>
    );
}
