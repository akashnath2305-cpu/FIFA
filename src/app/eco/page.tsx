"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";
import { FaLeaf, FaCamera, FaTrophy, FaRecycle, FaMap, FaExclamationTriangle, FaChartLine, FaStore } from "react-icons/fa";
import Image from "next/image";

export default function MottainaiHub() {
  const { role } = useAuth();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleScan = () => {
    setScanState('scanning');
    setTimeout(() => setScanState('success'), 2000);
    setTimeout(() => setScanState('idle'), 5000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', padding: '20px', overflowY: 'auto' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' , flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(1.2rem, 4.5vw, 2rem)', color: '#10b981', textShadow: '0 0 15px rgba(16, 185, 129, 0.4)', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaLeaf /> {t("MOTTAINAI HUB")}
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0', letterSpacing: '1px' }}>
            {role === "FAN" ? "Scan trash, earn points, save the planet." : "Predictive Waste & Sustainability Command"}
          </p>
        </div>
        {role === "FAN" && (
          <div className="glass-panel" style={{ padding: '10px 20px', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>450</span>
            <span style={{ color: 'white', fontSize: '0.8rem', textTransform: 'uppercase' }}>{t("Eco Points")}</span>
          </div>
        )}
      </header>

      {/* FAN VIEW */}
      {role === "FAN" && (
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* Left Column: Scanner */}
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '30px', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
              <h2 style={{ color: 'white', margin: '0 0 20px 0', fontFamily: 'Oswald', letterSpacing: '1px' }}><FaCamera color="#10b981" /> {t("AI TRASH SCANNER")}</h2>
              
              <div style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.5)', borderRadius: '15px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', border: '2px dashed rgba(255,255,255,0.2)' }}>
                {scanState === 'idle' && (
                  <button onClick={handleScan} className="gold-btn" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaCamera /> {t("TAP TO SCAN")}
                  </button>
                )}
                
                {scanState === 'scanning' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '60px', height: '60px', border: '4px solid transparent', borderTopColor: '#10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <span style={{ color: '#10b981', fontWeight: 'bold', letterSpacing: '2px' }}>ANALYZING...</span>
                  </div>
                )}

                <AnimatePresence>
                  {scanState === 'success' && (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: 'rgba(16,185,129,0.2)', padding: '20px', borderRadius: '15px', backdropFilter: 'blur(5px)' }}>
                      <FaRecycle size={50} color="#10b981" />
                      <h3 style={{ color: 'white', margin: 0 }}>PET PLASTIC BOTTLE</h3>
                      <p style={{ color: '#10b981', fontWeight: 'bold', margin: 0 }}>Dispose in BLUE bin. +50 Points!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.2)' }}>
               <h3 style={{ color: 'var(--fifa-gold)', margin: '0 0 15px 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <FaTrophy /> {t("TRASH TO TREASURE MOSAIC")}
               </h3>
               <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '15px' }}>Your recycling efforts are building the World Cup Trophy. 85% complete!</p>
               <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                 <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #10b981, var(--fifa-gold))' }} />
               </div>
            </div>
          </div>

          {/* Right Column: Leaderboards */}
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel" style={{ flex: 1, padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h2 style={{ color: 'white', margin: '0 0 20px 0', fontFamily: 'Oswald', letterSpacing: '1px' }}>🌍 {t("CLEANEST FANBASE LEADERBOARD")}</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: 'rgba(16,185,129,0.2)', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>1</span>
                    <img src="https://flagcdn.com/w40/jp.png" alt="Japan" style={{ borderRadius: '2px' }} />
                    <span style={{ color: 'white', fontWeight: 'bold' }}>JAPAN FANS</span>
                  </div>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>14,500 pts</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>2</span>
                    <img src="https://flagcdn.com/w40/mx.png" alt="Mexico" style={{ borderRadius: '2px' }} />
                    <span style={{ color: 'white', fontWeight: 'bold' }}>MEXICO FANS</span>
                  </div>
                  <span style={{ color: 'var(--fifa-gold)', fontWeight: 'bold' }}>12,200 pts</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>3</span>
                    <img src="https://flagcdn.com/w40/us.png" alt="USA" style={{ borderRadius: '2px' }} />
                    <span style={{ color: 'white', fontWeight: 'bold' }}>USA FANS</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>11,850 pts</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ORGANIZER / STAFF VIEW */}
      {(role === "ORGANIZER" || role === "STAFF") && (
        <div style={{ display: 'flex', gap: '30px', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {/* Predictive Heatmap */}
            <div className="glass-panel" style={{ flex: 2, minWidth: '300px', padding: '25px', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ color: 'white', margin: '0 0 20px 0', fontFamily: 'Oswald', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaMap color="#10b981" /> {t("PREDICTIVE WASTE HEATMAP")}
              </h2>
              <div style={{ flex: 1, minHeight: '350px', background: 'rgba(0,0,0,0.5)', borderRadius: '15px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                {/* Simulated Stadium Map Background */}
                <Image src="/bg.png" alt="Stadium Layout" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.3 }} priority />
                
                {/* Hotspots */}
                <div style={{ position: 'absolute', top: '30%', left: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(239,68,68,0.5)', borderRadius: '50%', boxShadow: '0 0 20px #ef4444', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ background: 'rgba(0,0,0,0.8)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', color: 'white', marginTop: '5px' }}>Section 104 (95% Full)</span>
                </div>
                
                <div style={{ position: 'absolute', top: '60%', left: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '30px', height: '30px', background: 'rgba(245,158,11,0.5)', borderRadius: '50%', boxShadow: '0 0 15px #f59e0b' }} />
                  <span style={{ background: 'rgba(0,0,0,0.8)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', color: 'white', marginTop: '5px' }}>North Gate (75% Full)</span>
                </div>

                <div style={{ position: 'absolute', top: '20%', left: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '20px', height: '20px', background: 'rgba(16,185,129,0.5)', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }} />
                  <span style={{ background: 'rgba(0,0,0,0.8)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', color: 'white', marginTop: '5px' }}>VIP Lounge (10% Full)</span>
                </div>
              </div>
            </div>

            {/* Vendor Score & Alerts */}
            <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="glass-panel" style={{ flex: 1, padding: '25px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ color: 'var(--fifa-gold)', margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}><FaExclamationTriangle /> {t("ACTIVE HAZARDS")}</h3>
                <div style={{ background: 'rgba(239,68,68,0.1)', borderLeft: '4px solid #ef4444', padding: '15px', borderRadius: '5px' }}>
                  <h4 style={{ color: 'white', margin: '0 0 5px 0' }}>Broken Glass - Section 104</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Reported by Fan. AI suggests dispatching sweeping crew immediately.</p>
                  <button className="gold-btn" style={{ padding: '5px 15px', fontSize: '0.7rem', marginTop: '10px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444' }}>DISPATCH STAFF</button>
                </div>
              </div>

              <div className="glass-panel" style={{ flex: 1, padding: '25px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ color: 'white', margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}><FaStore color="#10b981" /> {t("VENDOR ECO-SCORE")}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>Tacos El Gordo (Gate B)</span>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>A+ (98%)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>Mega Burger (Sec 205)</span>
                    <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>B (76%)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>Plastics & Co (North)</span>
                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>D (42%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}

    </div>
  );
}
