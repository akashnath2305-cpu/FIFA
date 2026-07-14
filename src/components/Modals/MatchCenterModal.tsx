import { motion } from "framer-motion";
import { FaChartBar, FaTimes } from "react-icons/fa";
import Image from "next/image";

interface MatchCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MatchCenterModal({ isOpen, onClose }: MatchCenterModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <motion.div 
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="glass-panel"
        style={{ width: '80%', maxWidth: '800px', height: '70vh', background: 'rgba(15,15,15,0.9)', border: '1px solid var(--fifa-gold)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, rgba(212,175,55,0.1), transparent)' }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.8rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '15px' }}><FaChartBar color="var(--fifa-gold)" /> LIVE MATCH CENTER</h2>
          <button aria-label="Close Match Center" onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}><FaTimes /></button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Image src="https://flagcdn.com/w80/us.png" alt="USA Flag" width={80} height={53} style={{ borderRadius: '5px' }} unoptimized />
            <span style={{ fontFamily: 'Oswald', fontSize: '1.5rem', color: 'white' }}>USA</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 40px' }} aria-live="polite">
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <span style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontFamily: 'Oswald', fontWeight: 700, color: 'white', textShadow: '0 0 20px rgba(212, 175, 55, 0.5)' }}>2</span>
              <span style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)', fontFamily: 'Oswald', color: 'var(--text-muted)' }}>-</span>
              <span style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontFamily: 'Oswald', fontWeight: 700, color: 'white', textShadow: '0 0 20px rgba(212, 175, 55, 0.5)' }}>1</span>
            </div>
            <span style={{ color: '#f87171', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }} /> 65' LIVE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Image src="https://flagcdn.com/w80/mx.png" alt="Mexico Flag" width={80} height={53} style={{ borderRadius: '5px' }} unoptimized />
            <span style={{ fontFamily: 'Oswald', fontSize: '1.5rem', color: 'white' }}>MEX</span>
          </div>
        </div>

        <div style={{ flex: 1, padding: '30px', display: 'flex', gap: '30px', overflowY: 'auto' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: 'var(--fifa-gold)', marginBottom: '20px', fontSize: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>MATCH STATS</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem', color: 'white' }}><span>54%</span><span>POSSESSION</span><span>46%</span></div>
              <div style={{ display: 'flex', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '54%', background: '#3b82f6' }} />
                <div style={{ width: '46%', background: '#10b981' }} />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem', color: 'white' }}><span>6</span><span>SHOTS ON TARGET</span><span>4</span></div>
              <div style={{ display: 'flex', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '60%', background: '#3b82f6' }} />
                <div style={{ width: '40%', background: '#10b981' }} />
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ color: 'var(--fifa-gold)', marginBottom: '20px', fontSize: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>LIVE TIMELINE</h3>
            <div style={{ borderLeft: '2px solid rgba(212,175,55,0.3)', paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-21px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--fifa-gold)' }} />
                <strong style={{ color: 'var(--fifa-gold)' }}>62'</strong> <span style={{ color: 'white' }}>Goal! Pulisic (USA) scores from the edge of the box.</span>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-21px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', background: '#fbbf24' }} />
                <strong style={{ color: 'white' }}>45'</strong> <span style={{ color: 'var(--text-muted)' }}>Yellow Card - Alvarez (MEX)</span>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-21px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--fifa-gold)' }} />
                <strong style={{ color: 'var(--fifa-gold)' }}>12'</strong> <span style={{ color: 'white' }}>Goal! Gimenez (MEX) header.</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
