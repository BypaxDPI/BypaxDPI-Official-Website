import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const CheckIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const WarningIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

const Comparison = () => {
    const { t } = useLanguage();

    const features = [
        {
            key: 'speed',
            bypaxdpi: { status: 'check', text: t('compare.speed.bypaxdpi') },
            vpn: { status: 'x', text: t('compare.speed.vpn') },
            dpi: { status: 'check', text: t('compare.speed.dpi') },
        },
        {
            key: 'ping',
            bypaxdpi: { status: 'check', text: t('compare.ping.bypaxdpi') },
            vpn: { status: 'x', text: t('compare.ping.vpn') },
            dpi: { status: 'warn', text: t('compare.ping.dpi') },
        },
        {
            key: 'gaming',
            bypaxdpi: { status: 'check', text: t('compare.gaming.bypaxdpi') },
            vpn: { status: 'x', text: t('compare.gaming.vpn') },
            dpi: { status: 'warn', text: t('compare.gaming.dpi') },
        },
        {
            key: 'lan',
            bypaxdpi: { status: 'check', text: t('compare.lan.bypaxdpi') },
            vpn: { status: 'x', text: t('compare.lan.vpn') },
            dpi: { status: 'x', text: t('compare.lan.dpi') },
        },
        {
            key: 'install',
            bypaxdpi: { status: 'check', text: t('compare.install.bypaxdpi') },
            vpn: { status: 'check', text: t('compare.install.vpn') },
            dpi: { status: 'warn', text: t('compare.install.dpi') },
        },
        {
            key: 'resource',
            bypaxdpi: { status: 'check', text: t('compare.resource.bypaxdpi') },
            vpn: { status: 'x', text: t('compare.resource.vpn') },
            dpi: { status: 'check', text: t('compare.resource.dpi') },
        },
        {
            key: 'price',
            bypaxdpi: { status: 'check', text: t('compare.price.bypaxdpi') },
            vpn: { status: 'x', text: t('compare.price.vpn') },
            dpi: { status: 'check', text: t('compare.price.dpi') },
        },
    ];

    const StatusIcon = ({ status }) => {
        if (status === 'check') return <CheckIcon />;
        if (status === 'x') return <XIcon />;
        return <WarningIcon />;
    };

    return (
        <section className="comparison-section" id="comparison">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-badge">{t('compare.badge')}</span>
                    <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('compare.title') }} />
                    <p className="section-description">{t('compare.description')}</p>
                </motion.div>

                <motion.div
                    className="comparison-table-wrapper"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {/* Table Header */}
                    <div className="comparison-header">
                        <div className="comp-col comp-feature-col">
                            <span className="comp-header-label">{t('compare.feature')}</span>
                        </div>
                        <div className="comp-col comp-bypaxdpi-col">
                            <div className="comp-product-badge comp-bypaxdpi-badge">
                                <span className="comp-product-icon">⚡</span>
                                <span>BypaxDPI</span>
                            </div>
                        </div>
                        <div className="comp-col">
                            <div className="comp-product-badge comp-vpn-badge">
                                <span className="comp-product-icon">🔒</span>
                                <span>{t('compare.col.vpn')}</span>
                            </div>
                        </div>
                        <div className="comp-col">
                            <div className="comp-product-badge comp-dpi-badge">
                                <span className="comp-product-icon">🛠️</span>
                                <span>{t('compare.col.dpi')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Table Rows */}
                    {features.map((feat, i) => (
                        <motion.div
                            className="comparison-row"
                            key={feat.key}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: 0.05 * i }}
                        >
                            <div className="comp-col comp-feature-col">
                                <span className="comp-feature-name">{t(`compare.${feat.key}.label`)}</span>
                            </div>
                            <div className="comp-col comp-bypaxdpi-col">
                                <div className={`comp-cell comp-cell-${feat.bypaxdpi.status}`}>
                                    <StatusIcon status={feat.bypaxdpi.status} />
                                    <span>{feat.bypaxdpi.text}</span>
                                </div>
                            </div>
                            <div className="comp-col">
                                <div className={`comp-cell comp-cell-${feat.vpn.status}`}>
                                    <StatusIcon status={feat.vpn.status} />
                                    <span>{feat.vpn.text}</span>
                                </div>
                            </div>
                            <div className="comp-col">
                                <div className={`comp-cell comp-cell-${feat.dpi.status}`}>
                                    <StatusIcon status={feat.dpi.status} />
                                    <span>{feat.dpi.text}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Note */}
                <motion.div
                    className="comparison-note"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span>{t('compare.note')}</span>
                </motion.div>
            </div>
        </section>
    );
};

export default Comparison;
