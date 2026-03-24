import React, { createContext, useState, useEffect, useContext } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [currentLang, setCurrentLang] = useState('en');
    const [version, setVersion] = useState('v1.0.0');
    const [os, setOS] = useState('Windows');

    // Detect language on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('bypaxdpi-lang');
        if (savedLang && translations[savedLang]) {
            setCurrentLang(savedLang);
        } else {
            const browserLang = navigator.language || navigator.userLanguage;
            const langCode = browserLang.split('-')[0].toLowerCase();
            setCurrentLang(translations[langCode] ? langCode : 'en');
        }

        // Detect OS
        const platform = navigator.platform.toLowerCase();
        const userAgent = navigator.userAgent.toLowerCase();
        if (platform.includes('mac') || userAgent.includes('macintosh')) {
            setOS('macOS');
        } else {
            setOS('Windows');
        }
    }, []);

    // Update document lang attribute
    useEffect(() => {
        document.documentElement.lang = currentLang;
        document.title = t('meta.title');
    }, [currentLang]);

    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'tr' : 'en';
        setCurrentLang(newLang);
        localStorage.setItem('bypaxdpi-lang', newLang);
        
        // Add subtle animation to body (replicating script.js behavior)
        document.body.style.opacity = '0.9';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
    };

    const t = (key, vars) => {
        let translation = translations[currentLang]?.[key] || translations['en']?.[key] || key;
        
        // Handle placeholders
        if (typeof translation === 'string') {
            if (translation.includes('{version}')) {
                translation = translation.replace('{version}', version);
            }
            if (translation.includes('{os}')) {
                translation = translation.replace('{os}', os);
            }
            if (vars && typeof vars === 'object') {
                Object.keys(vars).forEach((k) => {
                    translation = translation.replace(new RegExp(`\\{${k}\\}`, 'g'), vars[k] ?? '');
                });
            }
        }
        
        return translation;
    };

    return (
        <LanguageContext.Provider value={{ 
            currentLang, 
            toggleLanguage, 
            t, 
            setVersion, 
            version, 
            os, 
            setOS 
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
