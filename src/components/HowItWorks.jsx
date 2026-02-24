import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { FiDownload, FiPower, FiCheck } from 'react-icons/fi';

const HowItWorks = () => {
    const { t } = useLanguage();
    useScrollAnimation();

    return (
        <section className="how-section" id="how-it-works">
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <span className="section-badge">{t('how.badge')}</span>
                    <h2 className="section-title">{t('how.title')}</h2>
                    <p className="section-description">
                        {t('how.description')}
                    </p>
                </div>

                <div className="steps-wrapper">
                    
                    
                    <div className="step animate-on-scroll">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3 className="step-title">{t('how.step1.title')}</h3>
                            <p className="step-description">
                                {t('how.step1.description')}
                            </p>
                        </div>
                        <div className="step-visual">
                            <div className="step-icon-wrapper">
                                <FiDownload size={24} color="var(--color-primary-light)" />
                            </div>
                        </div>
                    </div>

                    <div className="step animate-on-scroll">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3 className="step-title">{t('how.step2.title')}</h3>
                            <p className="step-description">
                                {t('how.step2.description')}
                            </p>
                        </div>
                        <div className="step-visual">
                            <div className="step-icon-wrapper">
                                <FiPower size={24} color="var(--color-primary-light)" />
                            </div>
                        </div>
                    </div>

                    <div className="step animate-on-scroll">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3 className="step-title">{t('how.step3.title')}</h3>
                            <p className="step-description">
                                {t('how.step3.description')}
                            </p>
                        </div>
                        <div className="step-visual">
                            <div className="step-icon-wrapper success">
                                <FiCheck size={26} color="var(--color-accent)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
