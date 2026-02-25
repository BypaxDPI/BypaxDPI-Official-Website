import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCrosshair, FiEdit3, FiSend, FiLink, FiShieldOff, FiCpu, FiAlertTriangle, FiInfo, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HowItWorksPage = () => {
    const { t } = useLanguage();
    const [activeFaq, setActiveFaq] = useState(null);
    const [currentAdminStep, setCurrentAdminStep] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
    });

    const steps = [
        {
            num: '01',
            title: t('howpage.step1.title'),
            desc: t('howpage.step1.desc'),
            icon: <FiCrosshair size={24} color="var(--color-primary-light)" />
        },
        {
            num: '02',
            title: t('howpage.step2.title'),
            desc: t('howpage.step2.desc'),
            icon: <FiEdit3 size={24} color="var(--color-primary-light)" />
        },
        {
            num: '03',
            title: t('howpage.step3.title'),
            desc: t('howpage.step3.desc'),
            icon: <FiSend size={24} color="var(--color-primary-light)" />
        },
        {
            num: '04',
            title: t('howpage.step4.title'),
            desc: t('howpage.step4.desc'),
            icon: <FiLink size={26} color="var(--color-accent)" />
        },
    ];

    const attentionItems = [
        {
            icon: <FiShieldOff size={32} color="#ef4444" />,
            title: t('howpage.att1.title'),
            desc: t('howpage.att1.desc'),
        },
        {
            icon: <FiCpu size={32} color="#3b82f6" />,
            title: t('howpage.att2.title'),
            desc: t('howpage.att2.desc'),
        },
        {
            icon: <FiAlertTriangle size={32} color="#eab308" />,
            title: t('howpage.att3.title'),
            desc: t('howpage.att3.desc'),
        },
    ];

    const faqs = [
        { q: t('howpage.faq1.q'), a: t('howpage.faq1.a') },
        { q: t('howpage.faq2.q'), a: t('howpage.faq2.a') },
        { q: t('howpage.faq3.q'), a: t('howpage.faq3.a') },
    ];

    const adminSteps = [
        { img: '/images/steps/1.jpg', title: t('howpage.adminStep1.title'), desc: t('howpage.adminStep1.desc') },
        { img: '/images/steps/2.jpg', title: t('howpage.adminStep2.title'), desc: t('howpage.adminStep2.desc') },
        { img: '/images/steps/3.jpg', title: t('howpage.adminStep3.title'), desc: t('howpage.adminStep3.desc') },
        { img: '/images/steps/4.jpg', title: t('howpage.adminStep4.title'), desc: t('howpage.adminStep4.desc') },
        { img: '/images/steps/5.jpg', title: t('howpage.adminStep5.title'), desc: t('howpage.adminStep5.desc') },
        { img: '/images/steps/6.jpg', title: t('howpage.adminStep6.title'), desc: t('howpage.adminStep6.desc') },
        { img: '/images/steps/7.jpg', title: t('howpage.adminStep7.title'), desc: t('howpage.adminStep7.desc') },
    ];

    const handleNextStep = () => {
        setCurrentAdminStep((prev) => (prev + 1) % adminSteps.length);
    };

    const handlePrevStep = () => {
        setCurrentAdminStep((prev) => (prev - 1 + adminSteps.length) % adminSteps.length);
    };

    return (
        <div className="proxy-page">
            <AnimatedBackground />
            <Navbar />

            <main className="proxy-page-content">
                <div className="container">

                    {/* ===== ADMIN RIGHTS SLIDER (HERO PLACEMENT) ===== */}
                    <motion.div className="proxy-devices-section" {...fadeUp(0)} style={{ marginTop: '0', paddingTop: '60px' }}>
                        <div className="section-header">
                            <span className="section-badge localshare-badge-glow">{t('howpage.adminTitle')}</span>
                            <h2 className="section-title">{t('howpage.adminHeading')}</h2>
                            <p className="section-description">{t('howpage.adminDesc')}</p>
                        </div>

                        <div className="admin-slider-container" style={{
                            maxWidth: '960px',
                            margin: '0 auto',
                            background: 'rgba(20, 24, 35, 0.5)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            borderRadius: '32px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                            position: 'relative'
                        }}>
                            <div className="proxy-dpi-glow-1" style={{ top: '-150px', right: '-100px', width: '400px', height: '400px', opacity: 0.4 }}></div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0' }}>
                                {/* Slider Image Area */}
                                <div className="admin-slider-image-wrapper" style={{ position: 'relative', height: '0', paddingBottom: '55%', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)', overflow: 'hidden' }}>
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentAdminStep}
                                            src={adminSteps[currentAdminStep].img}
                                            alt={adminSteps[currentAdminStep].title}
                                            initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' }}
                                        />
                                    </AnimatePresence>
                                    
                                    <button onClick={handlePrevStep} className="slider-btn" style={{ position: 'absolute', top: '50%', left: '24px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(12px)', zIndex: 10, transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                                        <FiChevronLeft size={28} />
                                    </button>
                                    <button onClick={handleNextStep} className="slider-btn" style={{ position: 'absolute', top: '50%', right: '24px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(12px)', zIndex: 10, transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                                        <FiChevronRight size={28} />
                                    </button>
                                    
                                    {/* Indicators overlaid */}
                                    <div className="step-indicator" style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', zIndex: 10, background: 'rgba(0,0,0,0.6)', padding: '12px 24px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                                        {adminSteps.map((_, i) => (
                                            <div key={i} onClick={() => setCurrentAdminStep(i)} style={{ width: i === currentAdminStep ? '32px' : '8px', height: '8px', borderRadius: '4px', background: i === currentAdminStep ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)', boxShadow: i === currentAdminStep ? '0 0 12px var(--color-accent)' : 'none' }}></div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Text Content */}
                                <div className="admin-slider-content" style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(0,0,0,0.2)' }}>
                                    <motion.h3 
                                        key={`title-${currentAdminStep}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--color-heading)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}
                                    >
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(var(--color-accent-rgb), 0.15)', color: 'var(--color-accent)', fontSize: '1.2rem', border: '1px solid rgba(var(--color-accent-rgb), 0.3)' }}>{currentAdminStep + 1}</span> 
                                        {adminSteps[currentAdminStep].title}
                                    </motion.h3>
                                    <motion.p 
                                        key={`desc-${currentAdminStep}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1, duration: 0.3 }}
                                        style={{ color: 'var(--color-text)', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto' }}
                                    >
                                        {adminSteps[currentAdminStep].desc}
                                    </motion.p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ===== INTRO (HOW IT WORKS HERO) ===== */}
                    <motion.div className="proxy-hero" {...fadeUp(0.15)} style={{ paddingTop: '100px', paddingBottom: '40px' }}>
                        <span className="proxy-badge">
                            <FiInfo size={14} style={{ marginRight: '6px' }} />
                            {t('howpage.badge')}
                        </span>
                        <h1 className="proxy-title">
                            {t('howpage.titleLine1')} <span className="gradient-text animate-gradient">{t('howpage.titleLine2')}</span>
                        </h1>
                        <p className="proxy-subtitle">{t('howpage.description')}</p>
                    </motion.div>

                    {/* ===== WHAT DOES IT DO ===== */}
                    <motion.div className="proxy-explain-section" {...fadeUp(0.2)}>
                        <div className="proxy-explain-card">
                            <div className="proxy-explain-icon">
                                <FiCpu size={40} strokeWidth={1.5} color="var(--color-primary-light)" />
                            </div>
                            <div className="proxy-explain-content">
                                <h2>{t('howpage.whatTitle')}</h2>
                                <p>{t('howpage.whatDesc')}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ===== HOW IT WORKS STEPS ===== */}
                    <motion.div className="proxy-steps-section" {...fadeUp(0.2)}>
                        <div className="section-header">
                            <span className="section-badge">{t('howpage.stepsTitle')}</span>
                            <h2 className="section-title">{t('howpage.stepsHeading')}</h2>
                            <p className="section-description">{t('howpage.stepsDesc')}</p>
                        </div>

                        <div className="proxy-steps-grid">
                            {steps.map((step, i) => (
                                <motion.div
                                    key={step.num}
                                    className="proxy-step-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12 }}
                                >
                                    <div className="proxy-step-num">{step.num}</div>
                                    <div className="proxy-step-icon">{step.icon}</div>
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>


                    {/* ===== ATTENTION DEVICES ===== */}
                    <motion.div className="proxy-devices-section" {...fadeUp(0.3)}>
                        <div className="section-header">
                            <span className="section-badge localshare-badge-glow">{t('howpage.attentionTitle')}</span>
                            <h2 className="section-title">{t('howpage.attentionHeading')}</h2>
                            <p className="section-description">{t('howpage.attentionDesc')}</p>
                        </div>

                        <div className="proxy-devices-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                            {attentionItems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="proxy-device-card"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -4 }}
                                >
                                    <div className="proxy-device-icon">{item.icon}</div>
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ===== FAQ ===== */}
                    <motion.div className="proxy-faq-section" {...fadeUp(0.35)}>
                        <div className="section-header">
                            <span className="section-badge">{t('howpage.faqTitle')}</span>
                            <h2 className="section-title">{t('howpage.faqHeading')}</h2>
                        </div>

                        <div className="faq-wrapper">
                            {faqs.map((faq, i) => (
                                <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`}>
                                    <button className="faq-question" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                                        <span>{faq.q}</span>
                                        <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                            <polyline points="6 9 12 15 18 9"/>
                                        </svg>
                                    </button>
                                    <div className="faq-answer">
                                        <p>{faq.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ===== CTA ===== */}
                    <motion.div className="proxy-cta-section" {...fadeUp(0.4)}>
                        <div className="proxy-cta-card">
                            <div className="cta-glow cta-glow-1"></div>
                            <div className="cta-glow cta-glow-2"></div>
                            <div className="proxy-cta-content">
                                <h3>{t('howpage.ctaTitle')}</h3>
                                <p>{t('howpage.ctaDesc')}</p>
                                <div className="proxy-cta-actions">
                                    <Link to="/download" className="btn btn-primary shimmer-btn">
                                        <span className="shimmer"></span>
                                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                        {t('howpage.ctaBtn')}
                                    </Link>
                                    <Link to="/" className="btn btn-secondary">
                                        {t('legal.backHome')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HowItWorksPage;
