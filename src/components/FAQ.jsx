import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';

const FAQ = () => {
    const { t } = useLanguage();
    useScrollAnimation();
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [1, 2, 3, 4, 5];

    return (
        <section className="faq-section" id="faq">
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <span className="section-badge">{t('faq.badge')}</span>
                    <h2 className="section-title">{t('faq.title')}</h2>
                </div>

                <div className="faq-wrapper animate-on-scroll">
                    {faqs.map((num) => (
                        <div key={num} className={`faq-item ${activeIndex === num ? 'active' : ''}`}>
                            <button className="faq-question" onClick={() => toggleAccordion(num)}>
                                <span>{t(`faq.q${num}.question`)}</span>
                                <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                            <div className="faq-answer">
                                <p>{t(`faq.q${num}.answer`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
