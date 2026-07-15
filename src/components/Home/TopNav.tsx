"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";

export default function TopNav() {
  const { t } = useLanguage();

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '40px', position: 'relative', flexShrink: 0 }}>
      {/* Left Side: Brand Logo (Fixed to align with Sidebar) */}
      <div 
        aria-label="FIFA Fever Home Logo"
        style={{
        position: 'fixed',
        top: '30px',
        left: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 100
      }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px rgba(255, 223, 0, 0.5)', position: 'relative' }}>
          <Image src="/logo-flame.avif" alt="FIFA Fever Flame Logo" fill sizes="100vw" style={{ objectFit: 'cover', transform: 'scale(1.5)' }} priority />
        </div>
        <div>
          <h1 style={{
            margin: 0,
            fontFamily: 'Oswald, sans-serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3.5vw, 1.5rem)',
            fontWeight: 900,
            letterSpacing: '4px',
            color: '#FFDF00',
            textShadow: '0 0 10px rgba(255, 223, 0, 0.8), 0 0 20px rgba(255, 223, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.4)',
            textTransform: 'uppercase'
          }}>
            FIFA FEVER
          </h1>
        </div>
      </div>

      {/* Right Side: Tools */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <LanguageSwitcher />

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/login" style={{ textDecoration: 'none' }} aria-label={t("Go to Login Portal")}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '6px 18px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                border: 'none',
                background: 'linear-gradient(135deg, #FFDF00, #D4AF37)',
                color: '#000',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
                fontFamily: 'Oswald, sans-serif',
                letterSpacing: '1px'
              }}>
              {t("PORTAL")}
            </motion.button>
          </Link>
        </div>
      </div>
    </header>
  );
}
