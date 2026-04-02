import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiShield, FiPower, FiSettings, FiFileText } from 'react-icons/fi';
import './InteractiveDemo.css';

const i18n = {
    tr: {
        statusActive: 'AKTİF', statusReady: 'HAZIR',
        statusConnected: 'GÜVENLİ', statusConnecting: 'BAĞLANIYOR...',
        statusDisconnecting: 'KESİLİYOR...', statusReady2: 'HAZIR',
        descConnected: 'Bağlantınız şifrelendi ve korunuyor.',
        descConnecting: 'İşlem yapılıyor, lütfen bekleyin.',
        descReady: 'DPI Bypass için bağlanın.',
        btnConnect: 'BAĞLAN', btnDisconnect: 'BAĞLANTIYI KES',
        btnConnecting: 'BAĞLANIYOR...', btnDisconnecting: 'KESİLİYOR...',
        devSubscribe: 'Abone Ol', devSupport: 'Destekle',
        navSettings: 'AYARLAR', navLogs: 'LOGLAR', navExit: 'ÇIKIŞ',
    },
    en: {
        statusActive: 'ACTIVE', statusReady: 'READY',
        statusConnected: 'SECURE', statusConnecting: 'CONNECTING...',
        statusDisconnecting: 'DISCONNECTING...', statusReady2: 'READY',
        descConnected: 'Your connection is encrypted and protected.',
        descConnecting: 'Processing, please wait.',
        descReady: 'Connect for DPI Bypass.',
        btnConnect: 'CONNECT', btnDisconnect: 'DISCONNECT',
        btnConnecting: 'CONNECTING...', btnDisconnecting: 'DISCONNECTING...',
        devSubscribe: 'Subscribe', devSupport: 'Support',
        navSettings: 'SETTINGS', navLogs: 'LOGS', navExit: 'EXIT',
    }
};

const InteractiveDemo = () => {
    const { currentLang } = useLanguage();
    const t = i18n[currentLang] || i18n.tr;

    const [isConnected, setIsConnected] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const toggleConnection = () => {
        if (isProcessing) return;
        setIsProcessing(true);
        setTimeout(() => {
            setIsConnected(prev => !prev);
            setIsProcessing(false);
        }, 1500);
    };

    return (
        <div className="bypax-app-wrapper" style={{
            width: '360px', height: '680px', position: 'relative',
            borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
            margin: '0 auto', transform: 'scale(0.95)', transformOrigin: 'center', background: '#0a0a12'
        }}>
            {/* Titlebar */}
            <div style={{
                height: '32px', background: '#0a0a12', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '0 12px', borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <img src="/favicon.png" alt="logo" style={{ width: '14px', height: '14px' }} />
                    <span style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>BypaxDPI</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', color: '#a1a1aa' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M0 5H10" stroke="currentColor" strokeWidth="1"/></svg>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="0.5" y="0.5" width="9" height="9" stroke="currentColor" strokeWidth="1"/></svg>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1"/></svg>
                </div>
            </div>

            {/* App */}
            <div className="app-container fade-in" style={{ height: 'calc(100% - 32px)' }}>
                <header className="app-header">
                    <div className="brand">
                        <img src="/favicon.png" alt="BypaxDPI" className="brand-logo" />
                        <span className="brand-name">BYPAXDPI</span>
                    </div>
                    <div className={`status-badge ${isConnected ? 'active' : isProcessing ? 'processing' : 'passive'}`}>
                        <div className="status-dot" />
                        <span>
                            {isProcessing
                                ? (isConnected ? t.statusDisconnecting : t.statusConnecting)
                                : (isConnected ? t.statusActive : t.statusReady)}
                        </span>
                    </div>
                </header>

                <main className="main-content">
                    <div className="shield-wrapper" onClick={toggleConnection} style={{ cursor: 'pointer' }}>
                        <div className={`shield-circle ${isConnected ? 'connected' : isProcessing ? 'processing' : ''}`}>
                            <FiShield size={56} strokeWidth={1.5} className="shield-icon" />
                        </div>
                    </div>
                    <div className="status-text">
                        <h1 className={`status-title ${isConnected ? 'connected' : isProcessing ? 'processing' : ''}`}>
                            {isProcessing
                                ? (isConnected ? t.statusDisconnecting : t.statusConnecting)
                                : (isConnected ? t.statusConnected : t.statusReady2)}
                        </h1>
                        <p className="status-desc">
                            {isProcessing ? t.descConnecting : isConnected ? t.descConnected : t.descReady}
                        </p>
                    </div>
                </main>

                <div className="action-area">
                    <button
                        className={`main-btn ${isConnected ? 'disconnect' : 'connect'} ${isProcessing ? 'processing' : ''}`}
                        onClick={toggleConnection} disabled={isProcessing}
                    >
                        <FiPower size={22} strokeWidth={2.5} />
                        <span>
                            {isProcessing
                                ? (isConnected ? t.btnDisconnecting : t.btnConnecting)
                                : (isConnected ? t.btnDisconnect : t.btnConnect)}
                        </span>
                    </button>
                </div>

                <AnimatePresence>
                    {!isConnected && !isProcessing && (
                        <motion.div className="social-links-bar"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.25 }}>
                            <button className="social-link-btn youtube-btn" onClick={() => window.open('https://youtube.com/@ConsolAktif', '_blank')}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <span>{t.devSubscribe}</span>
                            </button>
                            <button className="social-link-btn patreon-btn" onClick={() => window.open('https://www.patreon.com/join/ConsolAktif', '_blank')}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524zM.003 23.537h4.22V.524H.003v23.013z"/>
                                </svg>
                                <span>{t.devSupport}</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <nav className="bottom-nav">
                    <button className="nav-btn">
                        <FiSettings size={22} strokeWidth={2} />
                        <span>{t.navSettings}</span>
                    </button>
                    <div className="nav-divider" />
                    <button className="nav-btn">
                        <FiFileText size={22} strokeWidth={2} />
                        <span>{t.navLogs}</span>
                    </button>
                    <div className="nav-divider" />
                    <button className="nav-btn exit">
                        <FiPower size={22} strokeWidth={2} />
                        <span>{t.navExit}</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default InteractiveDemo;
