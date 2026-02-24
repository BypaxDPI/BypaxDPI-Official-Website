import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { motion } from 'framer-motion';

const LocalShare = () => {
    const { t } = useLanguage();
    useScrollAnimation();

    const steps = [
        {
            num: '01',
            title: t('localshare.step1.title'),
            desc: t('localshare.step1.desc'),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
            )
        },
        {
            num: '02',
            title: t('localshare.step2.title'),
            desc: t('localshare.step2.desc'),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8.59 13.51l2.83 2.83 4.24-4.24"/>
                    <circle cx="12" cy="12" r="10"/>
                </svg>
            )
        },
        {
            num: '03',
            title: t('localshare.step3.title'),
            desc: t('localshare.step3.desc'),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
            )
        }
    ];

    return (
        <section className="localshare-section" id="local-share">
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <span className="section-badge localshare-badge-glow">{t('localshare.badge')}</span>
                    <h2 className="section-title">{t('localshare.title')}</h2>
                    <p className="section-description">{t('localshare.description')}</p>
                </div>

                {/* Network Visualization */}
                <div className="localshare-visual animate-on-scroll">
                    <div className="network-hub">
                        {/* Pulsing rings */}
                        <div className="network-ring network-ring-1"></div>
                        <div className="network-ring network-ring-2"></div>
                        <div className="network-ring network-ring-3"></div>
                        
                        {/* Center Icon */}
                        <motion.div 
                            className="network-center"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <img src="/assets/bypaxdpi-logo.png" alt="BypaxDPI" width="48" height="48" style={{ borderRadius: '12px' }} />
                        </motion.div>

                        {/* Connected Devices */}
                        <motion.div className="network-device device-1"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="device-icon" title="PlayStation">🎮</div>
                            <div className="device-line"></div>
                        </motion.div>
                        <motion.div className="network-device device-2"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                            <div className="device-icon" title="Xbox">🕹️</div>
                            <div className="device-line"></div>
                        </motion.div>
                        <motion.div className="network-device device-3"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <div className="device-icon" title="Smart TV">📺</div>
                            <div className="device-line"></div>
                        </motion.div>
                        <motion.div className="network-device device-4"
                            animate={{ y: [0, -7, 0] }}
                            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                        >
                            <div className="device-icon" title="Mobile">📱</div>
                            <div className="device-line"></div>
                        </motion.div>
                    </div>
                </div>

                {/* Steps */}
                <div className="localshare-steps animate-on-scroll">
                    {steps.map((step, i) => (
                        <motion.div 
                            key={step.num}
                            className="localshare-step"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                        >
                            <div className="localshare-step-num">{step.num}</div>
                            <div className="localshare-step-icon">{step.icon}</div>
                            <h4>{step.title}</h4>
                            <p>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits */}
                <div className="localshare-benefits animate-on-scroll">
                    <div className="benefit-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{t('localshare.benefit1')}</span>
                    </div>
                    <div className="benefit-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{t('localshare.benefit2')}</span>
                    </div>
                    <div className="benefit-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{t('localshare.benefit3')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocalShare;
