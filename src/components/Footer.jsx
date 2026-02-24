import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { t } = useLanguage();

    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <a href="#" className="footer-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                            <div className="logo-icon">
                                <img src="/assets/bypaxdpi-logo.png" alt="BypaxDPI" width="32" height="32" />
                            </div>
                            <span>BypaxDPI</span>
                        </a>
                        <p className="footer-tagline">{t('footer.tagline')}</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>{t('footer.product')}</h4>
                            <a href="#features" onClick={(e) => handleScroll(e, '#features')}>{t('nav.features')}</a>
                            <Link to="/download">{t('nav.download')}</Link>
                            <a href="#how-it-works" onClick={(e) => handleScroll(e, '#how-it-works')}>{t('nav.howItWorks')}</a>
                        </div>
                        <div className="footer-column">
                            <h4>{t('footer.resources')}</h4>
                            <a href="https://github.com/bypaxdpi-app/bypaxdpi-app" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://github.com/bypaxdpi-app/bypaxdpi-app/issues" target="_blank" rel="noopener noreferrer">
                                {t('footer.issues')}
                            </a>
                            <a href="https://github.com/bypaxdpi-app/bypaxdpi-app/releases" target="_blank" rel="noopener noreferrer">
                                {t('footer.releases')}
                            </a>
                        </div>
                        <div className="footer-column">
                            <h4>{t('footer.legal')}</h4>
                            <Link to="/privacy">{t('footer.privacy')}</Link>
                            <Link to="/terms">{t('footer.terms')}</Link>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>{t('footer.copyright')}</p>
                    <p>{t('footer.madeWith')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
