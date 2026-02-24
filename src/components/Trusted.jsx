import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { motion } from 'framer-motion';
import { FaGamepad, FaCode, FaPalette, FaUserGraduate, FaBriefcase, FaMusic } from 'react-icons/fa';

const Trusted = () => {
  const { t } = useLanguage();
  useScrollAnimation();

  const logos = [
    { icon: <FaGamepad size={22} color="#3ba4ff" />, text: t('trusted.item.gamers') },
    { icon: <FaCode size={22} color="#4ade80" />, text: t('trusted.item.developers') },
    { icon: <FaPalette size={22} color="#f472b6" />, text: t('trusted.item.designers') },
    { icon: <FaUserGraduate size={22} color="#facc15" />, text: t('trusted.item.students') },
    { icon: <FaBriefcase size={22} color="#60a5fa" />, text: t('trusted.item.professionals') },
    { icon: <FaMusic size={22} color="#c084fc" />, text: t('trusted.item.musicians') },
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
                                gap: "12px",
                                margin: "0 30px", 
                                fontSize: "1.2rem", 
                                fontWeight: "600",
                                color: "var(--text-primary)",
                                whiteSpace: "nowrap"
                            }}
                        >
                           {item.icon}
                           <span>{item.text}</span>
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    </section>
  );
};

export default Trusted;
