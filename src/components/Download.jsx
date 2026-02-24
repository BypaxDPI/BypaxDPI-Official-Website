import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import useGitHubReleases from '../hooks/useGitHubReleases';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Download = () => {
    const { t } = useLanguage();
    const { downloadLinks, verInfo } = useGitHubReleases();
    useScrollAnimation();

    return (
        <section className="download-section" id="download">
            <div className="container">
                <div className="download-wrapper animate-on-scroll">
                    <div className="download-glow"></div>
                    <div className="download-content">
                        <span className="download-badge">{t('download.badge')}</span>
                        <h2 className="download-title">{t('download.title')}</h2>
                        <p className="download-description">
                            {t('download.description')}
                        </p>

                        <div className="download-buttons">
                            {/* Windows Group */}
                            <div className="platform-group">
                                <div className="platform-label">
                                    <span className="float-icon-small">🪟</span> Windows
                                </div>
                                <div className="group-buttons">
                                    <a href={downloadLinks.winExe} className="btn btn-download btn-win" id="btn-download-win-exe" download>
                                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        <div className="btn-text">
                                            <span className="btn-label">{t('download.buttonWinExe')}</span>
                                            <span className="btn-sub">{verInfo.winExe}</span>
                                        </div>
                                    </a>

                                    <a href={downloadLinks.winMsi} className="btn btn-download btn-win" id="btn-download-win-msi" download>
                                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        <div className="btn-text">
                                            <span className="btn-label">{t('download.buttonWinMsi')}</span>
                                            <span className="btn-sub">{verInfo.winMsi}</span>
                                        </div>
                                    </a>

                                    <a href="https://github.com/BypaxDPI/BypaxDPI-Windows" className="btn btn-github" target="_blank" rel="noopener noreferrer">
                                        <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                        </svg>
                                        <span>{t('download.githubWin')}</span>
                                    </a>
                                </div>
                            </div>

                            {/* macOS Group */}
                            <div className="platform-group">
                                <div className="platform-label">
                                    <span className="float-icon-small">🍎</span> macOS
                                </div>
                                <div className="group-buttons">
                                    <a href={downloadLinks.mac} className="btn btn-download btn-mac" id="btn-download-mac" download>
                                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        <div className="btn-text">
                                            <span className="btn-label">{t('download.buttonMac')}</span>
                                            <span className="btn-sub">{verInfo.mac}</span>
                                        </div>
                                    </a>

                                    <a href="https://github.com/BypaxDPI/BypaxDPI-MacOS" className="btn btn-github" target="_blank" rel="noopener noreferrer">
                                        <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                        </svg>
                                        <span>{t('download.githubMac')}</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="download-note">
                            <span className="note-icon">📦</span>
                            <span>{t('download.note')}</span>
                        </div>

                        <div className="download-info">
                            <div className="info-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{t('download.info1')}</span>
                            </div>
                            <div className="info-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{t('download.info2')}</span>
                            </div>
                            <div className="info-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{t('download.info3')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Download;
