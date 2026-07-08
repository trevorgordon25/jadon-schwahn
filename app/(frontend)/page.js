import { Suspense } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import WorksStrip from '@/components/WorksStrip';
import AboutStatement from '@/components/AboutStatement';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CheckoutBanner from '@/components/CheckoutBanner';
import { getWorks } from '@/lib/payload';

// Gallery data changes rarely (new/edited works), so the page is cached and
// revalidated on this interval instead of hitting Payload on every request.
export const revalidate = 300;

export default async function Home() {
    const works = await getWorks();

    return (
        <>
            <Nav />
            <Suspense fallback={null}>
                <CheckoutBanner />
            </Suspense>
            <Hero />
            <Gallery works={works} />
            <WorksStrip />
            <AboutStatement />
            <ContactSection />
            <Footer />
        </>
    );
}
