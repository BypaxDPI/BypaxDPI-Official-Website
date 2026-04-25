import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useGitHubData } from '../context/GitHubReleasesContext';
import useGitHubReleases from '../hooks/useGitHubReleases';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiZap, FiRadio, FiMousePointer } from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import InteractiveDemo from './InteractiveDemo';

const StatCounter = ({ target, suffix = '', label }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
           const duration = 2000;
           const startTime = performance.now();
  
           const update = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              setCount(Math.round(easeOutQuart * target));
              
              if (progress < 1) requestAnimationFrame(update);
           };
           requestAnimationFrame(update);
           observer.disconnect();
        }
      }, { threshold: 0.5 });
      
      if (elementRef.current) observer.observe(elementRef.current);
      return () => observer.disconnect();
    }, [target]);
  
    return (
      <div className="stat">
         <span className="stat-number" ref={elementRef}>{count}</span>
         <span className="stat-suffix">{suffix}</span>
         <span className="stat-label">{label}</span>
      </div>
    );
};

// Floating particle component
const FloatingParticle = ({ delay, duration, size, left, top }) => (
    <motion.div
        className="hero-particle"
        style={{ width: size, height: size, left: `${left}%`, top: `${top}%` }}
        animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5]
        }}
        transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
);

const Hero = () => {
  const { t } = useLanguage();
  const { downloadLinks } = useGitHubReleases();
  const { totalDownloads, version } = useGitHubData();
  useScrollAnimation();

  // Boost logic: minimum floor for social proof
  const getDisplayDownloads = (real) => {
    if (!real || real <= 0) return 0;
    if (real >= 5000) return real;
    return Math.max(1200, Math.round(real * 8));
  };
  const displayDownloads = getDisplayDownloads(totalDownloads);

  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);

  useEffect(() => {
    const handleMouseMove = (e) => {
        if (!window.matchMedia('(min-width: 768px)').matches) return;
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  // Text animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 30,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  const titleWords1 = t('hero.titleLine1').split(' ');
  const titleWords2 = t('hero.titleLine2').split(' ');
  const titleWords3 = t('hero.titleLine3') ? t('hero.titleLine3').split(' ') : [];

  // Particles data
  const particles = [
    { delay: 0, duration: 4, size: 3, left: 10, top: 20 },
    { delay: 1, duration: 5, size: 4, left: 80, top: 15 },
    { delay: 2, duration: 3.5, size: 2, left: 30, top: 70 },
    { delay: 0.5, duration: 4.5, size: 3, left: 70, top: 60 },
    { delay: 1.5, duration: 3, size: 5, left: 50, top: 30 },
    { delay: 3, duration: 4, size: 2, left: 20, top: 85 },
    { delay: 2.5, duration: 5, size: 3, left: 90, top: 40 },
    { delay: 0.8, duration: 3.8, size: 4, left: 15, top: 50 },
  ];

  return (
    <section className="hero" id="hero" ref={heroRef}>
        {/* Particles */}
        <div className="hero-particles">
            {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}
        </div>

        {/* Aurora glow effect */}
        <div className="hero-aurora">
            <div className="aurora-blob aurora-1"></div>
            <div className="aurora-blob aurora-2"></div>
            <div className="aurora-blob aurora-3"></div>
        </div>

        <div className="hero-content">
            <motion.div 
                className="hero-badge"
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <span className="badge-dot">
                    <span className="badge-ping"></span>
                </span>
                <span>{t('hero.badge', { version })}</span>
            </motion.div>

            <h1 className="hero-title">
                <motion.div
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {titleWords1.map((word, index) => (
                    <motion.span
                        variants={child}
                        style={{ display: "inline-block" }}
                        key={index}
                    >
                        {word}
                    </motion.span>
                    ))}
                </motion.div>
                <motion.div
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="gradient-text animate-gradient" 
                >
                    {titleWords2.map((word, index) => (
                    <motion.span
                        variants={child}
                        style={{ display: "inline-block" }}
                        key={index}
                    >
                        {word}
                    </motion.span>
                    ))}
                </motion.div>
                {titleWords3.length > 0 && (
                    <motion.div
                        style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="hero-title-line3"
                    >
                        {titleWords3.map((word, index) => (
                        <motion.span
                            variants={child}
                            style={{ display: "inline-block" }}
                            key={index}
                        >
                            {word}
                        </motion.span>
                        ))}
                    </motion.div>
                )}
            </h1>
            
            <motion.p 
                className="hero-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                {t('hero.description')}
            </motion.p>
            
            <motion.div 
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
            >
                <Link to="/download" className="btn btn-primary shimmer-btn">
                 <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <div className="shimmer"></div>
                    <span>{t('hero.downloadBtn')}</span>
                </Link>                
                <Link to="/how-it-works" className="btn btn-secondary">
                    <span>{t('hero.learnMore')}</span>
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </Link>
            </motion.div>

            <div className="hero-stats animate-on-scroll">
                <StatCounter target={displayDownloads} suffix="+" label={t('hero.stat1downloads') || t('hero.stat1')} />
                <div className="stat-divider"></div>
                <StatCounter target={100} suffix="%" label={t('hero.stat1')} />
                <div className="stat-divider"></div>
                <div className="stat">
                    <span className="stat-number" style={{ background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>0</span>
                    <span className="stat-suffix" style={{ background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ms</span>
                    <span className="stat-label">{t('hero.stat3')}</span>
                </div>
            </div>
        </div>

        <div className="hero-visual animate-on-scroll">
            <div 
                className="app-preview"
            >
                <InteractiveDemo />

                <div className="app-glow-ring"></div>
            </div>
            
            <div className="floating-elements" style={{ pointerEvents: 'none' }}>
                <motion.div 
                    className="float-card float-1"
                    animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="float-icon" style={{ display: 'flex' }}><FiZap size={20} /></span>
                    <span>{t('hero.float1')}</span>
                </motion.div>
                <motion.div 
                    className="float-card float-2"
                    animate={{ y: [0, -8, 0], rotate: [0, -1, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <span className="float-icon" style={{ display: 'flex' }}><FaCircle color="#4ade80" size={12} /></span>
                    <span style={{ color: 'var(--color-accent)' }}>{t('hero.float2')}</span>
                </motion.div>
                <motion.div 
                    className="float-card float-3"
                    animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                    <span className="float-icon" style={{ display: 'flex' }}><FiMousePointer size={18} /></span>
                    <span>{t('hero.float3')}</span>
                </motion.div>
            </div>
        </div>
    </section>
  );
};

export default Hero;
