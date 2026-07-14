import { motion } from "framer-motion";
import { FaMap, FaTimes, FaVideo, FaShieldAlt } from "react-icons/fa";
import Image from "next/image";

interface StadiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StadiumModal({ isOpen, onClose }: StadiumModalProps) {
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
        style={{ width: '80%', maxWidth: '900px', height: '70vh', background: 'rgba(15,15,15,0.9)', border: '1px solid var(--fifa-gold)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, rgba(212,175,55,0.1), transparent)' }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.8rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '15px' }}><FaMap color="var(--fifa-gold)" /> METLIFE STADIUM - VIRTUAL HUB</h2>
          <button aria-label="Close Stadium Modal" onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}><FaTimes /></button>
        </div>
        <div style={{ flex: 1, padding: '30px', display: 'flex', gap: '30px' }}>
          <div style={{ flex: 2, background: 'rgba(0,0,0,0.5)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <Image src="/bg.png" alt="Stadium Layout Background" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.4 }} priority />
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <FaVideo size={50} color="var(--fifa-gold)" />
              <h3 style={{ color: 'white', letterSpacing: '2px' }}>INTERACTIVE 3D PREVIEW</h3>
              <button className="gold-btn" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>LAUNCH AR TOUR</button>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ color: 'var(--fifa-gold)', margin: '0 0 10px 0', fontSize: '1rem' }}><FaShieldAlt /> SECURITY WAIT TIMES</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: 'white' }}>Gate A (VIP)</span> <span style={{ color: '#10b981' }}>2 mins</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: 'white' }}>Gate B (General)</span> <span style={{ color: '#fbbf24' }}>14 mins</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'white' }}>Gate C (General)</span> <span style={{ color: '#ef4444' }}>28 mins</span></div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ color: 'var(--fifa-gold)', margin: '0 0 10px 0', fontSize: '1rem' }}>🌦️ MICRO-WEATHER</h4>
              <p style={{ color: 'white', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>Temperature: 72°F<br/>Wind: 5mph East<br/>Roof Status: <strong style={{ color: '#10b981' }}>OPEN</strong></p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
