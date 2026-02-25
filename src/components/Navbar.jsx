import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiCoffee, FiGlobe } from 'react-icons/fi';

/* ─── SVG Icon Components ─── */
const FeaturesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const PlatformsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const HowItWorksIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const ProxyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Navbar = () => {
  const { currentLang, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(targetId);
        if (el) {
          const navH = document.getElementById('navbar')?.offsetHeight || 80;
          window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - navH, behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const el = document.querySelector(targetId);
    if (el) {
      setMenuOpen(false);
      const navH = document.getElementById('navbar').offsetHeight;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - navH, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar" ref={navRef}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-icon">
            <img src="/assets/bypaxdpi-logo.png" alt="BypaxDPI" width="32" height="32" />
          </div>
          <span className="logo-text">BypaxDPI</span>
        </Link>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`} id="navLinks">
          <a href="#features" className="nav-link" onClick={(e) => handleNavClick(e, '#features')}>
            <FeaturesIcon />
            <span className="nav-link-label">{t('nav.features')}</span>
          </a>
          <a href="#platforms" className="nav-link" onClick={(e) => handleNavClick(e, '#platforms')}>
            <PlatformsIcon />
            <span className="nav-link-label">{t('nav.platforms')}</span>
          </a>
          <Link to="/how-it-works" className="nav-link" onClick={() => setMenuOpen(false)}>
            <HowItWorksIcon />
            <span className="nav-link-label">{t('nav.howItWorks')}</span>
          </Link>
          <Link to="/download" className="nav-link" onClick={() => setMenuOpen(false)}>
            <DownloadIcon />
            <span className="nav-link-label">{t('nav.download')}</span>
          </Link>
          <Link to="/proxy" className="nav-link" onClick={() => setMenuOpen(false)}>
            <ProxyIcon />
            <span className="nav-link-label">{t('nav.proxy')}</span>
          </Link>
        </div>

        <div className="nav-actions">
          <a href="https://www.patreon.com/join/ConsolAktif" target="_blank" rel="noopener noreferrer" className="nav-donate">
            <span className="donate-icon" style={{display: 'flex'}}><FiCoffee size={18} /></span>
            <span className="donate-text">{t('nav.donate')}</span>
            <span className="donate-pulse"></span>
          </a>
          
          <Link to="/download" className="nav-cta">
            {t('nav.getBypaxDPI')}
          </Link>
          <button className="lang-switcher" id="langSwitcher" onClick={toggleLanguage} aria-label="Switch Language">
            <span className="lang-icon" style={{display: 'flex'}}><FiGlobe size={18} /></span>
            <span className="lang-text" id="currentLang">{currentLang.toUpperCase()}</span>
          </button>
          <a href="https://github.com/BypaxDPI" target="_blank" rel="noopener noreferrer" className="nav-github" aria-label="GitHub">
            <GitHubIcon />
          </a>
        </div>

        <button
          className={`mobile-toggle ${menuOpen ? 'active' : ''}`}
          id="mobileToggle"
          aria-label="Toggle Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
