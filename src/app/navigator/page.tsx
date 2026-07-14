"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInfoCircle, FaMapMarkerAlt, FaMinus, FaPlus, FaChevronRight, FaChevronLeft, FaUsers } from "react-icons/fa";
import { useLanguage } from "@/components/LanguageProvider";

const STADIUMS = [
  {
    id: "atl",
    name: "Atlanta Stadium",
    location: "Atlanta, Georgia, US",
    type: "OCTAGON_ATL",
    matches: 8,
    capacity: "75,000",
    opened: 2017,
    image: "/Screenshot 2026-07-10 131848.png",
    gates: [{ name: "A", traffic: 45 }, { name: "B", traffic: 82 }, { name: "C", traffic: 30 }]
  },
  {
    id: "kc",
    name: "Kansas City Stadium",
    location: "Kansas City, Missouri, US",
    type: "BOWL_KC",
    matches: 6,
    capacity: "73,000",
    opened: 1972,
    image: "/Screenshot 2026-07-10 131856.png",
    gates: [{ name: "N", traffic: 55 }, { name: "S", traffic: 20 }, { name: "E", traffic: 90 }]
  },
  {
    id: "bos",
    name: "Boston Stadium",
    location: "Foxborough, Massachusetts, US",
    type: "U_SHAPE",
    matches: 7,
    capacity: "65,000",
    opened: 2002,
    image: "/Screenshot 2026-07-10 131909.png",
    gates: [{ name: "1", traffic: 65 }, { name: "2", traffic: 40 }, { name: "3", traffic: 75 }]
  },
  {
    id: "mia",
    name: "Miami Stadium",
    location: "Miami Gardens, Florida, US",
    type: "RECTANGLE_MIA",
    matches: 7,
    capacity: "65,000",
    opened: 1987,
    image: "/Screenshot 2026-07-10 131917.png",
    gates: [{ name: "N", traffic: 85 }, { name: "W", traffic: 25 }, { name: "E", traffic: 50 }]
  },
  {
    id: "ny",
    name: "New York New Jersey Stadium",
    location: "East Rutherford, New Jersey, US",
    type: "BOWL_NY",
    matches: 8,
    capacity: "82,500",
    opened: 2010,
    image: "/Screenshot 2026-07-10 131925.png",
    gates: [{ name: "Pepsi", traffic: 70 }, { name: "Verizon", traffic: 95 }, { name: "MetLife", traffic: 40 }]
  },
  {
    id: "sea",
    name: "Seattle Stadium",
    location: "Seattle, Washington, US",
    type: "U_SHAPE",
    matches: 6,
    capacity: "69,000",
    opened: 2002,
    image: "/Screenshot 2026-07-10 131936.png",
    gates: [{ name: "N", traffic: 60 }, { name: "S", traffic: 40 }, { name: "E", traffic: 70 }]
  },
  {
    id: "sf",
    name: "San Francisco Bay Area Stadium",
    location: "Santa Clara, California, US",
    type: "RECTANGLE_MIA",
    matches: 6,
    capacity: "71,000",
    opened: 2014,
    image: "/Screenshot 2026-07-10 131944.png",
    gates: [{ name: "A", traffic: 55 }, { name: "C", traffic: 80 }, { name: "F", traffic: 35 }]
  },
  {
    id: "la",
    name: "Los Angeles Stadium",
    location: "Inglewood, California, US",
    type: "BOWL_NY",
    matches: 8,
    capacity: "70,000",
    opened: 2020,
    image: "/Screenshot 2026-07-10 131952.png",
    gates: [{ name: "VIP", traffic: 20 }, { name: "1", traffic: 85 }, { name: "2", traffic: 90 }]
  },
  {
    id: "hou",
    name: "Houston Stadium",
    location: "Houston, Texas, US",
    type: "RECTANGLE_MIA",
    matches: 7,
    capacity: "72,000",
    opened: 2002,
    image: "/Screenshot 2026-07-10 131959.png",
    gates: [{ name: "Amegy", traffic: 45 }, { name: "Ford", traffic: 65 }, { name: "BHP", traffic: 50 }]
  },
  {
    id: "dal",
    name: "Dallas Stadium",
    location: "Arlington, Texas, US",
    type: "BOWL_NY",
    matches: 9,
    capacity: "94,000",
    opened: 2009,
    image: "/Screenshot 2026-07-10 132007.png",
    gates: [{ name: "Entry A", traffic: 75 }, { name: "Entry K", traffic: 80 }, { name: "Plaza", traffic: 95 }]
  }
];

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

