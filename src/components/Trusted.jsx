import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { motion } from 'framer-motion';

const Trusted = () => {
  const { t } = useLanguage();
  useScrollAnimation();

  const logos = [
    { text: `🎮 ${t('trusted.item.gamers')}`, color: "#3ba4ff" },
    { text: `💻 ${t('trusted.item.developers')}`, color: "#4ade80" },
    { text: `🎨 ${t('trusted.item.designers')}`, color: "#f472b6" },
    { text: `📚 ${t('trusted.item.students')}`, color: "#facc15" },
    { text: `🏢 ${t('trusted.item.professionals')}`, color: "#60a5fa" },
    { text: `🎵 ${t('trusted.item.musicians')}`, color: "#c084fc" },
  ];

  // duplicate array for seamless loop
  const marqueeItems = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="trusted-section">
        <div className="container">
            <p className="trusted-text animate-on-scroll">{t('trusted.text')}</p>
            
            <div className="trusted-logos-wrapper">
                <div className="trusted-gradient-left"></div>
                <div className="trusted-gradient-right"></div>
                
                <motion.div 
                    className="trusted-marquee"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {marqueeItems.map((item, index) => (
                        <span 
                            key={index} 
                            className="tech-logo"
                            style={{ 
                                display: "inline-flex", 
                                alignItems: "center", 
                                gap: "8px",
                                margin: "0 30px", 
                                fontSize: "1.2rem", 
                                fontWeight: "600",
                                color: "rgba(255, 255, 255, 0.8)",
                                whiteSpace: "nowrap"
                            }}
                        >
                           {item.text}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    </section>
  );
};

export default Trusted;
