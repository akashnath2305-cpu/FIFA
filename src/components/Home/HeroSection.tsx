"use client";

import Image from "next/image";
import { FaFutbol } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

interface HeroSectionProps {
  onEnterStadium: () => void;
}

export default function HeroSection({ onEnterStadium }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', zIndex: 10 }}>
      <p style={{
        fontFamily: 'Oswald',
        letterSpacing: '4px',
        fontSize: '1rem',
        fontWeight: 600,
        background: 'linear-gradient(90deg, #FFDF00, #D4AF37)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '15px',
        textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'
      }}>
        {t("BEYOND BORDERS. BEYOND LIMITS.")}
      </p>
      <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 0 30px 0', borderRadius: '35px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.2)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <Image src="/logo_26.jpg" alt="FIFA 26 Logo" fill sizes="100vw" style={{ objectFit: 'cover', transform: 'scale(1.15)' }} priority />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
          <h2 style={{ fontSize: 'clamp(1.2rem, 4.5vw, 2rem)', margin: 0, textShadow: '0 5px 25px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.8)', textAlign: 'center', lineHeight: '1', color: 'white', fontWeight: 800, letterSpacing: '1px' }}>
            {t("FIFA WORLD CUP")}
          </h2>
          <span style={{ fontSize: 'clamp(1.6rem, 6vw, 2.8rem)', background: 'linear-gradient(135deg, #FFDF00 20%, #FDF5A9 50%, #8C6A1C 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', marginTop: '5px', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,1)) drop-shadow(0 2px 5px rgba(0,0,0,1)) drop-shadow(0 0 30px rgba(255, 223, 0, 0.8))', fontWeight: 900 }}>
            2026
          </span>
        </div>
      </div>

      <motion.button
        onClick={onEnterStadium}
        aria-label={t("Enter the Virtual Stadium Experience")}
        whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(212, 175, 55, 0.8)' }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '280px',
          padding: '15px 0',
          fontSize: '1rem',
          fontWeight: 'bold',
          borderRadius: '40px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          background: 'linear-gradient(135deg, #FFDF00, #D4AF37, #8C6A1C)',
          color: '#000',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 15px rgba(212, 175, 55, 0.4)',
          fontFamily: 'Oswald, sans-serif',
          letterSpacing: '1px'
        }}>
        {t("ENTER THE STADIUM")} <FaFutbol size={16} aria-hidden="true" />
      </motion.button>
    </div>
  );
}