const generateRing = (prefix: string, count: number, radiusX: number, radiusY: number, blockWidth: number, blockHeight: number, skipAngles: [number, number] | null = null) => {
  const sections = [];
  const cx = 400, cy = 300;
  for (let i = 0; i < count; i++) {
    const angle = (i * 360) / count;
    if (skipAngles && (angle >= skipAngles[0] || angle <= skipAngles[1])) continue; // Skip gap
    
    const rad = (angle - 90) * (Math.PI / 180);
    const x = cx + radiusX * Math.cos(rad) - blockWidth/2;
    const y = cy + radiusY * Math.sin(rad) - blockHeight/2;
    
    sections.push({
      id: `${prefix}${i + 1}`,
      x, y, width: blockWidth, height: blockHeight,
      transform: `rotate(${angle} ${x + blockWidth/2} ${y + blockHeight/2})`
    });
  }
  return sections;
};

const getLayout = (type: string) => {
  if (type === "BOWL_KC") {
    return {
      blocks: [
        ...generateRing("100-", 24, 130, 90, 30, 20),
        ...generateRing("200-", 28, 170, 120, 35, 30),
        ...generateRing("300-", 36, 210, 160, 40, 40)
      ],
      corners: []
    };
  }
  
  if (type === "BOWL_NY") {
    return {
      blocks: [
        ...generateRing("100-", 28, 120, 100, 25, 20),
        ...generateRing("200-", 32, 160, 130, 30, 30),
        ...generateRing("300-", 40, 200, 160, 35, 40),
        ...generateRing("400-", 48, 240, 190, 40, 50)
      ],
      corners: []
    };
  }

  if (type === "U_SHAPE") {
    return {
      blocks: [
        ...generateRing("100-", 24, 120, 100, 30, 20, [320, 40]),
        ...generateRing("200-", 28, 160, 130, 35, 30, [325, 35]),
        ...generateRing("300-", 32, 200, 160, 40, 40, [330, 30])
      ],
      corners: []
    };
  }

  if (type === "RECTANGLE_MIA") {
    return {
      blocks: [
        ...generateRow("100N-", 270, 200, 45, 30, 6, true),
        ...generateRow("100S-", 270, 370, 45, 30, 6, true),
        ...generateRow("100W-", 235, 245, 30, 35, 3, false),
        ...generateRow("100E-", 535, 245, 30, 35, 3, false),
        ...generateRow("200N-", 250, 160, 50, 35, 6, true),
        ...generateRow("200S-", 250, 405, 50, 35, 6, true),
        ...generateRow("200W-", 195, 235, 35, 40, 3, false),
        ...generateRow("200E-", 570, 235, 35, 40, 3, false),
        ...generateRow("300N-", 230, 110, 55, 45, 6, true),
        ...generateRow("300S-", 230, 445, 55, 45, 6, true),
        ...generateRow("300W-", 145, 215, 40, 55, 3, false),
        ...generateRow("300E-", 615, 215, 40, 55, 3, false),
      ],
      corners: []
    };
  }

  // OCTAGON_ATL
  return {
    blocks: [
      ...generateRow("100N-", 285, 200, 45, 30, 5, true),
      ...generateRow("100S-", 285, 370, 45, 30, 5, true),
      ...generateRow("100W-", 245, 235, 30, 40, 3, false),
      ...generateRow("100E-", 525, 235, 30, 40, 3, false),
      ...generateRow("200N-", 270, 160, 50, 35, 5, true),
      ...generateRow("200S-", 270, 405, 50, 35, 5, true),
      ...generateRow("200W-", 205, 220, 35, 50, 3, false),
      ...generateRow("200E-", 560, 220, 35, 50, 3, false),
      ...generateRow("300N-", 255, 110, 55, 45, 5, true),
      ...generateRow("300S-", 255, 445, 55, 45, 5, true),
      ...generateRow("300W-", 160, 205, 40, 60, 3, false),
      ...generateRow("300E-", 600, 205, 40, 60, 3, false),
    ],
    corners: [
      { id: "C1", points: "240,200 280,200 280,230 240,230", transform: "rotate(-45 280 230)" },
      { id: "C2", points: "520,200 560,200 560,230 520,230", transform: "rotate(45 520 230)" },
      { id: "C3", points: "240,370 280,370 280,400 240,400", transform: "rotate(45 280 370)" },
      { id: "C4", points: "520,370 560,370 560,400 520,400", transform: "rotate(-45 520 370)" },
      { id: "C5", points: "200,160 265,160 265,195 200,195", transform: "rotate(-45 265 195)" },
      { id: "C6", points: "535,160 600,160 600,195 535,195", transform: "rotate(45 535 195)" },
      { id: "C7", points: "200,405 265,405 265,440 200,440", transform: "rotate(45 265 405)" },
      { id: "C8", points: "535,405 600,405 600,440 535,440", transform: "rotate(-45 535 405)" },
      { id: "C9", points: "155,110 250,110 250,155 155,155", transform: "rotate(-45 250 155)" },
      { id: "C10", points: "550,110 645,110 645,155 550,155", transform: "rotate(45 550 155)" },
      { id: "C11", points: "155,445 250,445 250,490 155,490", transform: "rotate(45 250 445)" },
      { id: "C12", points: "550,445 645,445 645,490 550,490", transform: "rotate(-45 550 445)" },
    ]
  };
};


