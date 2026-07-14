"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaTicketAlt, FaBell, FaMapMarkedAlt, FaGlobeAmericas, FaFire, FaGamepad, FaSignOutAlt, FaTasks, FaUserCircle, FaFutbol, FaRobot, FaLeaf } from "react-icons/fa";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";

/**
 * @fileoverview Global Navigation Sidebar
 * Uses React.memo for high-performance rendering
 */
function Sidebar() {
  const pathname = usePathname();
  const { role, user, logout } = useAuth();
  const { t } = useLanguage();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!role) return;

    const checkAlerts = async () => {
      try {
        const res = await fetch(`/api/alerts?role=${role}`);
        if (!res.ok) return;
        const alerts = await res.json();
        
        const lastViewed = localStorage.getItem("lastViewedAlerts");
        
        if (alerts && alerts.length > 0) {
          if (!lastViewed) {
            setHasUnreadAlerts(true);
          } else {
            const lastViewedTime = new Date(lastViewed).getTime();
            const newestAlertTime = new Date(alerts[0].createdAt).getTime();
            if (newestAlertTime > lastViewedTime) {
              setHasUnreadAlerts(true);
            } else {
              setHasUnreadAlerts(false);
            }
          }
        } else {
          setHasUnreadAlerts(false);
        }
      } catch (e) {
        // Silently ignore fetch errors to prevent dev overlay when server is restarting
        console.warn("Could not fetch alerts:", e);
      }
    };

    checkAlerts();
    const interval = setInterval(checkAlerts, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, [role, pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isProfileOpen &&
        profileRef.current && 
        !profileRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  // Hide the sidebar completely if we are on the login page or not logged in yet
  if (pathname === "/login" || !role) {
    return null;
  }

  return (
    <aside className="icon-sidebar">
      <nav className="icon-sidebar-nav">
        
        <Link href="/" aria-label="Go to Home" className={`icon-nav-item ${pathname === "/" ? "active" : ""}`}>
          <div className="icon-circle">
            <FaHome size={16} />
          </div>
          <span className="icon-text">{t("HOME")}</span>
        </Link>

        {/* FAN SPECIFIC LINKS */}
        {role === "FAN" && (
          <>
            <Link href="/ticket" aria-label="View My Tickets" className={`icon-nav-item ${pathname === "/ticket" ? "active" : ""}`}>
              <div className="icon-circle">
                <FaTicketAlt size={16} />
              </div>
              <span className="icon-text">{t("TICKETS")}</span>
            </Link>
            
            <Link href="/vibemap" aria-label="View Vibe Map" className={`icon-nav-item ${pathname === "/vibemap" ? "active" : ""}`}>
              <div className="icon-circle">
                <FaFire size={16} />
              </div>
              <span className="icon-text">{t("VIBES")}</span>
            </Link>

            <Link href="/fancards" aria-label="View Fan Cards" className={`icon-nav-item ${pathname === "/fancards" ? "active" : ""}`}>
              <div className="icon-circle">
                <FaGamepad size={16} />
              </div>
              <span className="icon-text">{t("CARDS")}</span>
            </Link>

            <Link href="/eco" aria-label="Eco Hub" className={`icon-nav-item ${pathname === "/eco" ? "active" : ""}`}>
              <div className="icon-circle" style={{ background: pathname === "/eco" ? '#10b981' : 'transparent', color: pathname === "/eco" ? 'white' : '#10b981', borderColor: '#10b981' }}>
                <FaLeaf size={16} />
              </div>
              <span className="icon-text">{t("ECO HUB")}</span>
            </Link>
          </>
        )}

        {/* ORGANIZER SPECIFIC LINKS */}
        {role === "ORGANIZER" && (
          <>
            <Link href="/nexus" aria-label="Go to Organizer Nexus" className={`icon-nav-item ${pathname === "/nexus" ? "active" : ""}`}>
              <div className="icon-circle" style={{ background: pathname === "/nexus" ? 'var(--fifa-gold)' : 'transparent', color: pathname === "/nexus" ? 'black' : 'white' }}>
                <FaGlobeAmericas size={16} />
              </div>
              <span className="icon-text">{t("NEXUS")}</span>
            </Link>
            
            <Link href="/tasks" aria-label="Manage Tasks" className={`icon-nav-item ${pathname === "/tasks" ? "active" : ""}`}>
              <div className="icon-circle">
                <FaTasks size={16} />
              </div>
              <span className="icon-text">{t("TASKS")}</span>
            </Link>

            <Link href="/copilot" aria-label="AI Copilot" className={`icon-nav-item ${pathname === "/copilot" ? "active" : ""}`}>
              <div className="icon-circle">
                <FaRobot size={16} />
              </div>
              <span className="icon-text">{t("COPILOT")}</span>
            </Link>
            <Link href="/eco" aria-label="Eco Hub" className={`icon-nav-item ${pathname === "/eco" ? "active" : ""}`}>
              <div className="icon-circle" style={{ background: pathname === "/eco" ? '#10b981' : 'transparent', color: pathname === "/eco" ? 'white' : '#10b981', borderColor: '#10b981' }}>
                <FaLeaf size={16} />
              </div>
              <span className="icon-text">{t("ECO HUB")}</span>
            </Link>
          </>
        )}

        {/* STAFF SPECIFIC LINKS */}
        {role === "STAFF" && (
          <>
            <Link href="/tasks" aria-label="View Staff Tasks" className={`icon-nav-item ${pathname === "/tasks" ? "active" : ""}`}>
              <div className="icon-circle">
                <FaTasks size={16} />
              </div>
              <span className="icon-text">{t("TASKS")}</span>
            </Link>

            <Link href="/copilot" aria-label="AI Copilot" className={`icon-nav-item ${pathname === "/copilot" ? "active" : ""}`}>
              <div className="icon-circle">
                <FaRobot size={16} />
              </div>
              <span className="icon-text">{t("COPILOT")}</span>
            </Link>
            <Link href="/eco" aria-label="Eco Hub" className={`icon-nav-item ${pathname === "/eco" ? "active" : ""}`}>
              <div className="icon-circle" style={{ background: pathname === "/eco" ? '#10b981' : 'transparent', color: pathname === "/eco" ? 'white' : '#10b981', borderColor: '#10b981' }}>
                <FaLeaf size={16} />
              </div>
              <span className="icon-text">{t("ECO HUB")}</span>
            </Link>
          </>
        )}

        {/* COMMON LINKS */}
        <Link href="/alerts" aria-label="View Alerts" className={`icon-nav-item ${pathname === "/alerts" ? "active" : ""}`} style={{ position: 'relative' }}>
          <div className="icon-circle">
            <FaBell size={16} />
            {hasUnreadAlerts && (
              <span style={{
                position: 'absolute',
                top: '0px',
                right: '15px',
                width: '12px',
                height: '12px',
                background: '#ef4444',
                borderRadius: '50%',
                boxShadow: '0 0 10px #ef4444',
                animation: 'pulse 1.5s infinite cubic-bezier(0.4, 0, 0.6, 1)',
                border: '2px solid var(--glass-bg)'
              }} />
            )}
          </div>
          <span className="icon-text">{t("ALERTS")}</span>
        </Link>

        <Link href="/navigator" aria-label="Open Seat Navigator" className={`icon-nav-item ${pathname === "/navigator" ? "active" : ""}`}>
          <div className="icon-circle">
            <FaMapMarkedAlt size={16} />
          </div>
          <span className="icon-text">{t("NAVIGATOR")}</span>
        </Link>


        {/* Separator */}
        <div className="sidebar-separator" />

        {/* Profile Button with Window */}
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <button 
            ref={buttonRef}
            onClick={() => setIsProfileOpen(!isProfileOpen)} 
            aria-label="Toggle Profile" 
            className={`icon-nav-item ${isProfileOpen ? "active" : ""}`}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div className="icon-circle" style={{ background: 'rgba(212, 175, 55, 0.2)', borderColor: 'var(--fifa-gold)', color: 'var(--fifa-gold)', fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Oswald' }}>
              {(user?.name || "Fan").charAt(0).toUpperCase()}
            </div>
            <span className="icon-text">{t("PROFILE")}</span>
          </button>
          
          {isProfileOpen && mounted && createPortal(
            <div ref={profileRef} className="glass-panel profile-popup" style={{
              position: 'fixed',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--fifa-gold), #8C6A1C)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black', flexShrink: 0, fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'Oswald' }}>
                  {(user?.name || "Fan").charAt(0).toUpperCase()}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <h4 style={{ margin: 0, color: 'white', fontFamily: 'Oswald', letterSpacing: '1px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.name || "FIFA Fan"}</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.75rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.email || "fan@fifa.com"}</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{t("Account Role")}</p>
                  <p style={{ margin: '2px 0 0 0', fontWeight: 'bold', color: 'var(--fifa-gold)', fontFamily: 'Oswald', letterSpacing: '1px' }}>{role}</p>
                </div>
                <button onClick={() => { setIsProfileOpen(false); logout(); }} style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#ef4444', padding: '6px 12px', borderRadius: '15px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FaSignOutAlt /> {t("LOGOUT")}
                </button>
              </div>
            </div>,
            document.body
          )}
        </div>

        {/* Sign Out Button */}
        <button onClick={logout} aria-label="Sign Out" className="icon-nav-item profile-item" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div className="icon-circle" style={{ border: '1px solid rgba(239, 68, 68, 0.4)', color: '#ef4444' }}>
            <FaSignOutAlt size={14} />
          </div>
          <span className="icon-text" style={{ color: '#ef4444' }}>{t("SIGN OUT")}</span>
        </button>
        
        <div style={{ marginTop: '5px', fontSize: '0.5rem', color: '#6b7280', letterSpacing: '1px' }}>{role}</div>

      </nav>
    </aside>
  );
}

export default React.memo(Sidebar);
