"use client";

import { useState, useEffect } from "react";
import { FaBell, FaCloudRain, FaCarSide, FaUsers, FaInfoCircle, FaExclamationTriangle, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";

export default function AlertsPage() {
  const { role } = useAuth();
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Organizer Broadcast state
  const [isCreating, setIsCreating] = useState(false);
  const [newAlertTitle, setNewAlertTitle] = useState("");
  const [newAlertMessage, setNewAlertMessage] = useState("");
  const [newAlertType, setNewAlertType] = useState("INFO");
  const [newAlertTarget, setNewAlertTarget] = useState("ALL");

  useEffect(() => {
    fetchAlerts();
    // Update local storage so the sidebar unread indicator goes away
    localStorage.setItem("lastViewedAlerts", new Date().toISOString());
  }, [role]);

  const fetchAlerts = async () => {
    if (!role) return;
    try {
      const res = await fetch(`/api/alerts?role=${role}`);
      const data = await res.json();
      setAlerts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertTitle || !newAlertMessage) return;

    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: newAlertTitle, 
          message: newAlertMessage, 
          type: newAlertType,
          targetRole: newAlertTarget
        })
      });
      if (res.ok) {
        setIsCreating(false);
        setNewAlertTitle("");
        setNewAlertMessage("");
        setNewAlertType("INFO");
        setNewAlertTarget("ALL");
        fetchAlerts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getAlertStyle = (type: string) => {
    switch(type) {
      case "CRITICAL": return { color: "#ef4444", icon: <FaExclamationTriangle size={24} /> };
      case "WARNING": return { color: "#fbbf24", icon: <FaCarSide size={24} /> };
      case "INFO": 
      default: return { color: "#3b82f6", icon: <FaInfoCircle size={24} /> };
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 60000); // mins
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} Mins Ago`;
    return `${Math.floor(diff/60)} Hours Ago`;
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Loading Alerts...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '30px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', flexWrap: 'wrap', gap: '20px' , flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--fifa-gold)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px var(--fifa-gold-glow)' }}>
            <FaBell size={20} color="var(--fifa-gold)" />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(1.1rem, 4vw, 1.8rem)', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
              {t("SMART ALERTS")}
            </h1>
            <p style={{ color: 'var(--fifa-gold)', fontFamily: 'Oswald', letterSpacing: '2px', fontSize: '1rem', margin: 0 }}>
              {t("PREDICTIVE CONTEXTUAL NOTIFICATIONS")}
            </p>
          </div>
        </div>

        {role === "ORGANIZER" && (
          <button 
            onClick={() => setIsCreating(!isCreating)}
            className="gold-btn"
          >
            {isCreating ? t("CANCEL") : <><FaPlus /> {t("BROADCAST")}</>}
          </button>
        )}
      </header>

      {/* Broadcast Form */}
      <AnimatePresence>
        {role === "ORGANIZER" && isCreating && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>{t("NEW BROADCAST ALERT")}</h3>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <input 
                  type="text" placeholder={t("Alert Title")} value={newAlertTitle} onChange={(e) => setNewAlertTitle(e.target.value)}
                  style={{ flex: 1, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px', color: 'white', borderRadius: '8px' }}
                />
                <select value={newAlertType} onChange={(e) => setNewAlertType(e.target.value)} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px', color: 'white', borderRadius: '8px' }}>
                  <option value="INFO">{t("INFO (Blue)")}</option>
                  <option value="WARNING">{t("WARNING (Yellow)")}</option>
                  <option value="CRITICAL">{t("CRITICAL (Red)")}</option>
                </select>
                <select value={newAlertTarget} onChange={(e) => setNewAlertTarget(e.target.value)} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px', color: 'white', borderRadius: '8px' }}>
                  <option value="ALL">{t("Everyone")}</option>
                  <option value="FAN">{t("Fans Only")}</option>
                  <option value="STAFF">{t("Staff Only")}</option>
                  <option value="ORGANIZER">{t("Organizers Only")}</option>
                </select>
              </div>
              
              <textarea 
                placeholder={t("Alert Message...")} value={newAlertMessage} onChange={(e) => setNewAlertMessage(e.target.value)}
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px', color: 'white', borderRadius: '8px', minHeight: '80px', resize: 'vertical' }}
              />

              <button onClick={handleBroadcast} style={{ background: 'linear-gradient(135deg, var(--fifa-gold), #8C6A1C)', border: 'none', color: 'black', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                {t("SEND BROADCAST")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '50px', overflowY: 'auto', flex: 1 }}>
        {alerts.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '50px' }}>{t("No recent alerts.")}</div>
        ) : (
          alerts.map((alert, index) => {
            const styleInfo = getAlertStyle(alert.type);
            return (
              <motion.div 
                key={alert.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel" 
                style={{ 
                  display: 'flex', 
                  gap: '20px', 
                  padding: '25px', 
                  position: 'relative', 
                  flexShrink: 0,
                  borderLeft: `4px solid ${styleInfo.color}`
                }}
              >
                {/* Glow Behind Icon */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', background: styleInfo.color, filter: 'blur(30px)', opacity: 0.3 }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', zIndex: 1 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: `1px solid ${styleInfo.color}`, display: 'flex', justifyContent: 'center', alignItems: 'center', color: styleInfo.color }}>
                    {styleInfo.icon}
                  </div>
                </div>

                <div style={{ flex: 1, zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>{alert.title}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'Oswald', letterSpacing: '1px' }}>{formatTimeAgo(alert.createdAt)}</span>
                  </div>
                  <p style={{ color: '#e5e5e5', lineHeight: '1.5', fontSize: '0.9rem', margin: '0' }}>
                    {alert.message}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
