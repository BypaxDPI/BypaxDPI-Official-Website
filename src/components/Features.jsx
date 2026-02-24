import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { motion } from 'framer-motion';
import SpotlightCard from './animations/SpotlightCard';

const Features = () => {
    const { t } = useLanguage();
    useScrollAnimation();

    const features = [
        {
            key: 'oneClick',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
                </svg>
            ),
            color: '#4ade80',
            large: true,
        },
        {
            key: 'privacy',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            ),
            color: '#818cf8',
        },
        {
            key: 'fast',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
            ),
            color: '#facc15',
        },
        {
            key: 'native',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
            ),
            color: '#60a5fa',
        },
        {
            key: 'dns',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
            ),
            color: '#f472b6',
        },
        {
            key: 'localshare',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M8 2v4M16 2v4M3 18h18"/>
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 9v-2M12 17v-2M9 12H7M17 12h-2"/>
                </svg>
            ),
            color: '#f97316',
        },
        {
            key: 'opensource',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v18" />
                    <path d="M3 12h18" />
                    <path d="M5 5l14 14" />
                    <path d="M19 5L5 19" />
                </svg>
            ),
            color: '#c084fc',
        },
        {
            key: 'auto',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852 1 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            ),
            color: '#2dd4bf',
        },
    ];

    return (
        <section className="features-section" id="features">
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <span className="section-badge">{t('features.badge')}</span>
                    <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('features.title') }}></h2>
                    <p className="section-description">
                        {t('features.description')}
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={feat.large ? 'feature-large-wrapper' : ''}
                        >
                            <SpotlightCard 
                                className={`${feat.large ? 'feature-large' : ''} animate-on-scroll`} 
                                spotlightColor={`${feat.color}22`}
                            >
                                {feat.large ? (
                                    <>
                                        <div className="feature-visual">
                                            <div className="feature-animation pulse-animation">
                                                <div className="pulse-center">
                                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                                        <circle cx="24" cy="24" r="20" stroke="url(#pulseGrad)" strokeWidth="2" />
                                                        <circle cx="24" cy="24" r="12" fill="url(#pulseGrad)" />
                                                        <defs>
                                                            <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                                <stop offset="0%" style={{ stopColor: '#4ade80' }} />
                                                                <stop offset="100%" style={{ stopColor: '#22c55e' }} />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <div className="pulse-wave pulse-wave-1"></div>
                                                <div className="pulse-wave pulse-wave-2"></div>
                                                <div className="pulse-wave pulse-wave-3"></div>
                                            </div>
                                        </div>
                                        <div className="feature-content">
                                            <h3 className="feature-title">{t(`features.${feat.key}.title`)}</h3>
                                            <p className="feature-description">
                                                {t(`features.${feat.key}.description`)}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="feature-icon" style={{ background: `linear-gradient(135deg, ${feat.color}44, ${feat.color}22)` }}>
                                            <div style={{ color: feat.color }}>{feat.icon}</div>
                                        </div>
                                        <h3 className="feature-title">{t(`features.${feat.key}.title`)}</h3>
                                        <p className="feature-description">
                                            {t(`features.${feat.key}.description`)}
                                        </p>
                                    </>
                                )}
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