export default function NavigatorPage() {
  const { t } = useLanguage();
  const [activeStadiumIdx, setActiveStadiumIdx] = useState(0);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  
  const safeIdx = activeStadiumIdx >= STADIUMS.length ? 0 : activeStadiumIdx;
  const activeStadium = STADIUMS[safeIdx];
  const layout = useMemo(() => getLayout(activeStadium.type), [activeStadium.type]);

  const handleNextStadium = () => {
    setActiveStadiumIdx((prev) => (prev + 1) % STADIUMS.length);
    setSelectedSection(null);
    setZoom(1);
  };
  const handlePrevStadium = () => {
    setActiveStadiumIdx((prev) => (prev - 1 + STADIUMS.length) % STADIUMS.length);
    setSelectedSection(null);
    setZoom(1);
  };

  const getCategoryAndColor = (id: string) => {
    // Category 2: Red (#b91c1c)
    if (id.startsWith("200") || id.startsWith("C5") || id.startsWith("C6") || id.startsWith("C7") || id.startsWith("C8")) return { cat: "Category 2", color: "#b91c1c" };
    
    // Category 3: Blue (#1d4ed8)
    if (id.startsWith("300") || id.startsWith("400") || id.startsWith("C9") || id.startsWith("C10") || id.startsWith("C11") || id.startsWith("C12")) return { cat: "Category 3", color: "#1d4ed8" };

    // Category 4: Green (#15803d) for Corners
    if (id.startsWith("C1") || id.startsWith("C2") || id.startsWith("C3") || id.startsWith("C4")) return { cat: "Category 4", color: "#15803d" };
    
    // Remaining are 100s. Determine if Gold (Cat 1) or Green (Cat 4)
    if (id.includes("-")) {
      const parts = id.split('-');
      if (parts[0].endsWith("N") || parts[0].endsWith("S") || parts[0].endsWith("E") || parts[0].endsWith("W")) {
        if (parts[0].endsWith("N") || parts[0].endsWith("S")) return { cat: "Category 4", color: "#15803d" };
        return { cat: "Category 1", color: "#d97706" };
      } else {
        const num = parseInt(parts[1]);
        if (num % 5 === 0 || num % 5 === 1) return { cat: "Category 4", color: "#15803d" };
        return { cat: "Category 1", color: "#d97706" };
      }
    }
    return { cat: "Category 1", color: "#d97706" };
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '20px', position: 'relative', background: '#0a0a0a', overflow: 'hidden', borderRadius: '25px' }}>
      
      {/* Navigation Buttons */}
      <button aria-label="Previous Stadium" onClick={handlePrevStadium} style={{ position: 'absolute', left: '30px', zIndex: 30, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '60px', height: '60px', color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)', transition: 'all 0.2s', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
        <FaChevronLeft size={24} />
      </button>
      <button aria-label="Next Stadium" onClick={handleNextStadium} style={{ position: 'absolute', right: '30px', zIndex: 30, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '60px', height: '60px', color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)', transition: 'all 0.2s', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
        <FaChevronRight size={24} />
      </button>

      {/* Main Divided Card */}
      <AnimatePresence>
        <motion.div 
          key={activeStadium.id}
          initial={{ opacity: 0, x: 40, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -40, scale: 0.98 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ 
            display: 'flex', 
            width: '85%', 
            maxWidth: '1200px',
            height: '90%', 
            background: '#111827', 
            borderRadius: '30px', 
            overflow: 'hidden', 
            zIndex: 10,
            boxShadow: '0 30px 60px rgba(0,0,0,0.9)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {/* LEFT SIDE: Photo & Details */}
          <div style={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <img src={activeStadium.image} alt={activeStadium.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            
            {/* Gradient Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,24,39,1) 0%, rgba(17,24,39,0.8) 40%, rgba(17,24,39,0.3) 100%)' }} />
            
            <div style={{ position: 'relative', zIndex: 2, padding: '40px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ background: 'rgba(212, 175, 55, 0.2)', border: '1px solid var(--fifa-gold)', color: 'var(--fifa-gold)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', width: 'fit-content', marginBottom: '15px', letterSpacing: '1px' }}>
                {t("HOST CITY") || "HOST CITY"}
              </div>
              
              <h2 style={{ color: 'white', fontFamily: 'Oswald', fontSize: 'clamp(1.6rem, 6vw, 2.8rem)', margin: '0 0 10px 0', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                {activeStadium.name.toUpperCase()}
              </h2>
              
              <p style={{ color: '#d1d5db', fontSize: '1.2rem', margin: '0 0 30px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaMapMarkerAlt color="var(--fifa-gold)" /> {activeStadium.location}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '15px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>{t("CAPACITY") || "CAPACITY"}</p>
                  <p style={{ color: 'white', margin: '5px 0 0 0', fontSize: '1.5rem', fontFamily: 'Oswald' }}>{activeStadium.capacity}</p>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '15px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>{t("MATCHES") || "MATCHES"}</p>
                  <p style={{ color: 'white', margin: '5px 0 0 0', fontSize: '1.5rem', fontFamily: 'Oswald' }}>{activeStadium.matches}</p>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '15px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>{t("OPENED") || "OPENED"}</p>
                  <p style={{ color: 'white', margin: '5px 0 0 0', fontSize: '1.5rem', fontFamily: 'Oswald' }}>{activeStadium.opened}</p>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '15px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>{t("GATES") || "GATES"}</p>
                  <p style={{ color: 'white', margin: '5px 0 0 0', fontSize: '1.5rem', fontFamily: 'Oswald' }}>{activeStadium.gates.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: 2D SVG Map */}
          <div style={{ flex: '1.2', background: '#050505', position: 'relative', display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            
            {/* Top Toolbar */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', left: '20px', display: 'flex', justifyContent: 'space-between', zIndex: 20 }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '15px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold', fontFamily: 'Oswald', letterSpacing: '1px' }}>{t("SEAT NAVIGATOR") || "SEAT NAVIGATOR"}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button aria-label="Zoom In" onClick={() => setZoom(z => Math.min(z + 0.2, 2.5))} style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)' }}><FaPlus /></button>
                <button aria-label="Zoom Out" onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)' }}><FaMinus /></button>
              </div>
            </div>

            {/* SVG Map */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <motion.div animate={{ scale: zoom }} transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg viewBox="0 0 800 600" width="100%" height="100%" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.9))' }}>
                  <defs>
                    <pattern id="grassPattern" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="10" height="20" fill="#22c55e" /><rect x="10" width="10" height="20" fill="#16a34a" /></pattern>
                    <pattern id="seatingPattern" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1" height="5" fill="rgba(0,0,0,0.3)" /></pattern>
                    <radialGradient id="lightGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" /><stop offset="100%" stopColor="rgba(255, 255, 255, 0)" /></radialGradient>
                  </defs>

                  <rect x="100" y="50" width="600" height="500" rx={activeStadium.type.includes("BOWL") || activeStadium.type === "U_SHAPE" ? 250 : 50} fill="#111827" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                  <rect x="150" y="100" width="500" height="400" rx={activeStadium.type.includes("BOWL") || activeStadium.type === "U_SHAPE" ? 200 : 20} fill="#0a0514" stroke="rgba(0,0,0,0.5)" strokeWidth="10" />

                  <circle cx="150" cy="150" r="80" fill="url(#lightGlow)" /><circle cx="650" cy="150" r="80" fill="url(#lightGlow)" />
                  <circle cx="150" cy="450" r="80" fill="url(#lightGlow)" /><circle cx="650" cy="450" r="80" fill="url(#lightGlow)" />

                  <rect x="270" y="225" width="260" height="150" fill="url(#grassPattern)" stroke="#ffffff" strokeWidth="3" rx="5" />
                  <circle cx="400" cy="300" r="20" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" /><circle cx="400" cy="300" r="3" fill="#ffffff" opacity="0.8" />
                  <line x1="400" y1="225" x2="400" y2="375" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
                  <rect x="270" y="260" width="45" height="80" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" /><rect x="485" y="260" width="45" height="80" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
                  <rect x="270" y="280" width="15" height="40" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" /><rect x="515" y="280" width="15" height="40" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
                  <path d="M 270 235 A 10 10 0 0 0 280 225" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" /><path d="M 270 365 A 10 10 0 0 1 280 375" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
                  <path d="M 530 225 A 10 10 0 0 0 520 235" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" /><path d="M 530 375 A 10 10 0 0 1 520 365" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" />

                  {layout.blocks.map((sec: any) => {
                    const { cat, color } = getCategoryAndColor(sec.id);
                    const isHovered = hoveredSection === sec.id;
                    const isSelected = selectedSection === sec.id;
                    return (
                    <g key={sec.id}>
                      <rect
                        role="button"
                        tabIndex={0}
                        aria-label={`Section ${sec.id}, ${cat} Tier Seating`}
                        x={sec.x} y={sec.y} width={sec.width} height={sec.height} transform={sec.transform}
                        fill={color} stroke={isSelected ? "white" : "rgba(0,0,0,0.5)"} strokeWidth={isSelected ? "3" : "1"} rx="4"
                        onClick={() => setSelectedSection(sec.id === selectedSection ? null : sec.id)}
                        onMouseEnter={() => setHoveredSection(sec.id)}
                        onMouseLeave={() => setHoveredSection(null)}
                        onFocus={() => setHoveredSection(sec.id)}
                        onBlur={() => setHoveredSection(null)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSection(sec.id === selectedSection ? null : sec.id); } }}
                        style={{ cursor: 'pointer', opacity: (isHovered || isSelected) ? 0.8 : 1 }}
                      />
                      <rect x={sec.x} y={sec.y} width={sec.width} height={sec.height} transform={sec.transform} fill="url(#seatingPattern)" rx="4" style={{ pointerEvents: 'none' }} />
                    </g>
                  )})}

                  {layout.corners.map((c: any) => {
                    const { cat, color } = getCategoryAndColor(c.id);
                    const isHovered = hoveredSection === c.id;
                    const isSelected = selectedSection === c.id;
                    return (
                    <g key={c.id}>
                      <polygon
                        role="button"
                        tabIndex={0}
                        aria-label={`Section ${c.id}, ${cat} Tier Seating`}
                        points={c.points} transform={c.transform}
                        fill={color} stroke={isSelected ? "white" : "rgba(0,0,0,0.5)"} strokeWidth={isSelected ? "3" : "1"}
                        onClick={() => setSelectedSection(c.id === selectedSection ? null : c.id)}
                        onMouseEnter={() => setHoveredSection(c.id)}
                        onMouseLeave={() => setHoveredSection(null)}
                        onFocus={() => setHoveredSection(c.id)}
                        onBlur={() => setHoveredSection(null)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSection(c.id === selectedSection ? null : c.id); } }}
                        style={{ cursor: 'pointer', opacity: (isHovered || isSelected) ? 0.8 : 1 }}
                      />
                      <polygon points={c.points} transform={c.transform} fill="url(#seatingPattern)" style={{ pointerEvents: 'none' }} />
                    </g>
                  )})}
                  
                  {hoveredSection && (
                    <text x="400" y="200" fill="white" fontSize="26" fontFamily="Oswald" textAnchor="middle" style={{ pointerEvents: 'none', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.9))' }}>
                      SEC {hoveredSection.toUpperCase()}
                    </text>
                  )}
                </svg>
              </motion.div>
            </div>

            {/* Selected Section Overlay */}
            <AnimatePresence>
              {selectedSection && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  style={{ 
                    position: 'absolute', bottom: '20px', left: '20px', right: '20px', 
                    background: 'rgba(30, 20, 50, 0.95)', 
                    backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '20px', 
                    border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                    zIndex: 20
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: 0, color: 'var(--fifa-gold)', fontSize: '1.4rem', fontFamily: 'Oswald', letterSpacing: '1px' }}>
                        SECTION {selectedSection.toUpperCase()}
                      </h3>
                      <p style={{ margin: '5px 0 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {getCategoryAndColor(selectedSection).cat} Tier Seating
                      </p>
                    </div>
                    <button style={{ padding: '12px 24px', background: 'var(--fifa-gold)', border: 'none', borderRadius: '12px', color: 'black', fontWeight: 'bold', fontFamily: 'Oswald', letterSpacing: '1px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)' }}>
                      {t("BOOK SEAT") || "BOOK SEAT"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
