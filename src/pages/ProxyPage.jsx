import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAndroid, FaApple, FaWindows, FaPlaystation, FaXbox, FaLinux } from 'react-icons/fa';
import { MdDesktopMac } from 'react-icons/md';
import { FiTv, FiShare2, FiDownload, FiPower, FiCheck, FiMonitor, FiWifi, FiSettings, FiGlobe, FiSmartphone, FiChevronRight, FiInfo, FiCopy, FiCheckCircle, FiZap, FiTool, FiAlertTriangle } from 'react-icons/fi';

const ProxyPage = () => {
    const { t } = useLanguage();
    const [activeFaq, setActiveFaq] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [proxyMode, setProxyMode] = useState('pac'); // 'pac' or 'manual'
    const [copiedText, setCopiedText] = useState(null);
    const guideRef = useRef(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedText(text);
            setTimeout(() => setCopiedText(null), 2000);
        });
    };

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
    });

    const devices = [
        { id: 'android', icon: <FaAndroid size={28} color="#3ddc84" />, title: t('proxy.device.android'), color: '#3ddc84' },
        { id: 'ios', icon: <FaApple size={28} color="#f5f5f7" />, title: t('proxy.device.ios'), color: '#f5f5f7' },
        { id: 'windows', icon: <FaWindows size={28} color="#00a4ef" />, title: t('proxy.device.windows'), color: '#00a4ef' },
        { id: 'mac', icon: <MdDesktopMac size={28} color="#c1c8cf" />, title: t('proxy.device.mac'), color: '#c1c8cf' },
        { id: 'playstation', icon: <FaPlaystation size={28} color="#006FCD" />, title: t('proxy.device.playstation'), color: '#006FCD' },
        { id: 'xbox', icon: <FaXbox size={28} color="#107c10" />, title: t('proxy.device.xbox'), color: '#107c10' },
        { id: 'smarttv', icon: <FiTv size={28} color="#94a3b8" />, title: t('proxy.device.smarttv'), color: '#94a3b8' },
        { id: 'linux', icon: <FaLinux size={28} color="#fcc624" />, title: t('proxy.device.linux'), color: '#fcc624' },
    ];

    // Which devices support PAC mode
    const pacSupportedDevices = ['android', 'ios', 'windows', 'mac', 'linux'];

    // PAC mode guides (fewer steps, easier)
    const pacGuides = {
        android: [
            { icon: <FiWifi size={20} />, title: t('proxy.pac.android.step1.title'), desc: t('proxy.pac.android.step1.desc') },
            { icon: <FiSettings size={20} />, title: t('proxy.pac.android.step2.title'), desc: t('proxy.pac.android.step2.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.pac.android.step3.title'), desc: t('proxy.pac.android.step3.desc') },
        ],
        ios: [
            { icon: <FiWifi size={20} />, title: t('proxy.pac.ios.step1.title'), desc: t('proxy.pac.ios.step1.desc') },
            { icon: <FiSettings size={20} />, title: t('proxy.pac.ios.step2.title'), desc: t('proxy.pac.ios.step2.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.pac.ios.step3.title'), desc: t('proxy.pac.ios.step3.desc') },
        ],
        windows: [
            { icon: <FiSettings size={20} />, title: t('proxy.pac.windows.step1.title'), desc: t('proxy.pac.windows.step1.desc') },
            { icon: <FiGlobe size={20} />, title: t('proxy.pac.windows.step2.title'), desc: t('proxy.pac.windows.step2.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.pac.windows.step3.title'), desc: t('proxy.pac.windows.step3.desc') },
        ],
        mac: [
            { icon: <FiSettings size={20} />, title: t('proxy.pac.mac.step1.title'), desc: t('proxy.pac.mac.step1.desc') },
            { icon: <FiGlobe size={20} />, title: t('proxy.pac.mac.step2.title'), desc: t('proxy.pac.mac.step2.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.pac.mac.step3.title'), desc: t('proxy.pac.mac.step3.desc') },
        ],
        linux: [
            { icon: <FiSettings size={20} />, title: t('proxy.pac.linux.step1.title'), desc: t('proxy.pac.linux.step1.desc') },
            { icon: <FiGlobe size={20} />, title: t('proxy.pac.linux.step2.title'), desc: t('proxy.pac.linux.step2.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.pac.linux.step3.title'), desc: t('proxy.pac.linux.step3.desc') },
        ],
    };

    // Manual mode guides (existing)
    const manualGuides = {
        android: [
            { icon: <FiWifi size={20} />, title: t('proxy.guide.android.step1.title'), desc: t('proxy.guide.android.step1.desc') },
            { icon: <FiSettings size={20} />, title: t('proxy.guide.android.step2.title'), desc: t('proxy.guide.android.step2.desc') },
            { icon: <FiGlobe size={20} />, title: t('proxy.guide.android.step3.title'), desc: t('proxy.guide.android.step3.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.guide.android.step4.title'), desc: t('proxy.guide.android.step4.desc') },
        ],
        ios: [
            { icon: <FiWifi size={20} />, title: t('proxy.guide.ios.step1.title'), desc: t('proxy.guide.ios.step1.desc') },
            { icon: <FiSettings size={20} />, title: t('proxy.guide.ios.step2.title'), desc: t('proxy.guide.ios.step2.desc') },
            { icon: <FiGlobe size={20} />, title: t('proxy.guide.ios.step3.title'), desc: t('proxy.guide.ios.step3.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.guide.ios.step4.title'), desc: t('proxy.guide.ios.step4.desc') },
        ],
        windows: [
            { icon: <FiSettings size={20} />, title: t('proxy.guide.windows.step1.title'), desc: t('proxy.guide.windows.step1.desc') },
            { icon: <FiGlobe size={20} />, title: t('proxy.guide.windows.step2.title'), desc: t('proxy.guide.windows.step2.desc') },
            { icon: <FiMonitor size={20} />, title: t('proxy.guide.windows.step3.title'), desc: t('proxy.guide.windows.step3.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.guide.windows.step4.title'), desc: t('proxy.guide.windows.step4.desc') },
        ],
        mac: [
            { icon: <FiSettings size={20} />, title: t('proxy.guide.mac.step1.title'), desc: t('proxy.guide.mac.step1.desc') },
            { icon: <FiGlobe size={20} />, title: t('proxy.guide.mac.step2.title'), desc: t('proxy.guide.mac.step2.desc') },
            { icon: <FiMonitor size={20} />, title: t('proxy.guide.mac.step3.title'), desc: t('proxy.guide.mac.step3.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.guide.mac.step4.title'), desc: t('proxy.guide.mac.step4.desc') },
        ],
        playstation: [
            { icon: <FiSettings size={20} />, title: t('proxy.guide.ps.step1.title'), desc: t('proxy.guide.ps.step1.desc') },
            { icon: <FiGlobe size={20} />, title: t('proxy.guide.ps.step2.title'), desc: t('proxy.guide.ps.step2.desc') },
            { icon: <FiMonitor size={20} />, title: t('proxy.guide.ps.step3.title'), desc: t('proxy.guide.ps.step3.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.guide.ps.step4.title'), desc: t('proxy.guide.ps.step4.desc') },
        ],
        xbox: [
            { icon: <FiSettings size={20} />, title: t('proxy.guide.xbox.step1.title'), desc: t('proxy.guide.xbox.step1.desc') },
            { icon: <FiGlobe size={20} />, title: t('proxy.guide.xbox.step2.title'), desc: t('proxy.guide.xbox.step2.desc') },
            { icon: <FiMonitor size={20} />, title: t('proxy.guide.xbox.step3.title'), desc: t('proxy.guide.xbox.step3.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.guide.xbox.step4.title'), desc: t('proxy.guide.xbox.step4.desc') },
        ],
        smarttv: [
            { icon: <FiSettings size={20} />, title: t('proxy.guide.smarttv.step1.title'), desc: t('proxy.guide.smarttv.step1.desc') },
            { icon: <FiGlobe size={20} />, title: t('proxy.guide.smarttv.step2.title'), desc: t('proxy.guide.smarttv.step2.desc') },
            { icon: <FiMonitor size={20} />, title: t('proxy.guide.smarttv.step3.title'), desc: t('proxy.guide.smarttv.step3.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.guide.smarttv.step4.title'), desc: t('proxy.guide.smarttv.step4.desc') },
        ],
        linux: [
            { icon: <FiSettings size={20} />, title: t('proxy.guide.linux.step1.title'), desc: t('proxy.guide.linux.step1.desc') },
            { icon: <FiGlobe size={20} />, title: t('proxy.guide.linux.step2.title'), desc: t('proxy.guide.linux.step2.desc') },
            { icon: <FiMonitor size={20} />, title: t('proxy.guide.linux.step3.title'), desc: t('proxy.guide.linux.step3.desc') },
            { icon: <FiCheck size={20} />, title: t('proxy.guide.linux.step4.title'), desc: t('proxy.guide.linux.step4.desc') },
        ],
    };

    const selectedDeviceData = selectedDevice ? devices.find((d) => d.id === selectedDevice) : null;
    const deviceSupportsPac = selectedDevice ? pacSupportedDevices.includes(selectedDevice) : false;
    const activeMode = deviceSupportsPac ? proxyMode : 'manual';
    const currentGuide = selectedDevice
        ? (activeMode === 'pac' && pacGuides[selectedDevice] ? pacGuides[selectedDevice] : manualGuides[selectedDevice])
        : null;

    const handleDeviceSelect = (deviceId) => {
        setSelectedDevice(deviceId);
        // Auto-switch to PAC if supported, manual otherwise
        if (pacSupportedDevices.includes(deviceId)) {
            setProxyMode('pac');
        } else {
            setProxyMode('manual');
        }
        setTimeout(() => {
            guideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const prerequisiteSteps = [
        {
            num: '01',
            title: t('proxy.step1.title'),
            desc: t('proxy.step1.desc'),
            icon: <FiDownload size={24} color="var(--color-primary-light)" />
        },
        {
            num: '02',
            title: t('proxy.step2.title'),
            desc: t('proxy.step2.desc'),
            icon: <FiPower size={24} color="var(--color-primary-light)" />
        },
        {
            num: '03',
            title: t('proxy.step3.title'),
            desc: t('proxy.step3.desc'),
            icon: <FiMonitor size={24} color="var(--color-primary-light)" />
        },
        {
            num: '04',
            title: t('proxy.step4.title'),
            desc: t('proxy.step4.desc'),
            icon: <FiCheck size={26} color="var(--color-accent)" />
        },
    ];

    const faqs = [
        { q: t('proxy.faq1.q'), a: t('proxy.faq1.a') },
        { q: t('proxy.faq2.q'), a: t('proxy.faq2.a') },
        { q: t('proxy.faq3.q'), a: t('proxy.faq3.a') },
        { q: t('proxy.faq4.q'), a: t('proxy.faq4.a') },
    ];

    const pacUrl = 'http://192.168.1.x:8787/proxy.pac';

    return (
        <div className="proxy-page">
            <AnimatedBackground />
            <Navbar />

            <main className="proxy-page-content">
                <div className="container">

                    {/* ===== HERO SECTION ===== */}
                    <motion.div className="proxy-hero" {...fadeUp(0)}>
                        <span className="proxy-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M2 12h20"/>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                            {t('proxy.badge')}
                        </span>
                        <h1 className="proxy-title">
                            {t('proxy.titleLine1')} <span className="gradient-text animate-gradient">{t('proxy.titleLine2')}</span>
                        </h1>
                        <p className="proxy-subtitle">{t('proxy.description')}</p>
                    </motion.div>

                    {/* ===== PREREQUISITE: Steps on the Host PC ===== */}
                    <motion.div className="proxy-steps-section" {...fadeUp(0.1)}>
                        <div className="section-header">
                            <span className="section-badge">{t('proxy.stepsTitle')}</span>
                            <h2 className="section-title">{t('proxy.stepsHeading')}</h2>
                            <p className="section-description">{t('proxy.stepsDesc')}</p>
                        </div>

                        <div className="proxy-steps-grid">
                            {prerequisiteSteps.map((step, i) => (
                                <motion.div
                                    key={step.num}
                                    className="proxy-step-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12 }}
                                >
                                    <div className="proxy-step-num">{step.num}</div>
                                    <div className="proxy-step-icon">{step.icon}</div>
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ===== DEVICE SELECTOR (Inline) ===== */}
                    <motion.div className="proxy-device-selector-section" {...fadeUp(0.2)}>
                        <div className="section-header">
                            <span className="section-badge localshare-badge-glow">{t('proxy.chooseDeviceBadge')}</span>
                            <h2 className="section-title">{t('proxy.chooseDeviceTitle')}</h2>
                            <p className="section-description">{t('proxy.chooseDeviceDesc')}</p>
                        </div>

                        <div className="proxy-device-picker">
                            {devices.map((device, i) => (
                                <motion.button
                                    key={device.id}
                                    type="button"
                                    className={`proxy-device-pill ${selectedDevice === device.id ? 'active' : ''}`}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06 }}
                                    onClick={() => handleDeviceSelect(device.id)}
                                    style={selectedDevice === device.id ? { '--device-color': device.color } : {}}
                                >
                                    <span className="proxy-device-pill-icon">{device.icon}</span>
                                    <span className="proxy-device-pill-label">{device.title}</span>
                                    {selectedDevice === device.id && (
                                        <motion.span
                                            className="proxy-device-pill-check"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                        >
                                            <FiCheck size={14} />
                                        </motion.span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* ===== DEVICE-SPECIFIC GUIDE (Inline, appears after selection) ===== */}
                    <div ref={guideRef} style={{ scrollMarginTop: '100px' }}>
                        <AnimatePresence mode="wait">
                            {selectedDevice && currentGuide && (
                                <motion.div
                                    key={`${selectedDevice}-${activeMode}`}
                                    className="proxy-guide-section"
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <div className="proxy-guide-header">
                                        <div className="proxy-guide-device-badge" style={{ '--device-color': selectedDeviceData.color }}>
                                            {selectedDeviceData.icon}
                                            <span>{t('proxy.guideTitle', { device: selectedDeviceData.title })}</span>
                                        </div>
                                    </div>

                                    {/* ===== PAC / MANUAL MODE TABS ===== */}
                                    {deviceSupportsPac ? (
                                        <div className="proxy-mode-switcher">
                                            <button
                                                className={`proxy-mode-tab ${activeMode === 'pac' ? 'active pac-active' : ''}`}
                                                onClick={() => setProxyMode('pac')}
                                            >
                                                <FiZap size={16} />
                                                <span>{t('proxy.modePac')}</span>
                                                <span className="proxy-mode-badge-rec">{t('proxy.modeRecommended')}</span>
                                            </button>
                                            <button
                                                className={`proxy-mode-tab ${activeMode === 'manual' ? 'active manual-active' : ''}`}
                                                onClick={() => setProxyMode('manual')}
                                            >
                                                <FiTool size={16} />
                                                <span>{t('proxy.modeManual')}</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="proxy-mode-only-manual">
                                            <FiTool size={15} />
                                            <span>{t('proxy.modeManualOnly')}</span>
                                        </div>
                                    )}

                                    {/* ===== WARNING BOXES ===== */}
                                    {activeMode === 'pac' && (
                                        <div className="proxy-guide-warning-box proxy-guide-warning-pac">
                                            <div className="proxy-guide-warning-icon">
                                                <FiInfo size={16} />
                                            </div>
                                            <p>{t('proxy.pacWarning')}</p>
                                        </div>
                                    )}
                                    {activeMode === 'manual' && (
                                        <div className="proxy-guide-warning-box proxy-guide-warning-manual">
                                            <div className="proxy-guide-warning-icon warning-red">
                                                <FiAlertTriangle size={16} />
                                            </div>
                                            <p>{t('proxy.manualWarning')}</p>
                                        </div>
                                    )}

                                    {/* ===== VALUES BOX ===== */}
                                    <div className="proxy-guide-info-box">
                                        <div className="proxy-guide-info-icon">
                                            <FiInfo size={18} />
                                        </div>
                                        <div className="proxy-guide-info-content">
                                            <strong>{activeMode === 'pac' ? t('proxy.pacInfoTitle') : t('proxy.guideInfoTitle')}</strong>
                                            <p>{activeMode === 'pac' ? t('proxy.pacInfoDesc') : t('proxy.guideInfoDesc')}</p>
                                            <div className="proxy-guide-example-values">
                                                {activeMode === 'pac' ? (
                                                    <div className="proxy-guide-value-chip proxy-guide-value-chip-wide" onClick={() => handleCopy(pacUrl)}>
                                                        <span className="proxy-guide-value-label">{t('proxy.pacUrlLabel')}</span>
                                                        <code>{pacUrl}</code>
                                                        {copiedText === pacUrl ? <FiCheckCircle size={14} className="copied-icon" /> : <FiCopy size={14} className="copy-icon" />}
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="proxy-guide-value-chip" onClick={() => handleCopy('192.168.1.x')}>
                                                            <span className="proxy-guide-value-label">{t('proxy.guideIPLabel')}</span>
                                                            <code>192.168.1.x</code>
                                                            {copiedText === '192.168.1.x' ? <FiCheckCircle size={14} className="copied-icon" /> : <FiCopy size={14} className="copy-icon" />}
                                                        </div>
                                                        <div className="proxy-guide-value-chip" onClick={() => handleCopy('8080')}>
                                                            <span className="proxy-guide-value-label">{t('proxy.guidePortLabel')}</span>
                                                            <code>8080</code>
                                                            {copiedText === '8080' ? <FiCheckCircle size={14} className="copied-icon" /> : <FiCopy size={14} className="copy-icon" />}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step-by-step guide */}
                                    <div className="proxy-guide-steps">
                                        {currentGuide.map((step, i) => (
                                            <motion.div
                                                key={`${activeMode}-${i}`}
                                                className={`proxy-guide-step ${i === currentGuide.length - 1 ? 'proxy-guide-step-final' : ''}`}
                                                initial={{ opacity: 0, x: -16 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.12, duration: 0.4 }}
                                            >
                                                <div className="proxy-guide-step-number">
                                                    <span>{String(i + 1).padStart(2, '0')}</span>
                                                </div>
                                                <div className="proxy-guide-step-connector" />
                                                <div className="proxy-guide-step-content">
                                                    <div className="proxy-guide-step-icon-wrap">
                                                        {step.icon}
                                                    </div>
                                                    <div className="proxy-guide-step-text">
                                                        <h4>{step.title}</h4>
                                                        <p>{step.desc}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Tip */}
                                    <div className="proxy-guide-pac-tip">
                                        <span className="proxy-guide-pac-emoji">💡</span>
                                        <p>{activeMode === 'pac' ? t('proxy.pacTipAlt') : t('proxy.guidePacTip')}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ===== WHAT IS PROXY ===== */}
                    <motion.div className="proxy-explain-section" {...fadeUp(0.25)}>
                        <div className="proxy-explain-card">
                            <div className="proxy-explain-icon">
                                <FiShare2 size={40} strokeWidth={1.5} color="var(--color-primary-light)" />
                            </div>
                            <div className="proxy-explain-content">
                                <h2>{t('proxy.whatTitle')}</h2>
                                <p>{t('proxy.whatDesc')}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ===== DPI BYPASS INFO ===== */}
                    <motion.div className="proxy-dpi-section" {...fadeUp(0.3)}>
                        <div className="proxy-dpi-card">
                            <div className="proxy-dpi-glow-1"></div>
                            <div className="proxy-dpi-glow-2"></div>
                            <div className="proxy-dpi-content">
                                <div className="proxy-dpi-icon-wrap">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                                    </svg>
                                </div>
                                <h3>{t('proxy.dpiTitle')}</h3>
                                <p>{t('proxy.dpiDesc')}</p>
                                <div className="proxy-dpi-features">
                                    {[t('proxy.dpiFeat1'), t('proxy.dpiFeat2'), t('proxy.dpiFeat3'), t('proxy.dpiFeat4'), t('proxy.dpiFeat5')].map((feat, i) => (
                                        <div className="proxy-dpi-feat" key={i}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                                <polyline points="20 6 9 17 4 12"/>
                                            </svg>
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ===== FAQ ===== */}
                    <motion.div className="proxy-faq-section" {...fadeUp(0.35)}>
                        <div className="section-header">
                            <span className="section-badge">{t('proxy.faqTitle')}</span>
                            <h2 className="section-title">{t('proxy.faqHeading')}</h2>
                        </div>

                        <div className="faq-wrapper">
                            {faqs.map((faq, i) => (
                                <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`}>
                                    <button className="faq-question" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                                        <span>{faq.q}</span>
                                        <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                            <polyline points="6 9 12 15 18 9"/>
                                        </svg>
                                    </button>
                                    <div className="faq-answer">
                                        <p>{faq.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ===== CTA ===== */}
                    <motion.div className="proxy-cta-section" {...fadeUp(0.4)}>
                        <div className="proxy-cta-card">
                            <div className="cta-glow cta-glow-1"></div>
                            <div className="cta-glow cta-glow-2"></div>
                            <div className="proxy-cta-content">
                                <h3>{t('proxy.ctaTitle')}</h3>
                                <p>{t('proxy.ctaDesc')}</p>
                                <div className="proxy-cta-actions">
                                    <Link to="/download" className="btn btn-primary shimmer-btn">
                                        <span className="shimmer"></span>
                                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                        {t('proxy.ctaBtn')}
                                    </Link>
                                    <Link to="/" className="btn btn-secondary">
                                        {t('proxy.ctaLearnMore')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProxyPage;
