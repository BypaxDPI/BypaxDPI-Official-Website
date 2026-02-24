import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './animations/SpotlightCard';

const PlatformShowcase = () => {
    const { t } = useLanguage();
    useScrollAnimation();
    const [activePlatform, setActivePlatform] = useState('windows');

    const platforms = {
        windows: {
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
        },
        macos: {
            title: t('platform.macos.title'),
            subtitle: t('platform.macos.subtitle'),
            desc: t('platform.macos.desc'),
            features: [
                t('platform.macos.feat1'),
                t('platform.macos.feat2'),
                t('platform.macos.feat3'),
                t('platform.macos.feat4'),
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="platform-os-icon">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
            ),
            color: '#a78bfa',
            gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            techs: ['Swift', 'SwiftUI', 'Homebrew', 'SpoofDPI'],
        }
    };

    const current = platforms[activePlatform];

    return (
        <section className="platform-section" id="platforms">
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <span className="section-badge">{t('platform.badge')}</span>
                    <h2 className="section-title">{t('platform.title')}</h2>
                    <p className="section-description">{t('platform.description')}</p>
                </div>

                {/* Platform Switcher */}
                <div className="platform-switcher animate-on-scroll">
                    <button 
                        className={`platform-tab ${activePlatform === 'windows' ? 'active' : ''}`}
                        onClick={() => setActivePlatform('windows')}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                        </svg>
                        <span>Windows</span>
                    </button>
                    <button 
                        className={`platform-tab ${activePlatform === 'macos' ? 'active' : ''}`}
                        onClick={() => setActivePlatform('macos')}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        <span>macOS</span>
                    </button>
                </div>

                {/* Platform Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePlatform}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="platform-content"
                    >
                        <div className="platform-card-wrapper">
                            <SpotlightCard 
                                className="platform-main-card" 
                                spotlightColor={`${current.color}33`}
                            >
                                <div className="platform-card-inner">
                                    <div className="platform-info">
                                        <div className="platform-icon-wrapper" style={{ background: current.gradient }}>
                                            {current.icon}
                                        </div>
                                        <h3 className="platform-title">{current.title}</h3>
                                        <p className="platform-subtitle" style={{ color: current.color }}>{current.subtitle}</p>
                                        <p className="platform-desc">{current.desc}</p>

                                        <div className="platform-tech-tags">
                                            {current.techs.map((tech, i) => (
                                                <motion.span 
                                                    key={tech}
                                                    className="tech-tag"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    style={{ borderColor: `${current.color}44` }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="platform-features-list">
                                        {current.features.map((feat, i) => (
                                            <motion.div 
                                                key={feat}
                                                className="platform-feature-item"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + i * 0.1 }}
                                            >
                                                <div className="platform-feature-check" style={{ background: current.gradient }}>
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
                </AnimatePresence>

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
