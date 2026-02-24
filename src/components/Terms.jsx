import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';
import Navbar from './Navbar';

const Terms = () => {
    const { t } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="legal-page">
            <AnimatedBackground />
            <Navbar />
            
            <main className="legal-content">
                <div className="container">
                    <h1>{t('terms.title')}</h1>
                    <p className="last-updated">{t('terms.lastUpdated')}</p>

                    <div className="content-block">
                        <p>{t('terms.intro')}</p>
                    </div>

                    {sections.map((num) => {
                        const title = t(`terms.section${num}.title`);
                        const content = t(`terms.section${num}.content`);
                        if (!title || title.includes('terms.section')) return null;
                        return (
                            <div className="content-block" key={num}>
                                <h2>{title}</h2>
                                <p>{content}</p>
                            </div>
                        );
                    })}

                    <div className="back-home">
                        <Link to="/" className="btn btn-secondary">
                            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            <span>{t('legal.backHome')}</span>
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer-bottom">
                        <p>{t('footer.copyright')}</p>
                        <p>{t('footer.madeWith')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Terms;
