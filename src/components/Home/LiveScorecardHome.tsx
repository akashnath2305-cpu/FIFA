"use client";

import { FaChevronRight } from "react-icons/fa";
import { useLanguage } from "@/components/LanguageProvider";

interface LiveScorecardHomeProps {
  onOpenMatchCenter: () => void;
}

export default function LiveScorecardHome({ onOpenMatchCenter }: LiveScorecardHomeProps) {
  const { t } = useLanguage();

  return (
    <div style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
      <div className="glass-panel" style={{ padding: '25px', width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '25px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 15px 40px rgba(0,0,0,0.5)' }}>
        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
          <span>{t("LIVE MATCH")}</span>
          <span aria-live="polite" aria-atomic="true" style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '5px' }}><div aria-hidden="true" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }} /> <span className="sr-only">Minute </span>65'</span>
        </h3>

        {/* Live Match Grid */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <img src="https://flagcdn.com/w80/us.png" alt="USA Flag" style={{ width: '45px', height: '30px', objectFit: 'cover', borderRadius: '4px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
            <span style={{ fontFamily: 'Oswald', fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>USA</span>
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }} aria-label={t("Current score: USA 2, Mexico 1")}>
            <span style={{ fontSize: 'clamp(1.2rem, 4.5vw, 2rem)', fontFamily: 'Oswald', fontWeight: 700, color: 'white', textShadow: '0 0 15px rgba(255,255,255,0.3)' }} aria-hidden="true">2</span>
            <span style={{ fontSize: '1.5rem', fontFamily: 'Oswald', color: 'var(--text-muted)' }} aria-hidden="true">-</span>
            <span style={{ fontSize: 'clamp(1.2rem, 4.5vw, 2rem)', fontFamily: 'Oswald', fontWeight: 700, color: 'white', textShadow: '0 0 15px rgba(255,255,255,0.3)' }} aria-hidden="true">1</span>
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
          onClick={onOpenMatchCenter}
          aria-label={t("Open full Match Center details")}
          style={{
            background: 'transparent', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '15px', color: 'var(--fifa-gold)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
            fontFamily: 'Oswald', fontSize: '0.9rem', letterSpacing: '1px', padding: '12px', marginTop: '5px', cursor: 'pointer', transition: 'all 0.3s'
          }}>
          {t("MATCH CENTER")} <FaChevronRight size={10} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
