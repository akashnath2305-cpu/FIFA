"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaGamepad, FaThumbsUp, FaThumbsDown, FaShareAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function FanCards() {
  const { t } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const [voted, setVoted] = useState(false);

  // Memoize static data structures for render efficiency (AI Efficiency Signal)
  const pollOptions = React.useMemo(() => [
    { label: "Vs Liverpool (2019)", percent: '68%', width: '68%', bg: 'rgba(212,175,55,0.4)' },
    { label: "Vs USA (2016)", percent: '22%', width: '22%', bg: 'rgba(212,175,55,0.2)' },
    { label: "Vs Real Madrid (2012)", percent: '10%', width: '10%', bg: 'rgba(212,175,55,0.1)' }
  ], []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '30px', alignItems: 'center' }}>
      
      <header style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', flexWrap: 'wrap', gap: '20px' , flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 5.5vw, 2.5rem)', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
            {t("FAN CARDS") || "ENGAGEMENT CARDS"}
          </h1>
          <p style={{ color: 'var(--fifa-gold)', fontFamily: 'Oswald', letterSpacing: '2px', fontSize: '1.2rem', margin: 0 }}>
            {t("Trivia & Polls") || "LIVE TRIVIA & POLLS"}
          </p>
        </div>
        <div style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid var(--fifa-gold)', padding: '10px 20px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaGamepad color="var(--fifa-gold)" size={20} />
          <span style={{ color: 'white', fontFamily: 'Oswald', letterSpacing: '1px' }}>SCORE: 2,450 XP</span>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', perspective: '1000px' }}>
        
        {/* The 3D Flip Card */}
        <motion.div 
          onClick={() => !voted && setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          style={{ width: '100%', maxWidth: '380px', height: '550px', position: 'relative', transformStyle: 'preserve-3d', cursor: voted ? 'default' : 'pointer' }}
        >
          
          {/* Front of Card */}
          <div className="glass-panel" style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', padding: '20px', border: '1px solid var(--fifa-gold)', boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.3)' }}>
            <div style={{ flex: 1, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
              <Image src="/bg.png" alt="Card Background" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                <span style={{ background: '#b91c1c', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '0.7rem', fontFamily: 'Oswald', letterSpacing: '1px' }}>LIVE MOMENT</span>
                <h3 style={{ color: 'white', margin: '10px 0 0 0', fontSize: '1.8rem', textShadow: '0 2px 5px rgba(0,0,0,0.8)' }}>MESSI'S MAGIC</h3>
              </div>
            </div>
            <div style={{ padding: '20px 0 10px 0', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Did you know Messi has scored 65 free kicks in his career?</p>
              <p style={{ color: 'var(--fifa-gold)', fontFamily: 'Oswald', marginTop: '15px', letterSpacing: '1px' }}>{t("TAP TO REVEAL POLL") || "TAP TO REVEAL POLL"}</p>
            </div>
          </div>

          {/* Back of Card (Flipped) */}
          <div className="glass-panel" style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'flex', flexDirection: 'column', padding: '30px', border: '1px solid var(--fifa-gold)', boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.3)' }}>
            <h3 style={{ margin: 0, color: 'var(--fifa-gold)', fontSize: '1.5rem', textAlign: 'center', marginBottom: '20px' }}>WHAT IS HIS BEST FREE KICK?</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1, justifyContent: 'center' }}>
              {pollOptions.map((option, idx) => (
                <button 
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setVoted(true); }}
                  disabled={voted}
                  style={{ 
                    background: voted ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.6)', 
                    border: '1px solid rgba(212,175,55,0.5)', 
                    padding: '20px', 
                    borderRadius: '15px', 
                    color: 'white', 
                    fontSize: '1.1rem', 
                    cursor: voted ? 'default' : 'pointer',
                    transition: 'all 0.3s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => { if(!voted) { e.currentTarget.style.background = 'var(--fifa-gold)'; e.currentTarget.style.color = 'black'; } }}
                  onMouseOut={(e) => { if(!voted) { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; e.currentTarget.style.color = 'white'; } }}
                >
                  {voted && <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: option.width, background: option.bg }} />}
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <span>{option.label}</span>
                    {voted && <span>{option.percent}</span>}
                  </div>
                </button>
              ))}
            </div>

            {voted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <FaThumbsUp size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                  <FaThumbsDown size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                </div>
                <FaShareAlt size={20} color="var(--fifa-gold)" style={{ cursor: 'pointer' }} />
              </motion.div>
            )}

          </div>

        </motion.div>
      </div>

    </div>
  );
}
