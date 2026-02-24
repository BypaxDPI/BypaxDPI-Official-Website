import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import useGitHubReleases from '../hooks/useGitHubReleases';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { motion } from 'framer-motion';

const DownloadPage = () => {
    const { t } = useLanguage();
    const { downloadLinks, verInfo } = useGitHubReleases();

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
    });

    return (
        <div className="download-page">
            <AnimatedBackground />
            <Navbar />

            <main className="download-page-content">
                <div className="container">
                    {/* Header */}
                    <motion.div className="download-page-header" {...fadeUp(0)}>
                        <span className="download-page-badge">{t('download.badge')}</span>
                        <h1 className="download-page-title">{t('download.title')}</h1>
                        <p className="download-page-subtitle">{t('download.description')}</p>
                    </motion.div>

                    {/* Platform Cards */}
                    <div className="download-platforms">
                        {/* Windows */}
                        <motion.div className="download-platform-card" {...fadeUp(0.15)}>
                            <div className="dp-card-header">
                                <div className="dp-icon dp-icon-win">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="dp-title">Windows</h2>
                                    <p className="dp-subtitle">Windows 10 / 11</p>
                                </div>
                            </div>

                            <div className="dp-card-body">
                                <p className="dp-desc">{t('platform.windows.desc')}</p>

                                <div className="dp-tech-row">
                                    <span className="dp-tech">Rust</span>
                                    <span className="dp-tech">Tauri</span>
                                    <span className="dp-tech">WebView2</span>
                                </div>

                                <div className="dp-downloads">
                                    <a href={downloadLinks.winExe} className="dp-btn dp-btn-primary" download>
                                        <svg className="dp-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                        <div className="dp-btn-text">
                                            <span className="dp-btn-label">{t('download.buttonWinExe')}</span>
                                            <span className="dp-btn-ver">{verInfo.winExe}</span>
                                        </div>
                                    </a>
                                    <a href={downloadLinks.winMsi} className="dp-btn dp-btn-secondary" download>
                                        <svg className="dp-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                        <div className="dp-btn-text">
                                            <span className="dp-btn-label">{t('download.buttonWinMsi')}</span>
                                            <span className="dp-btn-ver">{verInfo.winMsi}</span>
                                        </div>
                                    </a>
                                </div>

                                <a href="https://github.com/BypaxDPI/BypaxDPI-Windows" target="_blank" rel="noopener noreferrer" className="dp-github-link">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                    </svg>
                                    <span>{t('download.githubWin')}</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                        <path d="M7 17L17 7M17 7H7M17 7v10"/>
                                    </svg>
                                </a>
                            </div>
                        </motion.div>

                        {/* macOS */}
                        <motion.div className="download-platform-card" {...fadeUp(0.3)}>
                            <div className="dp-card-header">
                                <div className="dp-icon dp-icon-mac">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="dp-title">macOS</h2>
                                    <p className="dp-subtitle">macOS 13.0+</p>
                                </div>
                            </div>

                            <div className="dp-card-body">
                                <p className="dp-desc">{t('platform.macos.desc')}</p>

                                <div className="dp-tech-row">
                                    <span className="dp-tech">Swift</span>
                                    <span className="dp-tech">SwiftUI</span>
                                    <span className="dp-tech">Homebrew</span>
                                </div>

                                <div className="dp-downloads">
                                    <a href={downloadLinks.mac} className="dp-btn dp-btn-primary" download>
                                        <svg className="dp-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                        <div className="dp-btn-text">
                                            <span className="dp-btn-label">{t('download.buttonMac')}</span>
                                            <span className="dp-btn-ver">{verInfo.mac}</span>
                                        </div>
                                    </a>
                                </div>

                                <a href="https://github.com/BypaxDPI/BypaxDPI-MacOS" target="_blank" rel="noopener noreferrer" className="dp-github-link">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                    </svg>
                                    <span>{t('download.githubMac')}</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                        <path d="M7 17L17 7M17 7H7M17 7v10"/>
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Info */}
                    <motion.div className="download-page-info" {...fadeUp(0.45)}>
                        <div className="dpi-info-grid">
                            <div className="dpi-info-item">
                                <div className="dpi-info-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                                <span>{t('download.info1')}</span>
                            </div>
                            <div className="dpi-info-item">
                                <div className="dpi-info-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                                <span>{t('download.info2')}</span>
                            </div>
                            <div className="dpi-info-item">
                                <div className="dpi-info-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                                <span>{t('download.info3')}</span>
                            </div>
                        </div>

                        <div className="download-page-note">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                            </svg>
                            <span>{t('download.note')}</span>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DownloadPage;
