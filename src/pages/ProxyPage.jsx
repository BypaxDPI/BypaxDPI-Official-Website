import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { motion } from 'framer-motion';
import { FaAndroid, FaApple, FaWindows, FaPlaystation, FaXbox, FaLinux } from 'react-icons/fa';
import { MdDesktopMac } from 'react-icons/md';
import { FiTv, FiShare2, FiDownload, FiPower, FiCheck, FiMonitor } from 'react-icons/fi';

const ProxyPage = () => {
    const { t } = useLanguage();
    const [activeFaq, setActiveFaq] = useState(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
    });

    // YouTube video ID kullanıcı buraya kendi video ID'sini yazacak
    const YOUTUBE_VIDEO_ID = 'YOUR_VIDEO_ID';

    const devices = [
        {
            icon: <FaAndroid size={32} color="#3ddc84" />,
            title: t('proxy.device.android'),
            desc: t('proxy.device.androidDesc'),
        },
        {
            icon: <FaApple size={32} color="#f5f5f7" />,
            title: t('proxy.device.ios'),
            desc: t('proxy.device.iosDesc'),
        },
        {
            icon: <FaWindows size={32} color="#00a4ef" />,
            title: t('proxy.device.windows'),
            desc: t('proxy.device.windowsDesc'),
        },
        {
            icon: <MdDesktopMac size={32} color="#c1c8cf" />,
            title: t('proxy.device.mac'),
            desc: t('proxy.device.macDesc'),
        },
        {
            icon: <FiTv size={32} color="#94a3b8" />,
            title: t('proxy.device.smarttv'),
            desc: t('proxy.device.smarttvDesc'),
        },
        {
            icon: <FaPlaystation size={32} color="#003087" />,
            title: t('proxy.device.playstation'),
            desc: t('proxy.device.playstationDesc'),
        },
        {
            icon: <FaXbox size={32} color="#107c10" />,
            title: t('proxy.device.xbox'),
            desc: t('proxy.device.xboxDesc'),
        },
        {
            icon: <FaLinux size={32} color="#fcc624" />,
            title: t('proxy.device.linux'),
            desc: t('proxy.device.linuxDesc'),
        },
    ];

    const steps = [
        {
            num: '01',
            title: t('proxy.step1.title'),
            desc: t('proxy.step1.desc'),
            icon: <FiDownload size={24} color="var(--color-primary-light)" />
        },
        {
            num: '02',
            title: t('proxy.step2.title'),
            desc: t('proxy.step2.desc'),
            icon: <FiPower size={24} color="var(--color-primary-light)" />
        },
        {
            num: '03',
            title: t('proxy.step3.title'),
            desc: t('proxy.step3.desc'),
            icon: <FiMonitor size={24} color="var(--color-primary-light)" />
        },
        {
            num: '04',
            title: t('proxy.step4.title'),
            desc: t('proxy.step4.desc'),
            icon: <FiCheck size={26} color="var(--color-accent)" />
        },
    ];

    const faqs = [
        { q: t('proxy.faq1.q'), a: t('proxy.faq1.a') },
        { q: t('proxy.faq2.q'), a: t('proxy.faq2.a') },
        { q: t('proxy.faq3.q'), a: t('proxy.faq3.a') },
        { q: t('proxy.faq4.q'), a: t('proxy.faq4.a') },
    ];

    return (
        <div className="proxy-page">
            <AnimatedBackground />
            <Navbar />

            <main className="proxy-page-content">
                <div className="container">

                    {/* ===== HERO SECTION ===== */}
                    <motion.div className="proxy-hero" {...fadeUp(0)}>
                        <span className="proxy-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M2 12h20"/>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                            {t('proxy.badge')}
                        </span>
                        <h1 className="proxy-title">
                            {t('proxy.titleLine1')} <span className="gradient-text animate-gradient">{t('proxy.titleLine2')}</span>
                        </h1>
                        <p className="proxy-subtitle">{t('proxy.description')}</p>
                    </motion.div>

                    {/* ===== VIDEO SECTION ===== */}
                    <motion.div className="proxy-video-section" {...fadeUp(0.15)}>
                        <div className="proxy-video-glow"></div>
                        <div className="proxy-video-wrapper">
                            <div className="proxy-video-header">
                                <div className="window-controls">
                                    <div className="control red"></div>
                                    <div className="control yellow"></div>
                                    <div className="control green"></div>
                                </div>
                                <span className="proxy-video-title">{t('proxy.videoTitle')}</span>
                            </div>
                            <div className="proxy-video-embed">
                                <iframe
                                    src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                                    title={t('proxy.videoTitle')}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                        <p className="proxy-video-caption">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="16" x2="12" y2="12"/>
                                <line x1="12" y1="8" x2="12.01" y2="8"/>
                            </svg>
                            {t('proxy.videoCaption')}
                        </p>
                    </motion.div>

                    {/* ===== WHAT IS PROXY ===== */}
                    <motion.div className="proxy-explain-section" {...fadeUp(0.2)}>
                        <div className="proxy-explain-card">
                            <div className="proxy-explain-icon">
                                <FiShare2 size={40} strokeWidth={1.5} color="var(--color-primary-light)" />
                            </div>
                            <div className="proxy-explain-content">
                                <h2>{t('proxy.whatTitle')}</h2>
                                <p>{t('proxy.whatDesc')}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ===== HOW IT WORKS STEPS ===== */}
                    <motion.div className="proxy-steps-section" {...fadeUp(0.25)}>
                        <div className="section-header">
                            <span className="section-badge">{t('proxy.stepsTitle')}</span>
                            <h2 className="section-title">{t('proxy.stepsHeading')}</h2>
                            <p className="section-description">{t('proxy.stepsDesc')}</p>
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

                    {/* ===== SUPPORTED DEVICES ===== */}
                    <motion.div className="proxy-devices-section" {...fadeUp(0.3)}>
                        <div className="section-header">
                            <span className="section-badge localshare-badge-glow">{t('proxy.devicesTitle')}</span>
                            <h2 className="section-title">{t('proxy.devicesHeading')}</h2>
                            <p className="section-description">{t('proxy.devicesDesc')}</p>
                        </div>

                        <div className="proxy-devices-grid">
                            {devices.map((device, i) => (
                                <motion.div
                                    key={i}
                                    className="proxy-device-card"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -4 }}
                                >
                                    <div className="proxy-device-icon">{device.icon}</div>
                                    <h4>{device.title}</h4>
                                    <p>{device.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ===== DPI BYPASS INFO ===== */}
                    <motion.div className="proxy-dpi-section" {...fadeUp(0.35)}>
                        <div className="proxy-dpi-card">
                            <div className="proxy-dpi-glow-1"></div>
                            <div className="proxy-dpi-glow-2"></div>
                            <div className="proxy-dpi-content">
                                <div className="proxy-dpi-icon-wrap">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                                    </svg>
                                </div>
                                <h3>{t('proxy.dpiTitle')}</h3>
                                <p>{t('proxy.dpiDesc')}</p>
                                <div className="proxy-dpi-features">
                                    <div className="proxy-dpi-feat">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        <span>{t('proxy.dpiFeat1')}</span>
                                    </div>
                                    <div className="proxy-dpi-feat">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        <span>{t('proxy.dpiFeat2')}</span>
                                    </div>
                                    <div className="proxy-dpi-feat">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        <span>{t('proxy.dpiFeat3')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ===== FAQ ===== */}
                    <motion.div className="proxy-faq-section" {...fadeUp(0.4)}>
                        <div className="section-header">
                            <span className="section-badge">{t('proxy.faqTitle')}</span>
                            <h2 className="section-title">{t('proxy.faqHeading')}</h2>
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
                    <motion.div className="proxy-cta-section" {...fadeUp(0.45)}>
                        <div className="proxy-cta-card">
                            <div className="cta-glow cta-glow-1"></div>
                            <div className="cta-glow cta-glow-2"></div>
                            <div className="proxy-cta-content">
                                <h3>{t('proxy.ctaTitle')}</h3>
                                <p>{t('proxy.ctaDesc')}</p>
                                <div className="proxy-cta-actions">
                                    <Link to="/download" className="btn btn-primary shimmer-btn">
                                        <span className="shimmer"></span>
                                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                        {t('proxy.ctaBtn')}
                                    </Link>
                                    <Link to="/" className="btn btn-secondary">
                                        {t('proxy.ctaLearnMore')}
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

export default ProxyPage;
