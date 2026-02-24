import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { motion } from 'framer-motion';

const CTA = () => {
    const { t } = useLanguage();
    useScrollAnimation();

    return (
        <section className="cta-section" id="download">
            <div className="container">
                <div className="cta-wrapper animate-on-scroll">
                    {/* Glow effects */}
                    <div className="cta-glow cta-glow-1"></div>
                    <div className="cta-glow cta-glow-2"></div>
                    
                    <div className="cta-content">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="cta-badge">{t('download.badge')}</span>
                        </motion.div>
                        
                        <h2 className="cta-title">{t('download.title')}</h2>
                        <p className="cta-description">{t('download.description')}</p>
                        
                        <div className="cta-actions">
                            <Link to="/download" className="btn btn-primary btn-lg shimmer-btn">
                                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7 10 12 15 17 10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                <span>{t('nav.getBypaxDPI')}</span>
                                <div className="shimmer"></div>
                            </Link>
                            <a href="https://github.com/bypaxdpi-app" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                                <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                </svg>
                                <span>{t('download.github')}</span>
                            </a>
                        </div>

                        <div className="cta-info-row">
                            <span className="cta-info-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>
                                {t('download.info1')}
                            </span>
                            <span className="cta-info-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>
                                {t('download.info2')}
                            </span>
                            <span className="cta-info-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>
                                {t('download.info3')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
