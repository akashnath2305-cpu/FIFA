"use client";

import { useState } from "react";
import Image from "next/image";
import { FaFire, FaMapMarkerAlt, FaUsers, FaMusic, FaChild, FaDrum, FaVideo, FaCameraRetro, FaShareAlt, FaPlay, FaPaperPlane, FaMagic, FaCut, FaHeart, FaCommentAlt, FaImage } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function VibeMap() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("watch-party"); // 'watch-party', 'moment-studio', 'city-map'
  const [selectedZone, setSelectedZone] = useState<any>(null);
  
  // Chat state for Watch Party
  const [chatMessage, setChatMessage] = useState("");
  const [chats, setChats] = useState([
    { user: "Alex99", text: "What a run by Pulisic!", color: "#3b82f6" },
    { user: "FutbolFan", text: "Defense needs to wake up.", color: "#ef4444" },
    { user: "SarahJ", text: "GOOOAAAALLLLL!!", color: "var(--fifa-gold)" },
  ]);

  const handleSendChat = () => {
    if (chatMessage.trim()) {
      setChats([...chats, { user: "You", text: chatMessage, color: "#10b981" }]);
      setChatMessage("");
    }
  };

  const fanZones = [
    { id: 1, name: "Centennial Park", vibe: "Family Friendly", icon: <FaChild size={20} />, color: "#3b82f6", activity: "High", desc: "A relaxed atmosphere perfect for families. Lots of open space and food trucks." },
    { id: 2, name: "5th Street Pubs", vibe: "Loud Chanting", icon: <FaDrum size={20} />, color: "#ef4444", activity: "Very High", desc: "Incredible energy! Drums, chanting, and passionate fans. Very crowded." },
    { id: 3, name: "Plaza Square", vibe: "Live Music", icon: <FaMusic size={20} />, color: "#a855f7", activity: "Medium", desc: "Live local bands playing before the match. Great for a chill pre-game." },
    { id: 4, name: "Stadium North Gate", vibe: "Pre-Game Show", icon: <FaFire size={20} />, color: "var(--fifa-gold)", activity: "Extreme", desc: "The official FIFA Fan Festival is happening here. Fireworks and performances." }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
      
      {/* Header & Tabs */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.2rem, 4.5vw, 2rem)', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
            {t("DIGITAL FAN HUB")}
          </h1>
          <p style={{ color: 'var(--fifa-gold)', fontFamily: 'Oswald', letterSpacing: '2px', fontSize: '1rem', margin: 0 }}>
            {t("WATCH, CREATE, AND SHARE THE VIBE")}
          </p>
        </div>

        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab("watch-party")}
            style={{ background: activeTab === "watch-party" ? 'var(--fifa-gold)' : 'transparent', color: activeTab === "watch-party" ? 'black' : 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', fontFamily: 'Oswald', fontWeight: 600, letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s' }}
          >
            <FaVideo /> {t("WATCH PARTY")}
          </button>
          <button 
            onClick={() => setActiveTab("moment-studio")}
            style={{ background: activeTab === "moment-studio" ? 'var(--fifa-gold)' : 'transparent', color: activeTab === "moment-studio" ? 'black' : 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', fontFamily: 'Oswald', fontWeight: 600, letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s' }}
          >
            <FaCameraRetro /> {t("MOMENT STUDIO")}
          </button>
          <button 
            onClick={() => setActiveTab("city-map")}
            style={{ background: activeTab === "city-map" ? 'var(--fifa-gold)' : 'transparent', color: activeTab === "city-map" ? 'black' : 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', fontFamily: 'Oswald', fontWeight: 600, letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s' }}
          >
            <FaMapMarkerAlt /> {t("CITY MAP")}
          </button>
        </div>
      </header>

      {/* Main Content Area based on Tabs */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflowY: 'auto' }}>
        
        {/* WATCH PARTY TAB */}
        {activeTab === "watch-party" && (
          <div style={{ display: 'flex', width: '100%', gap: '20px', flexWrap: 'wrap' }}>
            {/* Video Player */}
            <div className="glass-panel" style={{ flex: 3, minWidth: '300px', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
              <div style={{ flex: 1, minHeight: '250px', background: 'black', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <Image src="/bg.png" alt="Stadium Background" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.8 }} priority />
                <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(185, 28, 28, 0.9)', padding: '5px 15px', borderRadius: '20px', color: 'white', fontFamily: 'Oswald', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '1px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white', animation: 'pulse 1s infinite' }} />
                  {t("LIVE")}
                </div>
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0, 0, 0, 0.6)', padding: '5px 15px', borderRadius: '20px', color: 'white', fontFamily: 'Oswald', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaUsers /> 14,293 {t("WATCHING")}
                </div>
                <FaPlay size={60} color="rgba(255,255,255,0.7)" style={{ position: 'absolute', cursor: 'pointer' }} />
              </div>
              <div style={{ padding: '15px 25px', background: 'rgba(15,15,15,0.9)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <h2 style={{ margin: 0, fontFamily: 'Oswald', fontSize: '1.5rem', color: 'white', letterSpacing: '1px' }}>USA vs MEX - GROUP STAGE</h2>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>MetLife Stadium, NY/NJ</p>
                </div>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '30px', fontFamily: 'Oswald', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)' }}><FaHeart /> {t("CHEER USA")}</button>
                  <button style={{ background: '#10b981', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '30px', fontFamily: 'Oswald', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}><FaFire /> {t("VIVA MEX")}</button>
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="glass-panel" style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', padding: '20px', gap: '15px' }}>
              <h2 style={{ margin: 0, color: 'var(--fifa-gold)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}><FaCommentAlt /> {t("FAN CHAT")}</h2>
              
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '10px' }}>
                {chats.map((c, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px' }}>
                    <span style={{ color: c.color, fontWeight: 'bold', fontSize: '0.85rem' }}>{c.user}</span>
                    <p style={{ margin: '3px 0 0 0', color: 'white', fontSize: '0.9rem' }}>{c.text}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <input 
                  id="chat-input"
                  name="chat-input"
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder={t("Say something...")} 
                  style={{ flex: 1, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px', borderRadius: '20px', color: 'white', outline: 'none' }} 
                />
                <button aria-label="Send Message" onClick={handleSendChat} style={{ background: 'var(--fifa-gold)', border: 'none', width: '45px', height: '45px', borderRadius: '50%', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MOMENT STUDIO TAB */}
        {activeTab === "moment-studio" && (
          <div style={{ display: 'flex', width: '100%', gap: '20px', flexWrap: 'wrap' }}>
            {/* Left: AI Generator Panel */}
            <div className="glass-panel" style={{ flex: 1, minWidth: '300px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ color: 'var(--fifa-gold)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem' }}><FaMagic /> {t("GEN-AI STUDIO")}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{t("Create epic customizable screenshots of FIFA moments or edit your own clips to share with the world.")}</p>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '1rem' }}>{t("1. Describe the Moment")}</h3>
                <textarea id="ai-prompt" name="ai-prompt" rows={3} placeholder={t("E.g., Pulisic celebrating a goal under stadium lights with confetti...")} style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', padding: '10px', color: 'white', resize: 'none', outline: 'none' }}></textarea>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '1rem' }}>{t("2. Select Visual Style")}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['Hyper-Realistic', 'Retro 90s', 'Comic Book', 'Cinematic', 'Neon Glow'].map(style => (
                    <span key={style} style={{ background: 'rgba(212,175,55,0.2)', color: 'var(--fifa-gold)', border: '1px solid var(--fifa-gold)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' }}>{t(style)}</span>
                  ))}
                </div>
              </div>

              <button className="gold-btn-solid" style={{ width: '100%', padding: '15px', borderRadius: '15px', display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '1.1rem', marginTop: 'auto' }}>
                <FaImage /> {t("GENERATE EPIC MOMENT")}
              </button>
            </div>

            {/* Right: Preview & Video Editor */}
            <div style={{ flex: 2, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="glass-panel" style={{ flex: 2, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <Image src="/logo_26.jpg" alt="FIFA 26 Background" fill sizes="100vw" style={{ objectFit: 'cover', filter: 'brightness(0.7)' }} priority />
                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', background: 'rgba(0,0,0,0.6)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
                   <FaMagic size={40} color="var(--fifa-gold)" />
                   <h3 style={{ color: 'white', letterSpacing: '2px', margin: 0 }}>{t("YOUR CREATION WILL APPEAR HERE")}</h3>
                   <p style={{ color: 'var(--text-muted)', margin: 0 }}>{t("Use the AI Studio to generate a screenshot.")}</p>
                </div>
                
                {/* Overlay Action Buttons */}
                <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', gap: '10px' }}>
                  <button style={{ background: 'white', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><FaShareAlt /> {t("SHARE")}</button>
                </div>
              </div>
              
              <div className="glass-panel" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'white', margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem' }}><FaCut color="var(--fifa-gold)" /> {t("CLIP EDITOR TIMELINE")}</h3>
                <div style={{ display: 'flex', flex: 1, background: 'rgba(0,0,0,0.5)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', padding: '10px' }}>
                  {/* Mock Timeline Tracks */}
                  <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '10%', right: '20%', background: 'rgba(212,175,55,0.3)', borderRadius: '5px', border: '1px solid var(--fifa-gold)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>SELECTED CLIP (0:15)</span>
                  </div>
                  {/* Playhead */}
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: '30%', width: '2px', background: '#ef4444' }}>
                    <div style={{ position: 'absolute', top: '-5px', left: '-4px', width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CITY MAP TAB (Original Vibe Map) */}
        {activeTab === "city-map" && (
          <div style={{ display: 'flex', width: '100%', gap: '20px', flexWrap: 'wrap' }}>
            {/* Left Side: The Map Area */}
            <div className="glass-panel" style={{ flex: 2, minWidth: '300px', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              
              {/* Simulated Dark Map Background */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.1), rgba(0,0,0,0.8))' }} />
              
              {/* Grid Lines */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundSize: '50px 50px', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)' }} />

              {/* Map Markers (Simulated) */}
              {fanZones.map((zone, idx) => {
                const positions = [
                  { top: '30%', left: '40%' },
                  { top: '60%', left: '70%' },
                  { top: '20%', left: '80%' },
                  { top: '70%', left: '30%' }
                ];
                const isActive = selectedZone?.id === zone.id;
                
                return (
                  <motion.div 
                    key={zone.id}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setSelectedZone(zone)}
                    style={{ 
                      position: 'absolute', 
                      top: positions[idx].top, 
                      left: positions[idx].left, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      cursor: 'pointer',
                      zIndex: isActive ? 10 : 1
                    }}
                  >
                    {/* Heatmap Glow */}
                    <div style={{ position: 'absolute', width: isActive ? '120px' : '80px', height: isActive ? '120px' : '80px', background: zone.color, borderRadius: '50%', filter: 'blur(30px)', opacity: isActive ? 0.6 : 0.3, transition: 'all 0.3s' }} />
                    
                    <div style={{ 
                      background: 'rgba(0,0,0,0.8)', 
                      width: isActive ? '60px' : '45px', 
                      height: isActive ? '60px' : '45px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      border: `2px solid ${zone.color}`,
                      color: zone.color,
                      boxShadow: `0 0 20px ${zone.color}`,
                      zIndex: 2,
                      transition: 'all 0.3s'
                    }}>
                      {zone.icon}
                    </div>
                    {isActive && (
                      <div style={{ marginTop: '10px', background: 'rgba(0,0,0,0.8)', padding: '5px 15px', borderRadius: '15px', border: `1px solid ${zone.color}`, zIndex: 2 }}>
                        <span style={{ color: 'white', fontFamily: 'Oswald', letterSpacing: '1px', fontSize: '0.8rem' }}>{zone.name.toUpperCase()}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Right Side: Zone Details */}
            <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '10px' }}>
              <h2 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', letterSpacing: '2px' }}>{t("TOP TRENDING ZONES")}</h2>
              
              {fanZones.map((zone) => (
                <motion.div 
                  key={zone.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedZone(zone)}
                  className="glass-panel"
                  style={{ 
                    padding: '20px', 
                    cursor: 'pointer',
                    borderLeft: `4px solid ${zone.color}`,
                    background: selectedZone?.id === zone.id ? 'rgba(255,255,255,0.08)' : 'var(--glass-bg)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '0 0 10px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ color: zone.color }}>{zone.icon}</div>
                      <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>{zone.name}</h3>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: zone.color, border: `1px solid ${zone.color}`, padding: '3px 8px', borderRadius: '10px', fontFamily: 'Oswald' }}>
                      {zone.activity.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 10px 0', color: 'var(--fifa-gold)', fontSize: '0.8rem', fontFamily: 'Oswald', letterSpacing: '1px' }}>
                    {t("VIBE:")} {t(zone.vibe).toUpperCase()}
                  </p>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                    {zone.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
