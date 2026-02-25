import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

const NotFoundPage = () => {
    const { t } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fadeUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    };

    return (
        <div className="proxy-page">
            <AnimatedBackground />
            <Navbar />

            <main className="proxy-page-content" style={{ minHeight: 'calc(100vh - 80px - 300px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.div 
                        className="proxy-hero"
                        style={{ padding: '0', maxWidth: '600px', margin: '0 auto' }}
                        {...fadeUp}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <FiAlertCircle size={80} color="var(--color-primary-light)" />
                        </div>
                        <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: '1', marginBottom: '1rem' }}>
                            <span className="gradient-text animate-gradient">404</span>
                        </h1>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', color: 'var(--color-heading)', marginBottom: '1rem', fontWeight: 'bold' }}>
                            {t('notfound.title')}
                        </h2>
                        <p className="hero-description" style={{ margin: '0 auto 2.5rem auto', opacity: '0.8' }}>
                            {t('notfound.desc')}
                        </p>
                        
                        <div className="proxy-cta-actions" style={{ justifyContent: 'center', margin: '0' }}>
                            <Link to="/" className="btn btn-primary shimmer-btn">
                                <span className="shimmer"></span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FiArrowLeft size={20} />
                                    {t('notfound.backHome')}
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFoundPage;
