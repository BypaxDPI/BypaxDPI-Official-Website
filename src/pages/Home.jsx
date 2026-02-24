import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ShowcaseSection from '../components/ShowcaseSection';
import Trusted from '../components/Trusted';
import Features from '../components/Features';
import PlatformShowcase from '../components/PlatformShowcase';
import LocalShare from '../components/LocalShare';
import HowItWorks from '../components/HowItWorks';
import TechStack from '../components/TechStack';
import Comparison from '../components/Comparison';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/animations/SmoothScrollBackground';

const Home = () => {
    return (
        <>
            <AnimatedBackground />
            <Navbar />
            <main>
                <Hero />
                <ShowcaseSection />
                <Trusted />
                <Features />
                <PlatformShowcase />
                <LocalShare />
                <HowItWorks />
                <TechStack />
                <Comparison />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </>
    );
};

export default Home;
