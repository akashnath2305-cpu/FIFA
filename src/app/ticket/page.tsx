"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaInfoCircle, FaSyncAlt, FaChevronLeft, FaChevronRight, FaFutbol, FaMapMarkerAlt, FaWalking, FaUsers, FaArrowLeft, FaEllipsisV, FaCamera, FaMicrophone, FaLocationArrow, FaLocationArrow as FaLocation, FaEye, FaRoute } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const TICKETS = [
  { id: 1, match: "USA vs MEXICO", date: "July 19, 2026", time: "8:00 PM", stadium: "MetLife Stadium", stadiumType: "OCTAGON", sectionCode: "100E-2", gate: "4B", altGate: "4C", alley: "12", gallery: "East Lower", row: "14", seat: "09", color1: "#4c1d95", color2: "#2e1065", qrGradient: "linear-gradient(135deg, #4ade80, #3b82f6)", crowdDensity: "HIGH", crowdColor: "#ef4444" },
  { id: 2, match: "CANADA vs FRANCE", date: "July 24, 2026", time: "6:00 PM", stadium: "BMO Field", stadiumType: "RECTANGULAR", sectionCode: "200N-3", gate: "North", altGate: "North-East", alley: "05", gallery: "North Club", row: "22", seat: "15", color1: "#b91c1c", color2: "#7f1d1d", qrGradient: "linear-gradient(135deg, #f87171, #facc15)", crowdDensity: "MODERATE", crowdColor: "#facc15" },
  { id: 3, match: "BRAZIL vs SPAIN", date: "July 28, 2026", time: "9:00 PM", stadium: "Estadio Azteca", stadiumType: "BOWL", sectionCode: "100-12", gate: "Main", altGate: "South-West", alley: "01", gallery: "Main Bowl", row: "05", seat: "42", color1: "#047857", color2: "#064e3b", qrGradient: "linear-gradient(135deg, #facc15, #4ade80)", crowdDensity: "LOW", crowdColor: "#4ade80" },
];

// --- Stadium SVG Helpers ---
const generateRow = (prefix: string, xStart: number, yStart: number, width: number, height: number, count: number, horizontal: boolean) => {
  const sections = [];
  for (let i = 0; i < count; i++) {
    sections.push({
      id: `${prefix}${i + 1}`,
      x: horizontal ? xStart + i * (width + 5) : xStart,
      y: horizontal ? yStart : yStart + i * (height + 5),
      width, height, transform: ""
    });
  }
  return sections;
};

const generateRing = (prefix: string, count: number, radiusX: number, radiusY: number, blockWidth: number, blockHeight: number) => {
  const sections = [];
  const cx = 400, cy = 300;
  for (let i = 0; i < count; i++) {
    const angle = (i * 360) / count;
    sections.push({
      id: `${prefix}${i + 1}`,
      x: cx - blockWidth/2,
      y: cy - radiusY - blockHeight/2,
      width: blockWidth, height: blockHeight,
      transform: `rotate(${angle} ${cx} ${cy})`
    });
  }
  return sections;
};

const getLayout = (type: string) => {
  if (type === "BOWL") {
    return {
      blocks: [...generateRing("100-", 20, 0, 100, 30, 20), ...generateRing("200-", 24, 0, 140, 35, 30), ...generateRing("300-", 32, 0, 190, 40, 40)],
      corners: []
    };
  }
  if (type === "RECTANGULAR") {
    return {
      blocks: [
        ...generateRow("100N-", 285, 200, 45, 30, 5, true), ...generateRow("100S-", 285, 370, 45, 30, 5, true),
        ...generateRow("100W-", 245, 235, 30, 40, 3, false), ...generateRow("100E-", 525, 235, 30, 40, 3, false),
        ...generateRow("200N-", 270, 165, 50, 30, 5, true), ...generateRow("200S-", 270, 405, 50, 30, 5, true),
        ...generateRow("300N-", 255, 125, 55, 35, 5, true), ...generateRow("300S-", 255, 440, 55, 35, 5, true),
      ],
      corners: []
    };
  }
  return {
    blocks: [
      ...generateRow("100N-", 285, 200, 45, 30, 5, true), ...generateRow("100S-", 285, 370, 45, 30, 5, true),
      ...generateRow("100W-", 245, 235, 30, 40, 3, false), ...generateRow("100E-", 525, 235, 30, 40, 3, false),
      ...generateRow("200N-", 270, 160, 50, 35, 5, true), ...generateRow("200S-", 270, 405, 50, 35, 5, true),
      ...generateRow("200W-", 205, 220, 35, 50, 3, false), ...generateRow("200E-", 560, 220, 35, 50, 3, false),
      ...generateRow("300N-", 255, 110, 55, 45, 5, true), ...generateRow("300S-", 255, 445, 55, 45, 5, true),
      ...generateRow("300W-", 160, 205, 40, 60, 3, false), ...generateRow("300E-", 600, 205, 40, 60, 3, false),
    ],
    corners: [
      { id: "C1", points: "240,200 280,200 280,230 240,230", transform: "rotate(-45 280 230)" }, { id: "C2", points: "520,200 560,200 560,230 520,230", transform: "rotate(45 520 230)" },
      { id: "C3", points: "240,370 280,370 280,400 240,400", transform: "rotate(45 280 370)" }, { id: "C4", points: "520,370 560,370 560,400 520,400", transform: "rotate(-45 520 370)" },
      { id: "C5", points: "200,160 265,160 265,195 200,195", transform: "rotate(-45 265 195)" }, { id: "C6", points: "535,160 600,160 600,195 535,195", transform: "rotate(45 535 195)" },
      { id: "C7", points: "200,405 265,405 265,440 200,440", transform: "rotate(45 265 405)" }, { id: "C8", points: "535,405 600,405 600,440 535,440", transform: "rotate(-45 535 405)" },
      { id: "C9", points: "155,110 250,110 250,155 155,155", transform: "rotate(-45 250 155)" }, { id: "C10", points: "550,110 645,110 645,155 550,155", transform: "rotate(45 550 155)" },
      { id: "C11", points: "155,445 250,445 250,490 155,490", transform: "rotate(45 250 445)" }, { id: "C12", points: "550,445 645,445 645,490 550,490", transform: "rotate(-45 550 445)" },
    ]
  };
};

