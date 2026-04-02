import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { motion } from 'framer-motion';
import SpotlightCard from './animations/SpotlightCard';

const PlatformShowcase = () => {
    const { t } = useLanguage();
    useScrollAnimation();

    const platform = {
        title: t('platform.windows.title'),
        subtitle: t('platform.windows.subtitle'),
        desc: t('platform.windows.desc'),
        features: [
            t('platform.windows.feat1'),
            t('platform.windows.feat2'),
            t('platform.windows.feat3'),
            t('platform.windows.feat4'),
        ],
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="platform-os-icon">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
            </svg>
        ),
        color: '#60a5fa',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        techs: ['Rust', 'Tauri', 'WebView2', 'SpoofDPI'],
    };

    return (
        <section className="platform-section" id="platforms">
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <span className="section-badge">{t('platform.badge')}</span>
                    <h2 className="section-title">{t('platform.title')}</h2>
                    <p className="section-description">{t('platform.description')}</p>
                </div>

                {/* Platform Content — Windows Only */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="platform-content animate-on-scroll"
                >
                    <div className="platform-card-wrapper">
                        <SpotlightCard 
                            className="platform-main-card" 
                            spotlightColor={`${platform.color}33`}
                        >
                            <div className="platform-card-inner">
                                <div className="platform-info">
                                    <div className="platform-icon-wrapper" style={{ background: platform.gradient }}>
                                        {platform.icon}
                                    </div>
                                    <h3 className="platform-title">{platform.title}</h3>
                                    <p className="platform-subtitle" style={{ color: platform.color }}>{platform.subtitle}</p>
                                    <p className="platform-desc">{platform.desc}</p>

                                    <div className="platform-tech-tags">
                                        {platform.techs.map((tech, i) => (
                                            <motion.span 
                                                key={tech}
                                                className="tech-tag"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                style={{ borderColor: `${platform.color}44` }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                <div className="platform-features-list">
                                    {platform.features.map((feat, i) => (
                                        <motion.div 
                                            key={feat}
                                            className="platform-feature-item"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + i * 0.1 }}
                                        >
                                            <div className="platform-feature-check" style={{ background: platform.gradient }}>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </div>
                                            <span>{feat}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </motion.div>

                {/* DPI Badge */}
                <div className="dpi-badge-wrapper animate-on-scroll">
                    <div className="dpi-badge">
                        <div className="dpi-badge-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                <polyline points="9 12 11.5 14.5 16 9"/>
                            </svg>
                        </div>
                        <div className="dpi-badge-text">
                            <h4>{t('platform.sameDPI')}</h4>
                            <p>{t('platform.sameDPIDesc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformShowcase;
