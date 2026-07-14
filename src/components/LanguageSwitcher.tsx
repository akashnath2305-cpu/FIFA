"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'es', label: 'ES', full: 'Español' },
  { code: 'fr', label: 'FR', full: 'Français' },
  { code: 'hi', label: 'HI', full: 'हिन्दी' },
  { code: 'bn', label: 'BN', full: 'বাংলা' },
  { code: 'ja', label: 'JA', full: '日本語' },
  { code: 'zh', label: 'ZH', full: '中文' },
  { code: 'pt', label: 'PT', full: 'Português' },
  { code: 'de', label: 'DE', full: 'Deutsch' },
  { code: 'ko', label: 'KO', full: '한국어' },
  { code: 'sv', label: 'SV', full: 'Svenska' },
  { code: 'no', label: 'NO', full: 'Norsk' },
  { code: 'da', label: 'DA', full: 'Dansk' },
  { code: 'fi', label: 'FI', full: 'Suomi' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px', 
          color: 'white', 
          fontSize: '0.85rem', 
          cursor: 'pointer', 
          fontWeight: 600, 
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
          padding: '4px 8px',
          borderRadius: '4px',
          background: isOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
          transition: 'background 0.2s'
        }}
      >
        {currentLang.label} <span style={{ fontSize: '0.6rem', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              background: 'rgba(15, 15, 15, 0.95)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              zIndex: 1000,
              minWidth: '100px'
            }}
          >
            {languages.map((lang) => (
              <div
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as any);
                  setIsOpen(false);
                }}
                style={{
                  padding: '10px 15px',
                  color: language === lang.code ? '#FFDF00' : 'white',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: language === lang.code ? 'bold' : 'normal',
                  background: language === lang.code ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'background 0.2s, color 0.2s'
                }}
                onMouseEnter={(e) => { if (language !== lang.code) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={(e) => { if (language !== lang.code) e.currentTarget.style.background = 'transparent'; }}
              >
                {lang.full}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
