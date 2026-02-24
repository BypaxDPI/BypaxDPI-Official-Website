import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

/* ─── Uygulama chip listesi (uygulama isimleri evrensel) ─── */
const apps = [
    { name: 'Discord',  icon: '💬', color: '#5865F2' },
    { name: 'Roblox',   icon: '🎮', color: '#e40000' },
    { name: 'Steam',    icon: '🎯', color: '#66c0f4' },
    { name: 'Spotify',  icon: '🎵', color: '#1DB954' },
    { name: 'YouTube',  icon: '▶️', color: '#FF0000' },
    { name: 'Twitch',   icon: '📺', color: '#9146FF' },
];

/* ─── 4 Video kanıt kartı title/desc t() ile gelir ─── */
const getProofCards = (t) => [
    {
        id: 'ui',
        num: '01',
        icon: '🖥️',
        accentColor: '#818cf8',
        bgColor: 'rgba(129,140,248,0.04)',
        borderColor: 'rgba(129,140,248,0.15)',
        title: t('proof.card1.title'),
        desc:  t('proof.card1.desc'),
        videoSrc: '/videos/ui_show.mp4',
        placeholderLines: [
            t('proof.card1.line1'),
            t('proof.card1.line2'),
            t('proof.card1.line3'),
            t('proof.card1.line4'),
        ],
    },
    {
        id: 'sites',
        num: '02',
        icon: '🌍',
        accentColor: '#60a5fa',
        bgColor: 'rgba(96,165,250,0.04)',
        borderColor: 'rgba(96,165,250,0.15)',
        title: t('proof.card2.title'),
        desc:  t('proof.card2.desc'),
        videoSrc: '/videos/connection_test.mp4',
        placeholderLines: [],
    },
    {
        id: 'discord',
        num: '03',
        icon: '💬',
        accentColor: '#5865F2',
        bgColor: 'rgba(88,101,242,0.04)',
        borderColor: 'rgba(88,101,242,0.15)',
        title: t('proof.card3.title'),
        desc:  t('proof.card3.desc'),
        videoSrc: '/videos/discord_test.mp4',
        placeholderLines: [],
        hasRealImages: true,
        beforeImg: '/images/discord_not.jpg',
        afterImg:  '/images/discord_yes.jpg',
    },
    {
        id: 'speedtest',
        num: '04',
        icon: '⚡',
        accentColor: '#4ade80',
        bgColor: 'rgba(74,222,128,0.04)',
        borderColor: 'rgba(74,222,128,0.15)',
        title: t('proof.card4.title'),
        desc:  t('proof.card4.desc'),
        videoSrc: '/videos/speed_test.mp4',
        placeholderLines: [],
    },
];

