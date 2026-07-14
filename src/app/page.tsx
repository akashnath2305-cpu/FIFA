"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlay, FaChevronRight, FaSearch, FaGlobeAmericas, FaFutbol, FaTimes, FaMap, FaVideo, FaChartBar, FaShieldAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";
import dynamic from "next/dynamic";

const StadiumModal = dynamic(() => import("@/components/Modals/StadiumModal"), { ssr: false });
const MatchCenterModal = dynamic(() => import("@/components/Modals/MatchCenterModal"), { ssr: false });

export default function Home() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 365, hrs: 23, mins: 45, secs: 12 });
  const [isStadiumModalOpen, setIsStadiumModalOpen] = useState(false);
  const [isMatchCenterModalOpen, setIsMatchCenterModalOpen] = useState(false);

  // Simple countdown ticker simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hrs, mins, secs } = prev;
        if (secs > 0) secs--;
        else {
          secs = 59;
          if (mins > 0) mins--;
          else {
            mins = 59;
            if (hrs > 0) hrs--;
            else { hrs = 23; days--; }
          }
        }
        return { days, hrs, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>

      {/* Top Navigation Bar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '40px', position: 'relative' , flexShrink: 0 }}>
        {/* Left Side: Brand Logo (Fixed to align with Sidebar) */}
        <div style={{
          position: 'fixed',
          top: '30px',
          left: '30px', /* Visually centers it over the 72px wide sidebar (20px left + 36px center) */
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 100
        }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px rgba(255, 223, 0, 0.5)', position: 'relative' }}>
            <Image src="/logo-flame.avif" alt="Flame Logo" fill sizes="100vw" style={{ objectFit: 'cover', transform: 'scale(1.5)' }} priority />
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
            <Link href="/login" style={{ textDecoration: 'none' }}>
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

      {/* Main Hero Content */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', flexWrap: 'wrap', gap: '30px' }}>

        {/* Left Side: Giant Typography */}
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
            onClick={() => setIsStadiumModalOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(212, 175, 55, 0.8)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '280px', /* Exact same width as the photo above */
              padding: '15px 0',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '40px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              background: 'linear-gradient(135deg, #FFDF00, #D4AF37, #8C6A1C)',
              color: '#000',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center', /* Centers the text and icon perfectly */
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 15px rgba(212, 175, 55, 0.4)',
              fontFamily: 'Oswald, sans-serif',
              letterSpacing: '1px'
            }}>
            {t("ENTER THE STADIUM")} <FaFutbol size={16} />
          </motion.button>
        </div>

        {/* Right Side: Live Scorecard */}
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
          <div className="glass-panel" style={{ padding: '25px', width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '25px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 15px 40px rgba(0,0,0,0.5)' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
              <span>{t("LIVE MATCH")}</span>
              <span style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }} /> 65'</span>
            </h3>

            {/* Live Match Grid */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <img src="https://flagcdn.com/w80/us.png" alt="USA Flag" style={{ width: '45px', height: '30px', objectFit: 'cover', borderRadius: '4px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
                <span style={{ fontFamily: 'Oswald', fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>USA</span>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <span style={{ fontSize: 'clamp(1.2rem, 4.5vw, 2rem)', fontFamily: 'Oswald', fontWeight: 700, color: 'white', textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>2</span>
                <span style={{ fontSize: '1.5rem', fontFamily: 'Oswald', color: 'var(--text-muted)' }}>-</span>
                <span style={{ fontSize: 'clamp(1.2rem, 4.5vw, 2rem)', fontFamily: 'Oswald', fontWeight: 700, color: 'white', textShadow: '0 0 15px rgba(255,255,255,0.3)' }}>1</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <img src="https://flagcdn.com/w80/mx.png" alt="Mexico Flag" style={{ width: '45px', height: '30px', objectFit: 'cover', borderRadius: '4px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
                <span style={{ fontFamily: 'Oswald', fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>MEX</span>
              </div>
            </div>

            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '2px', marginTop: '10px', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              {t("UPCOMING")}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src="https://flagcdn.com/w40/ca.png" alt="Canada" style={{ width: '24px', borderRadius: '2px' }} /> 
                  <span style={{ fontFamily: 'Oswald', color: 'white', fontSize: '1.1rem' }}>CAN</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0 5px' }}>vs</span>
                  <span style={{ fontFamily: 'Oswald', color: 'white', fontSize: '1.1rem' }}>ARG</span> 
                  <img src="https://flagcdn.com/w40/ar.png" alt="Argentina" style={{ width: '24px', borderRadius: '2px' }} />
                </div>
                <span style={{ color: 'var(--fifa-gold)', fontSize: '0.8rem', fontWeight: 'bold' }}>20:00</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src="https://flagcdn.com/w40/br.png" alt="Brazil" style={{ width: '24px', borderRadius: '2px' }} /> 
                  <span style={{ fontFamily: 'Oswald', color: 'white', fontSize: '1.1rem' }}>BRA</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0 5px' }}>vs</span>
                  <span style={{ fontFamily: 'Oswald', color: 'white', fontSize: '1.1rem' }}>ENG</span> 
                  <img src="https://flagcdn.com/w40/gb-eng.png" alt="England" style={{ width: '24px', borderRadius: '2px' }} />
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t("Tomorrow")}</span>
              </div>
            </div>

            <button 
              onClick={() => setIsMatchCenterModalOpen(true)}
              style={{
              background: 'transparent', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '15px', color: 'var(--fifa-gold)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
              fontFamily: 'Oswald', fontSize: '0.9rem', letterSpacing: '1px', padding: '12px', marginTop: '5px', cursor: 'pointer', transition: 'all 0.3s'
            }}>
              {t("MATCH CENTER")} <FaChevronRight size={10} />
            </button>
          </div>
        </div>

      </div>

      {/* Netflix TV Style Bottom Rows (Cards) */}
      <div style={{ marginTop: '20px', zIndex: 10 }}>
        <div className="horizontal-scroll" style={{ display: 'flex', gap: '15px', width: '100%', overflowX: 'hidden' }}>

          <Link href="/ticket" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
            <motion.div whileHover={{ scale: 1.05 }} className="glass-panel" style={{ width: '100%', height: '75px', display: 'flex', alignItems: 'center', padding: '10px 12px', gap: '10px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)' }}>🎫</div>
              <div style={{ overflow: 'hidden' }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{t("LIVING TICKET")}</h3>
                <p style={{ color: 'var(--fifa-gold)', fontSize: '0.7rem', margin: '2px 0 0 0' }}>{t("AI Concierge")} <FaChevronRight size={8} /></p>
              </div>
            </motion.div>
          </Link>

          <Link href="/navigator" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
            <motion.div whileHover={{ scale: 1.05 }} className="glass-panel" style={{ width: '100%', height: '75px', display: 'flex', alignItems: 'center', padding: '10px 12px', gap: '10px', overflow: 'hidden' }}>
              <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)' }}>🏟️</div>
              <div style={{ overflow: 'hidden' }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{t("AR NAVIGATOR")}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '2px 0 0 0' }}>{t("Find your seat")} <FaChevronRight size={8} /></p>
              </div>
            </motion.div>
          </Link>

          <Link href="/nexus" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
            <motion.div whileHover={{ scale: 1.05 }} className="glass-panel" style={{ width: '100%', height: '75px', display: 'flex', alignItems: 'center', padding: '10px 12px', gap: '10px', overflow: 'hidden' }}>
              <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)' }}>🌍</div>
              <div style={{ overflow: 'hidden' }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{t("GLOBAL NEXUS")}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '2px 0 0 0' }}>{t("Live Chat")} <FaChevronRight size={8} /></p>
              </div>
            </motion.div>
          </Link>

          <Link href="/vibemap" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
            <motion.div whileHover={{ scale: 1.05 }} className="glass-panel" style={{ width: '100%', height: '75px', display: 'flex', alignItems: 'center', padding: '10px 12px', gap: '10px', overflow: 'hidden' }}>
              <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)' }}>🔥</div>
              <div style={{ overflow: 'hidden' }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{t("VIBE MAP")}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '2px 0 0 0' }}>{t("City Sentiment")} <FaChevronRight size={8} /></p>
              </div>
            </motion.div>
          </Link>

          <Link href="/fancards" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
            <motion.div whileHover={{ scale: 1.05 }} className="glass-panel" style={{ width: '100%', height: '75px', display: 'flex', alignItems: 'center', padding: '10px 12px', gap: '10px', overflow: 'hidden' }}>
              <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)' }}>🃏</div>
              <div style={{ overflow: 'hidden' }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{t("FAN CARDS")}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '2px 0 0 0' }}>{t("Trivia & Polls")} <FaChevronRight size={8} /></p>
              </div>
            </motion.div>
          </Link>

        </div>
      </div>

      <AnimatePresence>
        {isStadiumModalOpen && <StadiumModal isOpen={isStadiumModalOpen} onClose={() => setIsStadiumModalOpen(false)} />}
      </AnimatePresence>

      {/* MATCH CENTER MODAL */}
      <AnimatePresence>
        {isMatchCenterModalOpen && <MatchCenterModal isOpen={isMatchCenterModalOpen} onClose={() => setIsMatchCenterModalOpen(false)} />}
      </AnimatePresence>

    </main>
  );
}