// --- QR Code ---
function StylizedQRCode({ gradient }: { gradient: string }) {
  const dots = useMemo(() => {
    const arr = [];
    for (let x = 0; x < 15; x++) {
      for (let y = 0; y < 15; y++) {
        if ((x < 5 && y < 5) || (x > 9 && y < 5) || (x < 5 && y > 9) || (x > 5 && x < 9 && y > 5 && y < 9)) continue;
        if (((x * 13) + (y * 7)) % 10 > 4) arr.push(<circle key={`${x}-${y}`} cx={x * 12 + 16} cy={y * 12 + 16} r="4.5" fill="#111827" />);
      }
    }
    return arr;
  }, []);

  return (
    <div style={{ width: '160px', height: '160px', background: gradient, borderRadius: '20px', padding: '10px', boxShadow: '0 15px 25px rgba(0,0,0,0.5)', position: 'relative' }}>
      <svg width="100%" height="100%" viewBox="0 0 200 200">
        <rect x="15" y="15" width="45" height="45" rx="12" fill="none" stroke="#111827" strokeWidth="12" />
        <rect x="27" y="27" width="21" height="21" rx="6" fill="#111827" />
        <rect x="140" y="15" width="45" height="45" rx="12" fill="none" stroke="#111827" strokeWidth="12" />
        <rect x="152" y="27" width="21" height="21" rx="6" fill="#111827" />
        <rect x="15" y="140" width="45" height="45" rx="12" fill="none" stroke="#111827" strokeWidth="12" />
        <rect x="27" y="152" width="21" height="21" rx="6" fill="#111827" />
        {dots}
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '35px', height: '35px', background: '#f97316', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', border: '2px solid white' }}>
        <FaFutbol color="white" size={16} />
      </div>
    </div>
  );
}