/* ─── Video Lightbox Modal ─── */
const VideoModal = ({ src, label, onClose }) => {
    const videoRef = useRef(null);

    React.useEffect(() => {
        videoRef.current?.play();
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const modal = (
        <AnimatePresence>
            <motion.div
                className="video-modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
            >
                <motion.div
                    className="video-modal-box"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 40, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Başlık videonun üzerinde absolute */}
                    <div className="video-modal-header">
                        <span className="video-modal-title">{label}</span>
                        <button className="video-modal-close" onClick={onClose} aria-label="Kapat">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    {/* Video */}
                    <video
                        ref={videoRef}
                        src={src}
                        controls
                        loop
                        playsInline
                        className="video-modal-video"
                    />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    // document.body'ye portal hiçbir stacking context'ten etkilenmez
    return ReactDOM.createPortal(modal, document.body);
};

/* ─── Video Oynatıcı (küçük kart + büyüt butonu) ─── */
const VideoPlayer = ({ src, label }) => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const togglePlay = (e) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        if (playing) { videoRef.current.pause(); setPlaying(false); }
        else         { videoRef.current.play();  setPlaying(true);  }
    };

    const openModal = (e) => {
        e.stopPropagation();
        videoRef.current?.pause();
        setPlaying(false);
        setModalOpen(true);
    };

    return (
        <>
            <div className="proof-video-wrapper" onClick={togglePlay} title={label}>
                <video
                    ref={videoRef}
                    src={src}
                    loop
                    playsInline
                    className="proof-video"
                    onEnded={() => setPlaying(false)}
                />

                {/* Oynat overlay */}
                <div className={`proof-play-btn ${playing ? 'proof-play-btn--hidden' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span className="proof-play-label">{label}</span>
                </div>

                {/* Büyüt butonu her zaman sağ üstte görünür */}
                <button
                    className="proof-expand-btn"
                    onClick={openModal}
                    title="Büyüt"
                    aria-label="Videoyu büyüt"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                        <polyline points="15 3 21 3 21 9" />
                        <polyline points="9 21 3 21 3 15" />
                        <line x1="21" y1="3" x2="14" y2="10" />
                        <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                </button>
            </div>

            {/* Modal */}
            {modalOpen && (
                <VideoModal src={src} label={label} onClose={() => setModalOpen(false)} />
            )}
        </>
    );
};

/* ─── Discord Önce / Sonra ─── */
const DiscordBeforeAfter = ({ card, t }) => {
    const [active, setActive] = useState('before');
    return (
        <div className="proof-discord-split">
            <div className="discord-tabs">
                <button
                    className={`discord-tab ${active === 'before' ? 'discord-tab--active discord-tab--bad' : ''}`}
                    onClick={() => setActive('before')}
                >
                    <span>🔴</span>{t('proof.discordBefore')}
                </button>
                <button
                    className={`discord-tab ${active === 'after' ? 'discord-tab--active discord-tab--good' : ''}`}
                    onClick={() => setActive('after')}
                >
                    <span>🟢</span>{t('proof.discordAfter')}
                </button>
            </div>

            <div className="discord-image-frame">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={active}
                        src={active === 'before' ? card.beforeImg : card.afterImg}
                        alt={active === 'before' ? t('proof.cantConnect') : t('proof.connected')}
                        className="discord-proof-img"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.3 }}
                    />
                </AnimatePresence>
                <div className={`discord-img-badge ${active === 'before' ? 'badge-bad' : 'badge-good'}`}>
                    {active === 'before' ? t('proof.cantConnect') : t('proof.connected')}
                </div>
            </div>

            <p className="discord-toggle-hint">{t('proof.switchHint')}</p>
        </div>
    );
};

/* ─── Video Placeholder ─── */
const VideoPlaceholder = ({ card, t }) => (
    <div className="proof-placeholder" style={{ borderColor: card.borderColor, background: card.bgColor }}>
        <div className="proof-placeholder-icon">{card.icon}</div>
        <p className="proof-placeholder-title" style={{ color: card.accentColor }}>
            {t('proof.videoSoon')}
        </p>
        <div className="proof-placeholder-lines">
            {card.placeholderLines.map((line, i) => (
                <div key={i} className="proof-placeholder-line">{line}</div>
            ))}
        </div>
        <p className="proof-placeholder-hint">
            {t('proof.videoHint').replace('{id}', card.id)}
        </p>
    </div>
);

/* ─────────────────────────────────────────────
   Ana Bileşen
   ───────────────────────────────────────────── */
const ShowcaseSection = () => {
    const { t } = useLanguage();
    useScrollAnimation();

    const proofCards = getProofCards(t);

    return (
        <>
            {/* ══════════════════════════════════════════
                BÖLÜM 1: Discord Önce / Sonra
            ══════════════════════════════════════════ */}
            <section className="showcase-section" id="showcase">
                <div className="container">

                    <div className="section-header animate-on-scroll">
                        <span className="section-badge showcase-badge">
                            {t('showcase.badge')}
                        </span>
                        <h2 className="section-title">
                            <span style={{ color: 'var(--color-accent)' }}>
                                {t('showcase.title1')}
                            </span>{' '}
                            {t('showcase.title2')}
                        </h2>
                        <p className="section-description">
                            {t('showcase.desc')}
                        </p>
                    </div>

                    {/* Önce / Sonra */}
                    <div className="showcase-cards animate-on-scroll">

                        {/* ÖNCE */}
                        <motion.div
                            className="showcase-card"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ background: 'rgba(239,68,68,0.04)', borderColor: 'rgba(239,68,68,0.18)' }}
                        >
                            <div className="showcase-card-label" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.18)', background: 'rgba(239,68,68,0.08)' }}>
                                <span className="showcase-dot dot-red" />
                                {t('showcase.beforeLabel')}
                            </div>
                            <div className="showcase-media" style={{ borderColor: 'rgba(239,68,68,0.12)', background: 'rgba(239,68,68,0.03)' }}>
                                <img
                                    src="/images/discord_not.jpg"
                                    alt={t('showcase.beforeLabel')}
                                    className="showcase-image"
                                    style={{ objectFit: 'contain', padding: '24px', maxHeight: '240px' }}
                                />
                            </div>
                            <div className="showcase-card-info">
                                <h4 style={{ color: '#ef4444' }}>{t('showcase.beforeCardTitle')}</h4>
                                <p>{t('showcase.beforeCardDesc')}</p>
                            </div>
                        </motion.div>

                        {/* Ok */}
                        <div className="showcase-arrow">
                            <motion.div
                                className="arrow-inner"
                                animate={{ x: [0, 8, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="28" height="28">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* SONRA */}
                        <motion.div
                            className="showcase-card"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            style={{ background: 'rgba(74,222,128,0.04)', borderColor: 'rgba(74,222,128,0.18)' }}
                        >
                            <div className="showcase-card-label" style={{ color: '#4ade80', borderColor: 'rgba(74,222,128,0.18)', background: 'rgba(74,222,128,0.08)' }}>
                                <span className="showcase-dot dot-green" />
                                {t('showcase.afterLabel')}
                            </div>
                            <div className="showcase-media" style={{ borderColor: 'rgba(74,222,128,0.12)', background: 'rgba(74,222,128,0.03)' }}>
                                <img
                                    src="/images/discord_yes.jpg"
                                    alt={t('showcase.afterLabel')}
                                    className="showcase-image"
                                    style={{ objectFit: 'contain', padding: '24px', maxHeight: '240px' }}
                                />
                            </div>
                            <div className="showcase-card-info">
                                <h4 style={{ color: '#4ade80' }}>{t('showcase.afterCardTitle')}</h4>
                                <p>{t('showcase.afterCardDesc')}</p>
                            </div>
                        </motion.div>

                    </div>

                    {/* Uygulama Chip'leri */}
                    <div className="showcase-apps animate-on-scroll">
                        <p className="showcase-apps-label">{t('showcase.appsLabel')}</p>
                        <div className="apps-grid">
                            {apps.map((app, i) => (
                                <motion.div
                                    key={app.name}
                                    className="app-chip"
                                    style={{ '--app-color': app.color }}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ scale: 1.06 }}
                                >
                                    <span className="app-chip-icon">{app.icon}</span>
                                    <span className="app-chip-name">{app.name}</span>
                                    <span className="app-chip-check">✓</span>
                                </motion.div>
                            ))}
                        </div>
                        <p className="showcase-apps-sub">{t('showcase.appsSub')}</p>
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════
                BÖLÜM 2: 4 Video Kanıt
            ══════════════════════════════════════════ */}
            <section className="proof-section" id="proof">
                <div className="container">

                    <div className="section-header animate-on-scroll">
                        <span className="section-badge proof-badge">
                            {t('proof.badge')}
                        </span>
                        <h2 className="section-title">
                            {t('proof.title1')}{' '}
                            <span style={{ color: 'var(--color-primary-light)' }}>
                                {t('proof.title2')}
                            </span>
                        </h2>
                        <p className="section-description">
                            {t('proof.desc')}
                        </p>
                    </div>

                    <div className="proof-grid animate-on-scroll">
                        {proofCards.map((card, i) => (
                            <motion.div
                                key={card.id}
                                className="proof-card"
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    '--proof-accent': card.accentColor,
                                    borderColor: card.borderColor,
                                    background: card.bgColor,
                                }}
                            >
                                {/* Kart Başlığı */}
                                <div className="proof-card-header">
                                    <div className="proof-num" style={{ color: card.accentColor }}>{card.num}</div>
                                    <div className="proof-icon">{card.icon}</div>
                                    <h3 className="proof-title" style={{ color: card.accentColor }}>{card.title}</h3>
                                    <p className="proof-desc">{card.desc}</p>
                                </div>

                                {/* Medya */}
                                <div className="proof-media">
                                    {card.videoSrc ? (
                                        <VideoPlayer src={card.videoSrc} label={t('proof.clickToPlay')} />
                                    ) : card.hasRealImages ? (
                                        <DiscordBeforeAfter card={card} t={t} />
                                    ) : (
                                        <VideoPlaceholder card={card} t={t} />
                                    )}
                                </div>

                                {/* Eksik video ipucu */}
                                {!card.videoSrc && (
                                    <div className="proof-upload-hint">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="17 8 12 3 7 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                        <code>public/videos/{card.id}-demo.mp4</code>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
};

export default ShowcaseSection;
