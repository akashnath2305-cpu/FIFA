"use client";

import { useState, useEffect } from "react";
import { FaBus, FaTrain, FaCar, FaMagic, FaPaperPlane, FaRoute, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

interface RouteData {
  id: string;
  name: string;
  type: string;
  startLoc: string;
  endLoc: string;
  status: string;
  schedules?: { departure: string; arrival: string }[];
}

export default function TransportPage() {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [aiMessage, setAiMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Hello! I am your Personal Transit AI. Need to know when to leave or the best route to your gate? Just ask!' }
  ]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    // Fetch transport routes
    fetch('/api/transport')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRoutes(data);
      })
      .catch(err => console.error("Error fetching routes:", err));
  }, []);

  const handleSendAi = async () => {
    if (!aiMessage.trim()) return;
    
    const userMsg = aiMessage;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setAiMessage("");
    setIsLoadingAi(true);

    try {
      const res = await fetch('/api/transport/ai-routing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, ticketInfo: { gate: 'B' } })
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { role: 'ai', text: data.reply || 'Sorry, I am having trouble connecting to the network right now.' }]);
    } catch {
      setChatHistory(prev => [...prev, { role: 'ai', text: 'Error connecting to AI service.' }]);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ACTIVE':
      case 'ON_ROUTE': return '#10b981'; // green
      case 'DELAYED': return '#f59e0b'; // orange
      case 'CANCELLED': return '#ef4444'; // red
      case 'SECURED_BY_POLICE': return '#3b82f6'; // blue
      default: return 'white';
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'BUS': return <FaBus size={24} />;
      case 'TRAIN': return <FaTrain size={24} />;
      case 'VIP_CONVOY': return <FaCar size={24} />;
      default: return <FaRoute size={24} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
      
      <header>
        <h1 style={{ fontSize: 'clamp(1.2rem, 4.5vw, 2rem)', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
          SMART TRANSIT
        </h1>
        <p style={{ color: 'var(--fifa-gold)', fontFamily: 'Oswald', letterSpacing: '2px', fontSize: '1rem', margin: 0 }}>
          AI-POWERED ROUTES & REAL-TIME SCHEDULES
        </p>
      </header>

      <div style={{ display: 'flex', flex: 1, minHeight: 0, gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Left Side: Live Routes */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <h2 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.2rem', fontFamily: 'Oswald', letterSpacing: '1px' }}>
              LIVE ROUTES
            </h2>
          </div>

          {routes.length === 0 ? (
            <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No active routes found. (Staff: Please initialize routes in the Nexus dashboard).
            </div>
          ) : routes.map(route => (
            <motion.div 
              key={route.id}
              whileHover={{ scale: 1.01 }}
              className="glass-panel"
              style={{ padding: '20px', borderLeft: `4px solid ${getStatusColor(route.status)}` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ color: getStatusColor(route.status), background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '50%' }}>
                    {getIcon(route.type)}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>{route.name}</h3>
                    <p style={{ margin: '5px 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FaRoute /> {route.startLoc} → {route.endLoc}
                    </p>
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${getStatusColor(route.status)}`, color: getStatusColor(route.status), padding: '5px 15px', borderRadius: '20px', fontFamily: 'Oswald', fontSize: '0.8rem', letterSpacing: '1px' }}>
                  {route.status}
                </div>
              </div>

              {route.schedules && route.schedules.length > 0 && (
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <FaClock color="var(--fifa-gold)" />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Next Departure:</span>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>
                    {new Date(route.schedules[0].departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Right Side: AI Transit Advisor */}
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px', marginBottom: '15px' }}>
            <FaMagic size={24} color="var(--fifa-gold)" />
            <h2 style={{ margin: 0, color: 'var(--fifa-gold)', fontSize: '1.2rem', fontFamily: 'Oswald', letterSpacing: '1px' }}>TRANSIT AI</h2>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', paddingRight: '10px', marginBottom: '15px' }}>
            {chatHistory.map((chat, idx) => (
              <div key={idx} style={{ 
                alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start',
                background: chat.role === 'user' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255,255,255,0.05)',
                border: chat.role === 'user' ? '1px solid rgba(212, 175, 55, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                padding: '12px 15px',
                borderRadius: '15px',
                maxWidth: '85%',
                color: 'white',
                fontSize: '0.95rem',
                lineHeight: '1.5'
              }}>
                {chat.text}
              </div>
            ))}
            {isLoadingAi && (
              <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '12px 20px', borderRadius: '15px', color: 'var(--fifa-gold)', display: 'flex', gap: '5px' }}>
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>•</motion.div>
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>•</motion.div>
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>•</motion.div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={aiMessage}
              onChange={e => setAiMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendAi()}
              placeholder="E.g., When should I leave for Gate B?"
              style={{ flex: 1, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px', borderRadius: '20px', color: 'white', outline: 'none' }}
            />
            <button 
              onClick={handleSendAi}
              disabled={isLoadingAi}
              style={{ background: 'var(--fifa-gold)', border: 'none', width: '45px', height: '45px', borderRadius: '50%', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: isLoadingAi ? 'not-allowed' : 'pointer', opacity: isLoadingAi ? 0.5 : 1 }}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