export default function TicketPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeTicketIdx, setActiveTicketIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [interactiveSection, setInteractiveSection] = useState<string | null>(null);
  const [showSeatView, setShowSeatView] = useState(false);
  const [seatViewAngleIdx, setSeatViewAngleIdx] = useState(0);
  const [showARNav, setShowARNav] = useState(false);
  const [arPhase, setArPhase] = useState<"init" | "scanning" | "navigating">("init");
  const [hoveredBtn, setHoveredBtn] = useState<"view" | "ar" | null>(null);
  const activeTicket = TICKETS[activeTicketIdx];

  const [windowWidth, setWindowWidth] = useState(1200);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  const SEAT_VIEW_ANGLES = [
    "/hq_stadium_1_1783962850431.png",
    "/hq_stadium_2_1783962876074.png",
    "/hq_stadium_3_1783962889904.png",
    "/hq_stadium_4_1783962904229.png"
  ];

  const barcodeLines = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      width: (i * 7) % 3 === 0 ? '4px' : '2px',
      opacity: (i * 13) % 5 === 0 ? 0 : 1
    }));
  }, []);

  const handleNextTicket = () => { setIsFlipped(false); setActiveTicketIdx((prev) => (prev + 1) % TICKETS.length); };
  const handlePrevTicket = () => { setIsFlipped(false); setActiveTicketIdx((prev) => (prev - 1 + TICKETS.length) % TICKETS.length); };
  const handleTicketClick = (id: number) => {
    if (id === activeTicket.id) setIsFlipped(!isFlipped);
    else { setActiveTicketIdx(TICKETS.findIndex(t => t.id === id)); setIsFlipped(false); }
  };

  const layout = getLayout(activeTicket.stadiumType);
  const targetSection = activeTicket.sectionCode;

  const targetGeometry = useMemo(() => {
    const sec = layout.blocks.find(b => b.id === (interactiveSection || targetSection));
    if (sec) {
       let cx = sec.x + sec.width / 2;
       let cy = sec.y + sec.height / 2;
       const rowNum = parseInt(activeTicket.row) || 1;
       const seatNum = parseInt(activeTicket.seat) || 1;
       cx += (seatNum % 5 - 2) * (sec.width / 8);
       cy += (rowNum % 5 - 2) * (sec.height / 8);
       return { cx, cy, transform: sec.transform };
    }
    const corner = layout.corners.find(c => c.id === (interactiveSection || targetSection));
    if (corner) {
       const pts = corner.points.split(' ').map(p => p.split(',').map(Number));
       let cx = pts.reduce((sum, p) => sum + p[0], 0) / pts.length;
       let cy = pts.reduce((sum, p) => sum + p[1], 0) / pts.length;
       return { cx, cy, transform: corner.transform };
    }
    return null;
  }, [layout, activeTicket, interactiveSection, targetSection]);

  const getMapFillColor = (id: string) => {
    if (id === (interactiveSection || targetSection)) return "#facc15"; // Highlight User's Seat in Gold
    if (id.startsWith("100") || id.startsWith("C1") || id.startsWith("C2") || id.startsWith("C3") || id.startsWith("C4")) return "#312e81";
    if (id.startsWith("200") || id.startsWith("C5") || id.startsWith("C6") || id.startsWith("C7") || id.startsWith("C8")) return "#1e3a8a";
    return "#1e1b4b";
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', background: 'rgba(15, 10, 30, 0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', padding: isMobile ? '10px' : '15px 20px', borderRadius: '25px', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
      
      {/* FIFA Surprise: Floating Golden Footballs in Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 0.12 }}>
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '10%', left: '5%' }}>
          <FaFutbol size={150} color="#FFDF00" />
        </motion.div>
        <motion.div animate={{ y: [0, 40, 0], rotate: [360, 180, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', bottom: '15%', right: '5%' }}>
          <FaFutbol size={250} color="#D4AF37" />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180, 270, 360] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '25%', left: '35%' }}>
          <FaFutbol size={400} color="#FFDF00" opacity={0.4} />
        </motion.div>
      </div>

      {/* Split Screen Container */}
      <div style={{ display: 'flex', flex: 1, gap: isMobile ? '15px' : '30px', alignItems: 'stretch', flexDirection: isDesktop ? 'row' : 'column', marginTop: '10px', minHeight: 'max-content' }}>
        
        {/* Left Side: Ticket Deck */}
        <motion.div 
          layout 
          style={{ flex: isFlipped ? 1 : '0 0 100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '20px' }}
        >
          {/* Header */}
          <header style={{ width: '100%', maxWidth: '350px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', position: 'relative', zIndex: 50 , flexShrink: 0 }}>
            <button onClick={() => isFlipped ? setIsFlipped(false) : router.back()} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}><FaArrowLeft size={14} /></button>
            <h2 style={{ margin: 0, color: 'white', fontFamily: 'Oswald', letterSpacing: '1px' }}>{t("MY TICKETS")}</h2>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowMenu(!showMenu)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}><FaEllipsisV size={14} /></button>
              <AnimatePresence>
                {showMenu && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -10 }} transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', top: '50px', right: 0, background: 'rgba(15, 10, 30, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '5px', width: '200px', boxShadow: '0 10px 30px rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)' }}
                  >
                    <button onClick={() => { alert("Ticket shared!"); setShowMenu(false); }} style={{ background: 'transparent', border: 'none', color: 'white', padding: '10px', textAlign: 'left', cursor: 'pointer', borderRadius: '8px', fontSize: '0.9rem', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Share Ticket</button>
                    <button onClick={() => { alert("Added to Apple Wallet"); setShowMenu(false); }} style={{ background: 'transparent', border: 'none', color: 'white', padding: '10px', textAlign: 'left', cursor: 'pointer', borderRadius: '8px', fontSize: '0.9rem', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Add to Wallet</button>
                    <button onClick={() => { alert("Ticket transfer initiated"); setShowMenu(false); }} style={{ background: 'transparent', border: 'none', color: 'white', padding: '10px', textAlign: 'left', cursor: 'pointer', borderRadius: '8px', fontSize: '0.9rem', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Transfer Ticket</button>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '5px 0' }} />
                    <button onClick={() => { alert("Issue reported"); setShowMenu(false); }} style={{ background: 'transparent', border: 'none', color: '#f87171', padding: '10px', textAlign: 'left', cursor: 'pointer', borderRadius: '8px', fontSize: '0.9rem', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Report Issue</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          {/* Ticket Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px', zIndex: 10 }}>
            <button onClick={handlePrevTicket} style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', backdropFilter: 'blur(5px)' }}><FaChevronLeft /></button>
            <div style={{ color: 'white', fontSize: '0.9rem', fontFamily: 'Oswald', letterSpacing: '2px' }}>{activeTicketIdx + 1} OF {TICKETS.length}</div>
            <button onClick={handleNextTicket} style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', backdropFilter: 'blur(5px)' }}><FaChevronRight /></button>
          </div>

          {/* Swappable Deck */}
          <div style={{ position: 'relative', width: '100%', height: '480px', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
            {TICKETS.map((ticket, index) => {
              const isActive = ticket.id === activeTicket.id;
              
              // Hide inactive tickets only when looking at the QR code (flipped)
              if (isFlipped && !isActive) return null;
              
              let offsetIndex = index - activeTicketIdx;
              if (offsetIndex < 0) offsetIndex += TICKETS.length; 
              
              let xOffset = 0, rotateZ = 0, scale = 1, yOffset = 0, zIndex = 10;
              if (!isActive) {
                const spread = isMobile ? 40 : (isTablet ? 70 : 100);
                const scaleDown = isMobile ? 0.9 : 0.85;
                if (offsetIndex === 1) { xOffset = spread; rotateZ = 12; scale = scaleDown; yOffset = 25; zIndex = 5; } 
                else if (offsetIndex === 2) { xOffset = -spread; rotateZ = -12; scale = scaleDown; yOffset = 25; zIndex = 5; }
              }

              return (
                <motion.div key={ticket.id} initial={false}
                  animate={{ x: xOffset, y: yOffset, rotateZ, scale, zIndex }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  onClick={() => handleTicketClick(ticket.id)}
                  style={{ position: 'absolute', top: 0, width: '290px', height: '480px', cursor: 'pointer', perspective: '1500px', transformOrigin: 'bottom center', filter: isActive ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.9))' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
                >
                  <motion.div animate={{ rotateY: isActive && isFlipped ? 180 : 0 }} transition={{ duration: 0.7, type: "spring", bounce: 0.4 }} style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}>
                    
                    {/* FRONT FACE */}
                    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: '20px', overflow: 'hidden' }}>
                      <div style={{ position: 'relative', height: '250px', background: `linear-gradient(to bottom, ${ticket.color1}, ${ticket.color2})`, overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.2) 40%, rgba(255,215,0,0.3) 50%, transparent 60%)', mixBlendMode: 'overlay', pointerEvents: 'none' }} />
                        <img src="/logo-flame.avif" alt="Poster" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, mixBlendMode: 'luminosity' }} />
                        <div style={{ position: 'absolute', top: 15, left: -20, background: 'var(--fifa-gold)', color: 'black', padding: '5px 30px', transform: 'rotate(-45deg)', fontFamily: 'Oswald', fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '2px' }}>VIP PASS</div>
                        <div style={{ position: 'absolute', bottom: 15, left: 20, right: 20 }}>
                          <h3 style={{ margin: 0, color: 'white', fontFamily: 'Oswald', fontSize: '1.6rem' }}>{ticket.match}</h3>
                          <p style={{ margin: 0, color: 'var(--fifa-gold)', fontWeight: 'bold', fontSize: '0.8rem' }}>FIFA WORLD CUP 2026™</p>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(to top, #dac5f9, transparent)' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#dac5f9', position: 'relative', zIndex: 2 }}>
                        <div style={{ width: '24px', height: '24px', background: '#121212', borderRadius: '50%', transform: 'translateX(-12px)' }} />
                        <div style={{ flex: 1, borderTop: '2px dashed rgba(107, 33, 168, 0.4)', margin: '0 10px' }} />
                        <div style={{ width: '24px', height: '24px', background: '#121212', borderRadius: '50%', transform: 'translateX(12px)' }} />
                      </div>
                      <div style={{ flex: 1, background: 'linear-gradient(to bottom, #dac5f9, #d8b4fe)', padding: '15px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div><p style={{ color: '#9333ea', fontSize: '0.7rem', margin: 0, fontWeight: 'bold' }}>Date: <span style={{ color: '#1f2937', fontWeight: 'normal' }}>{ticket.date}</span></p><p style={{ color: '#9333ea', fontSize: '0.7rem', margin: '5px 0 0 0', fontWeight: 'bold' }}>Stadium: <span style={{ color: '#1f2937', fontWeight: 'normal' }}>{ticket.stadium}</span></p></div>
                          <div style={{ textAlign: 'right' }}><p style={{ color: '#9333ea', fontSize: '0.7rem', margin: 0, fontWeight: 'bold' }}>Time: <span style={{ color: '#1f2937', fontWeight: 'normal' }}>{ticket.time}</span></p><p style={{ color: '#9333ea', fontSize: '0.7rem', margin: '5px 0 0 0', fontWeight: 'bold' }}>Seat: <span style={{ color: '#1f2937', fontWeight: 'normal' }}>{ticket.seat}</span></p></div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', gap: '5px' }}>
                          <div style={{ display: 'flex', gap: '2px', height: '30px', width: '100%', justifyContent: 'center' }}>{barcodeLines.map((line, i) => (<div key={i} style={{ width: line.width, height: '100%', background: '#1f2937', opacity: line.opacity }} />))}</div>
                        </div>
                        {isActive && !isFlipped && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', color: '#6b21a8', fontSize: '0.65rem', fontWeight: 'bold' }}><FaSyncAlt /> TAP TO FLIP FOR SEAT GUIDE</div>}
                      </div>
                    </div>

                    {/* BACK FACE */}
                    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #111827, #000000)', borderRadius: '20px', padding: '15px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.05) 40%, rgba(255,215,0,0.1) 50%, transparent 60%)', pointerEvents: 'none' }} />
                      <h3 style={{ margin: '0 0 10px 0', color: 'var(--fifa-gold)', fontFamily: 'Oswald', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px', fontSize: '1rem' }}>OFFICIAL ENTRY PASS</h3>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', zIndex: 2 }}><StylizedQRCode gradient={ticket.qrGradient} /></div>
                      <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '12px', display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px', zIndex: 2 }}>
                        <div style={{ flex: '1 1 40%' }}><p style={{ color: 'var(--text-muted)', fontSize: '0.6rem', margin: 0, fontWeight: 'bold' }}>STADIUM</p><p style={{ color: 'white', fontSize: '0.75rem', margin: 0, fontWeight: 'bold', fontFamily: 'Oswald' }}>{ticket.stadium}</p></div>
                        <div style={{ flex: '1 1 40%' }}><p style={{ color: 'var(--text-muted)', fontSize: '0.6rem', margin: 0, fontWeight: 'bold' }}>{t("GATE")}</p><p style={{ color: 'white', fontSize: '0.75rem', margin: 0, fontWeight: 'bold', fontFamily: 'Oswald' }}>{ticket.gate}</p></div>
                        <div style={{ flex: '1 1 40%' }}><p style={{ color: 'var(--text-muted)', fontSize: '0.6rem', margin: 0, fontWeight: 'bold' }}>{t("BLOCK")} / ALLEY</p><p style={{ color: 'var(--fifa-gold)', fontSize: '0.75rem', margin: 0, fontWeight: 'bold', fontFamily: 'Oswald' }}>{ticket.sectionCode} (A-{ticket.alley})</p></div>
                        <div style={{ flex: '1 1 40%' }}><p style={{ color: 'var(--text-muted)', fontSize: '0.6rem', margin: 0, fontWeight: 'bold' }}>ROW / {t("SEAT")}</p><p style={{ color: 'white', fontSize: '0.75rem', margin: 0, fontWeight: 'bold', fontFamily: 'Oswald' }}>{ticket.row} / {ticket.seat}</p></div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.8, gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '15px', width: '100%', justifyContent: 'center' }}>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.55rem', fontWeight: 'bold' }}>TICKET ID</p>
                            <p style={{ margin: 0, color: 'white', fontSize: '0.8rem', fontFamily: 'Oswald', letterSpacing: '1px' }}>FWC-{ticket.id * 1000 + 4028}</p>
                          </div>
                          <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.55rem', fontWeight: 'bold' }}>PURCHASER</p>
                            <p style={{ margin: 0, color: 'white', fontSize: '0.8rem', fontFamily: 'Oswald', letterSpacing: '1px' }}>AKASH V.</p>
                          </div>
                        </div>
                        <div style={{ width: '80%', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '5px 0' }} />
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.55rem', textAlign: 'center', padding: '0 10px' }}>This digital pass is protected by blockchain verification. Screenshots will not be accepted at entry points.</p>
                      </div>
                      <div style={{ marginTop: 'auto', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', padding: '8px', display: 'flex', gap: '8px', alignItems: 'flex-start', zIndex: 2 }}>
                        <FaInfoCircle color="#ef4444" style={{ flexShrink: 0, marginTop: '2px', fontSize: '0.8rem' }} />
                        <p style={{ margin: 0, color: '#fca5a5', fontSize: '0.6rem', lineHeight: 1.3 }}><strong>IMPORTANT:</strong> Present this code at the turnstiles. Bags larger than 4.5&quot;x6.5&quot; are prohibited.</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Side: Stadium Navigator (Only shows when flipped) */}
        <AnimatePresence>
          {isFlipped && (
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 50, scale: 0.95 }} transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
              style={{ flex: 1.5, minHeight: isMobile ? '400px' : (isTablet ? '500px' : 'auto'), background: 'rgba(10, 5, 20, 0.4)', backdropFilter: 'blur(30px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.15)', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: 'inset 0 0 20px rgba(255,255,255,0.02)' }}
            >
              <div style={{ padding: '15px 20px', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, color: 'white', fontFamily: 'Oswald', fontSize: '1.2rem' }}>STADIUM NAVIGATOR</h3>
                  <p style={{ margin: '2px 0 0 0', color: 'var(--fifa-gold)', fontSize: '0.75rem' }}><FaMapMarkerAlt /> {activeTicket.stadium}</p>
                </div>
                <div style={{ background: 'rgba(250, 204, 21, 0.2)', color: '#facc15', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  YOUR SEAT: {activeTicket.sectionCode}
                </div>
              </div>

              {/* LIVE CROWD STATUS BANNER */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(0,0,0,0.8)', padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} 
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} 
                />
                <span style={{ color: 'white', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px' }}>LIVE CROWD TRACKER:</span>
                <span style={{ color: activeTicket.crowdColor, fontSize: '0.75rem', fontWeight: 'bold', background: `${activeTicket.crowdColor}33`, padding: '2px 8px', borderRadius: '10px' }}>
                  {activeTicket.crowdDensity} AT GATE {activeTicket.gate}
                </span>
              </div>

              <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 0, overflow: 'hidden' }}>
                <svg viewBox="0 0 800 600" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <pattern id="grass" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="10" height="20" fill="#065f46" /><rect x="10" width="10" height="20" fill="#047857" /></pattern>
                    <pattern id="seats" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1" height="5" fill="rgba(0,0,0,0.3)" /></pattern>
                    <radialGradient id="light" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" /><stop offset="100%" stopColor="rgba(255, 255, 255, 0)" /></radialGradient>
                  </defs>

                  <rect x="50" y="20" width="700" height="560" rx={activeTicket.stadiumType === "BOWL" ? 280 : 150} fill="#111827" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                  <rect x="80" y="50" width="640" height="500" rx={activeTicket.stadiumType === "BOWL" ? 250 : 100} fill="#0a0514" stroke="rgba(0,0,0,0.5)" strokeWidth="10" />

                  <circle cx="120" cy="90" r="80" fill="url(#light)" /><circle cx="680" cy="90" r="80" fill="url(#light)" />
                  <circle cx="120" cy="510" r="80" fill="url(#light)" /><circle cx="680" cy="510" r="80" fill="url(#light)" />

                  <rect x="270" y="225" width="260" height="150" fill="url(#grass)" stroke="#ffffff" strokeWidth="3" rx="5" />
                  <circle cx="400" cy="300" r="20" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" /><circle cx="400" cy="300" r="3" fill="#ffffff" opacity="0.8" />
                  <line x1="400" y1="225" x2="400" y2="375" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
                  <rect x="270" y="260" width="45" height="80" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" /><rect x="485" y="260" width="45" height="80" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" />

                  {layout.blocks.map(sec => {
                    const isTarget = sec.id === (interactiveSection || targetSection);
                    return (
                    <motion.g key={sec.id} whileHover={{ scale: 1.05 }} style={{ cursor: 'pointer', transformOrigin: `${sec.x + sec.width/2}px ${sec.y + sec.height/2}px` }} onClick={() => setInteractiveSection(sec.id)}>
                      <rect x={sec.x} y={sec.y} width={sec.width} height={sec.height} transform={sec.transform} fill={getMapFillColor(sec.id)} stroke={isTarget ? "#facc15" : "rgba(255,255,255,0.15)"} strokeWidth={isTarget ? "3" : "1"} rx="4" />
                      {isTarget && <motion.rect initial={{ opacity: 1 }} animate={{ opacity: 0.2 }} transition={{ repeat: Infinity, duration: 1 }} x={sec.x} y={sec.y} width={sec.width} height={sec.height} transform={sec.transform} fill="#facc15" rx="4" />}
                      <rect x={sec.x} y={sec.y} width={sec.width} height={sec.height} transform={sec.transform} fill="url(#seats)" rx="4" style={{ pointerEvents: 'none' }} />
                    </motion.g>
                  )})}
                  {layout.corners.map(c => {
                    const isTarget = c.id === (interactiveSection || targetSection);
                    return (
                    <motion.g key={c.id} whileHover={{ scale: 1.05 }} style={{ cursor: 'pointer' }} onClick={() => setInteractiveSection(c.id)}>
                      <polygon points={c.points} transform={c.transform} fill={getMapFillColor(c.id)} stroke={isTarget ? "#facc15" : "rgba(255,255,255,0.15)"} strokeWidth={isTarget ? "3" : "1"} />
                      {isTarget && <motion.polygon initial={{ opacity: 1 }} animate={{ opacity: 0.2 }} transition={{ repeat: Infinity, duration: 1 }} points={c.points} transform={c.transform} fill="#facc15" />}
                      <polygon points={c.points} transform={c.transform} fill="url(#seats)" style={{ pointerEvents: 'none' }} />
                    </motion.g>
                  )})}
                  
                  {/* Target Crosshair Pointer on the Map */}
                  {targetGeometry && (
                    <g transform={targetGeometry.transform} style={{ filter: 'drop-shadow(0 0 10px #ef4444)' }}>
                      <motion.circle 
                        initial={{ r: 0, opacity: 1 }} 
                        animate={{ r: 12, opacity: 0 }} 
                        transition={{ repeat: Infinity, duration: 1.5 }} 
                        cx={targetGeometry.cx} cy={targetGeometry.cy} fill="#ef4444" 
                      />
                      <circle cx={targetGeometry.cx} cy={targetGeometry.cy} r="4" fill="#ef4444" stroke="white" strokeWidth="1.5" />
                    </g>
                  )}
                </svg>

                {/* Floating Action Buttons */}
                <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 10 }}>
                  <div style={{ position: 'relative' }}>
                    <AnimatePresence>
                      {hoveredBtn === 'view' && (
                        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} style={{ position: 'absolute', right: '100%', marginRight: '15px', top: '50%', transform: 'translateY(-50%)', background: 'white', color: 'black', padding: '8px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', fontFamily: 'Oswald', letterSpacing: '1px', whiteSpace: 'nowrap', boxShadow: '0 4px 15px rgba(0,0,0,0.4)' }}>
                          VIEW FROM SEAT
                          <div style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)', width: '10px', height: '10px', background: 'white' }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button onMouseEnter={() => setHoveredBtn('view')} onMouseLeave={() => setHoveredBtn(null)} onClick={() => setShowSeatView(true)} style={{ width: '50px', height: '50px', borderRadius: '50%', padding: 0, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(15px)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.1)'}>
                      <motion.div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }} animate={{ scale: hoveredBtn === 'view' ? 1.2 : 1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <FaEye size={20} />
                      </motion.div>
                    </button>
                  </div>
                  
                  <div style={{ position: 'relative' }}>
                    <AnimatePresence>
                      {hoveredBtn === 'ar' && (
                        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} style={{ position: 'absolute', right: '100%', marginRight: '15px', top: '50%', transform: 'translateY(-50%)', background: 'white', color: 'black', padding: '8px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', fontFamily: 'Oswald', letterSpacing: '1px', whiteSpace: 'nowrap', boxShadow: '0 4px 15px rgba(0,0,0,0.4)' }}>
                          AI AR NAVIGATOR
                          <div style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)', width: '10px', height: '10px', background: 'white' }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button onMouseEnter={() => setHoveredBtn('ar')} onMouseLeave={() => setHoveredBtn(null)} onClick={() => { setShowARNav(true); setArPhase("init"); setTimeout(() => setArPhase("scanning"), 500); setTimeout(() => setArPhase("navigating"), 3000); }} style={{ width: '50px', height: '50px', borderRadius: '50%', padding: 0, background: 'linear-gradient(135deg, #10b981, #059669)', border: '1px solid rgba(16, 185, 129, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.5)' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.1)'}>
                      <motion.div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }} animate={{ scale: hoveredBtn === 'ar' ? 1.2 : 1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <FaRoute size={20} />
                      </motion.div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Wayfinding Instructions with Live Routing */}
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 15px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(74, 222, 128, 0.2)', padding: '8px', borderRadius: '50%' }}>
                    <FaWalking color="#4ade80" size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, color: 'white', fontFamily: 'Oswald', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                      SMART ROUTING TO SEAT {activeTicket.seat}
                      {activeTicket.crowdDensity === "HIGH" && <span style={{ background: '#b91c1c', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.55rem' }}>REROUTED</span>}
                    </h4>
                    <p style={{ margin: '3px 0 0 0', color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1.4 }}>
                      {activeTicket.crowdDensity === "HIGH" 
                        ? `Gate ${activeTicket.gate} is currently congested. We recommend entering through alternative Gate ${activeTicket.altGate}. `
                        : `Proceed to Gate ${activeTicket.gate}. `
                      }
                      Once inside, follow the gold overhead signage to the <strong>{activeTicket.gallery}</strong>. Take the stairs down Alley <strong>{activeTicket.alley}</strong> to Row <strong>{activeTicket.row}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* VIEW FROM SEAT MODAL */}
      <AnimatePresence>
        {showSeatView && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}>
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} style={{ position: 'relative', width: '90%', maxWidth: '1000px', height: '70vh', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 25px 50px rgba(0,0,0,0.8)' }}>
              <button onClick={() => setShowSeatView(false)} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(5px)', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.6)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}><FaTimes /></button>
              
              <AnimatePresence mode="wait">
                <motion.img 
                  key={seatViewAngleIdx}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={SEAT_VIEW_ANGLES[seatViewAngleIdx]} 
                  alt="View from Seat" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, filter: 'contrast(1.15) brightness(1.05) saturate(1.2)' }} 
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button onClick={() => setSeatViewAngleIdx((prev) => (prev > 0 ? prev - 1 : SEAT_VIEW_ANGLES.length - 1))} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(5px)', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}><FaChevronLeft size={24} /></button>
              <button onClick={() => setSeatViewAngleIdx((prev) => (prev + 1) % SEAT_VIEW_ANGLES.length)} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(5px)', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}><FaChevronRight size={24} /></button>
              
              {/* Image Indicators */}
              <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.5)', padding: '8px 12px', borderRadius: '20px', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {SEAT_VIEW_ANGLES.map((_, idx) => (
                  <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx === seatViewAngleIdx ? 'var(--fifa-gold)' : 'rgba(255,255,255,0.3)', transition: 'all 0.3s' }} />
                ))}
              </div>

              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '40px 30px 30px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', zIndex: 5 }}>
                <div>
                  <h2 style={{ margin: 0, color: 'white', fontFamily: 'Oswald', fontSize: 'clamp(1.2rem, 4.5vw, 2rem)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>SECTION {interactiveSection || targetSection}</h2>
                  <p style={{ margin: 0, color: 'var(--fifa-gold)', fontSize: '1.2rem', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{activeTicket.stadium}</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '10px 20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                  <p style={{ margin: 0, color: 'white', fontSize: '0.8rem' }}>ROW <strong style={{ color: 'var(--fifa-gold)' }}>{activeTicket.row}</strong></p>
                  <p style={{ margin: 0, color: 'white', fontSize: '0.8rem' }}>SEAT <strong style={{ color: 'var(--fifa-gold)' }}>{activeTicket.seat}</strong></p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* AR NAVIGATION MODAL */}
      <AnimatePresence>
        {showARNav && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'black', overflow: 'hidden' }}>
            
            {/* Background Simulated Camera Feed */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop" alt="Concourse Camera" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: arPhase === "scanning" ? 'blur(8px) brightness(0.5)' : 'blur(2px) brightness(0.8)', transition: 'all 1s ease' }} />
            </div>

            {/* Scanning Grid & UI */}
            {arPhase === "scanning" && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
                <motion.div initial={{ y: -300, opacity: 0 }} animate={{ y: 300, opacity: [0, 1, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} style={{ width: '100%', height: '4px', background: '#10b981', boxShadow: '0 0 20px 5px rgba(16, 185, 129, 0.5)' }} />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-emerald-400 font-mono text-xl text-center" style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.8)' }}>
                  <FaRobot size={40} className="mx-auto mb-4" />
                  ANALYZING CROWD DENSITY...<br/>
                  CALCULATING OPTIMAL ROUTE...
                </motion.div>
                
                {/* HUD Elements */}
                <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} xmlns="http://www.w3.org/2000/svg">
                   <rect x="10%" y="10%" width="80%" height="80%" fill="none" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" strokeDasharray="20 10" />
                   <path d="M 50 50 L 100 50 L 100 100" fill="none" stroke="#10b981" strokeWidth="4" />
                   <path d="M 50 950 L 100 950 L 100 900" fill="none" stroke="#10b981" strokeWidth="4" transform="translate(0, -350)" />
                   <path d="M 1870 50 L 1820 50 L 1820 100" fill="none" stroke="#10b981" strokeWidth="4" transform="translate(-870, 0)" />
                   <path d="M 1870 950 L 1820 950 L 1820 900" fill="none" stroke="#10b981" strokeWidth="4" transform="translate(-870, -350)" />
                </svg>
              </div>
            )}

            {/* Navigation UI */}
            {arPhase === "navigating" && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
                
                {/* Holographic Arrows */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', perspective: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
                  <motion.div animate={{ y: [0, -20, 0], scale: [1, 1.1, 1], rotateX: 60 }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ color: '#10b981', filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 1))' }}>
                    <FaLocation size={150} />
                  </motion.div>
                  <motion.div animate={{ y: [0, -20, 0], scale: [0.8, 0.9, 0.8], rotateX: 60, opacity: 0.5 }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} style={{ color: '#10b981', filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 1))' }}>
                    <FaLocation size={100} />
                  </motion.div>
                  <motion.div animate={{ y: [0, -20, 0], scale: [0.6, 0.7, 0.6], rotateX: 60, opacity: 0.2 }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} style={{ color: '#10b981', filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 1))' }}>
                    <FaLocation size={80} />
                  </motion.div>
                </div>

                {/* Distance Marker */}
                <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(16, 185, 129, 0.2)', backdropFilter: 'blur(5px)', border: '1px solid #10b981', padding: '10px 20px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
                  <FaWalking color="white" />
                  <span style={{ color: 'white', fontFamily: 'Oswald', fontSize: '1.5rem', fontWeight: 'bold' }}>120m</span>
                  <span style={{ color: '#a7f3d0', fontSize: '0.9rem' }}>TO SECTION {activeTicket.sectionCode}</span>
                </div>

                {/* Mini Map */}
                <div style={{ position: 'absolute', bottom: '120px', right: '30px', width: '150px', height: '150px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                   <div style={{ width: '80%', height: '80%', border: '1px dashed rgba(255,255,255,0.3)', borderRadius: '50%', position: 'relative' }}>
                      {/* User dot */}
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '12px', height: '12px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }} />
                      {/* Target dot */}
                      <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', background: '#facc15', borderRadius: '50%', boxShadow: '0 0 10px #facc15' }} />
                      {/* Path line */}
                      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                        <path d="M 60 90 Q 40 50 60 25" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
                      </svg>
                   </div>
                </div>

                {/* AI Copilot Guidance */}
                <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px', background: 'rgba(15, 10, 30, 0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '20px', padding: '15px 25px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.5)' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <FaRobot color="white" size={24} />
                    </div>
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', inset: -5, border: '2px solid #10b981', borderRadius: '50%' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, color: '#10b981', fontFamily: 'Oswald', fontSize: '1.1rem', letterSpacing: '1px' }}>AI COPILOT</h4>
                    <p style={{ margin: '5px 0 0 0', color: 'white', fontSize: '1rem', lineHeight: 1.4 }}>
                      Continue straight for 50 meters, then turn right at the concession stand. We are avoiding the main concourse due to heavy crowds.
                    </p>
                  </div>
                  <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', width: '45px', height: '45px', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}><FaMicrophone size={18} /></button>
                </div>
              </div>
            )}

            {/* Close Button */}
            <button onClick={() => setShowARNav(false)} style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 10, background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'all 0.2s', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}>
              <FaTimes size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
