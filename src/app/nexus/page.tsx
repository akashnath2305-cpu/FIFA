"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaBolt, FaExclamationTriangle, FaUsers, FaCheckCircle, FaServer, FaCodeBranch } from "react-icons/fa";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

// --- Mock Scenarios ---
const SCENARIOS = [
  {
    id: "crowd",
    label: "Reroute Gate 4B Crowd",
    prompt: "Gate 4B is reaching critical density. Reroute incoming traffic to Gate 4C and deploy additional staff.",
    aiResponse: "Understood. Executing crowd management protocol. \n1. Activating digital signage to redirect incoming fan flow to Gate 4C. \n2. Dispatching 5 available volunteers to Gate 4B to assist with overflow. \n3. Adjusting turnstile processing speed. \nTelemetry map updated.",
    newState: { type: "CROWD_REROUTE" }
  },
  {
    id: "power",
    label: "Optimize Power Grid",
    prompt: "Initiate eco-mode for the North Quarter to reduce carbon footprint for the next hour without impacting the fan experience.",
    aiResponse: "Analyzing power draw... Initiating Eco-Mode. \n1. Dimming non-essential concourse lighting by 15%. \n2. Adjusting HVAC thresholds in VIP lounges by +2 degrees. \n3. Power grid stabilized. Estimated savings: 450 kWh.",
    newState: { type: "ECO_MODE" }
  },
  {
    id: "security",
    label: "Resolve Sector 7 Alert",
    prompt: "Analyze the security alert in Sector 7 and recommend an immediate action plan.",
    aiResponse: "Analyzing camera feeds... A medical incident has been detected in Sector 7. \n1. Dispatching EMT Unit Alpha to the exact location. \n2. Securing a clear path via Alley 12. \n3. Notifying local steward to secure the perimeter. \nIncident logged.",
    newState: { type: "SECURITY_RESOLVE" }
  }
];

// --- AI Typewriter Component ---
const TypewriterText = ({ text, onComplete }: { text: string, onComplete: () => void }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        onComplete();
      }
    }, 20); // Typing speed
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <span style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{displayed}</span>;
};

export default function NexusPage() {
  const { role } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();

  // Route Protection
  useEffect(() => {
    if (role !== "ORGANIZER" && role !== null) {
      router.push("/");
    }
  }, [role, router]);

  const [chatHistory, setChatHistory] = useState<{ role: "user" | "ai", content: string, id: string }[]>([
    { role: "ai", content: "Nexus Central Intelligence online. All stadium telemetry systems are green. Waiting for command.", id: "init" }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [pendingResponse, setPendingResponse] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Stadium State
  const [stadiumMode, setStadiumMode] = useState("NORMAL");
  const [crowdState, setCrowdState] = useState("CRITICAL_4B"); // Normal, CRITICAL_4B, REROUTED
  const [securityState, setSecurityState] = useState("ALERT_SECTOR7"); // ALERT_SECTOR7, RESOLVED

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isAiTyping]);

  const handlePromptClick = (scenario: typeof SCENARIOS[0]) => {
    if (isAiTyping) return;
    
    // 1. Add User Prompt
    setChatHistory(prev => [...prev, { role: "user", content: scenario.prompt, id: Date.now().toString() }]);
    setIsAiTyping(true);
    setPendingResponse(scenario.aiResponse);

    // 2. Simulate delay before AI responds
    setTimeout(() => {
      setIsAiTyping(false);
      
      // Update stadium visual state based on command
      if (scenario.newState.type === "CROWD_REROUTE") setCrowdState("REROUTED");
      if (scenario.newState.type === "ECO_MODE") setStadiumMode("ECO");
      if (scenario.newState.type === "SECURITY_RESOLVE") setSecurityState("RESOLVED");

      // Add AI Response (It will typewrite itself)
      setChatHistory(prev => [...prev, { role: "ai", content: scenario.aiResponse, id: Date.now().toString() }]);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto', height: '100%', gap: '20px', padding: '15px 20px', background: '#050505', color: 'white', borderRadius: '25px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* LEFT PANEL: CONVERSATIONAL COMMAND CENTER */}
      <div style={{ flex: 1, minWidth: '300px', minHeight: '400px', display: 'flex', flexDirection: 'column', background: '#0a0a0a', border: '1px solid #1f2937', borderRadius: '15px', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ padding: '15px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid #1f2937', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)' }}>
            <FaRobot size={20} color="white" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'Oswald', fontSize: '1.2rem', letterSpacing: '1px', color: '#fff' }}>{t("OPERATIONAL NEXUS") || "NEXUS AI"}</h2>
            <p style={{ margin: 0, fontSize: '0.7rem', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>{t("Command Center Interface") || "Command Center Interface"}</p>
          </div>
        </div>

        {/* Chat Feed */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <AnimatePresence initial={false}>
            {chatHistory.map((msg, i) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}
              >
                {msg.role === 'ai' && <div style={{ fontSize: '0.65rem', color: '#9ca3af', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}><FaServer /> {t("SYSTEM")}</div>}
                {msg.role === 'user' && <div style={{ fontSize: '0.65rem', color: '#9ca3af', marginBottom: '5px', textAlign: 'right' }}>{t("COMMANDER")}</div>}
                
                <div style={{ 
                  background: msg.role === 'user' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)', 
                  border: `1px solid ${msg.role === 'user' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                  padding: '12px 16px', borderRadius: '12px', fontSize: '0.85rem', color: msg.role === 'user' ? '#e0e7ff' : '#d1d5db',
                  borderTopRightRadius: msg.role === 'user' ? '0px' : '12px', borderTopLeftRadius: msg.role === 'ai' ? '0px' : '12px'
                }}>
                  {/* Simulate typing for the very last AI message */}
                  {msg.role === 'ai' && i === chatHistory.length - 1 && i !== 0 ? (
                    <TypewriterText text={t(msg.content)} onComplete={() => {}} />
                  ) : (
                    <span style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{t(msg.content)}</span>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isAiTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ alignSelf: 'flex-start', display: 'flex', gap: '5px', padding: '10px' }}>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: '6px', height: '6px', background: '#06b6d4', borderRadius: '50%' }} />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: '6px', height: '6px', background: '#06b6d4', borderRadius: '50%' }} />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: '6px', height: '6px', background: '#06b6d4', borderRadius: '50%' }} />
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Prompt Suggestions Panel */}
        <div style={{ padding: '20px', background: '#111827', borderTop: '1px solid #1f2937' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.7rem', color: '#9ca3af', fontWeight: 'bold' }}>{t("SUGGESTED ACTIONS") || "SUGGESTED ACTIONS"}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SCENARIOS.map((scenario) => {
              // Hide action if it's already been executed
              if (scenario.id === 'crowd' && crowdState === 'REROUTED') return null;
              if (scenario.id === 'power' && stadiumMode === 'ECO') return null;
              if (scenario.id === 'security' && securityState === 'RESOLVED') return null;

              return (
                <button 
                  key={scenario.id} 
                  onClick={() => handlePromptClick(scenario)}
                  disabled={isAiTyping}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 15px', borderRadius: '8px', color: '#e5e7eb', textAlign: 'left', cursor: isAiTyping ? 'not-allowed' : 'pointer', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {scenario.id === 'crowd' && <FaUsers color="#3b82f6" />}
                    {scenario.id === 'power' && <FaBolt color="#facc15" />}
                    {scenario.id === 'security' && <FaExclamationTriangle color="#ef4444" />}
                    <span style={{ fontWeight: 'bold', fontFamily: 'Oswald', letterSpacing: '1px' }}>{t(scenario.label)}</span>
                  </div>
                  <FaCodeBranch color="#4b5563" />
                </button>
              );
            })}
          </div>
        </div>
      </div>


      {/* RIGHT PANEL: GLOBAL TELEMETRY MAP */}
      <div style={{ flex: 1.5, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* HUD Stats Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ flex: 1, minWidth: '150px', background: '#111827', padding: '15px', borderRadius: '12px', border: '1px solid #1f2937' }}>
            <p style={{ margin: 0, fontSize: '0.65rem', color: '#9ca3af', fontWeight: 'bold' }}>{t("POWER DRAW") || "POWER DRAW"}</p>
            <h3 style={{ margin: '5px 0 0 0', fontFamily: 'Oswald', fontSize: '1.5rem', color: stadiumMode === 'ECO' ? '#4ade80' : '#facc15' }}>
              {stadiumMode === 'ECO' ? t('3.2 MW') : t('4.8 MW')}
            </h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.65rem', color: stadiumMode === 'ECO' ? '#4ade80' : '#9ca3af' }}>
              {stadiumMode === 'ECO' ? t('Eco-Mode Active (-33%)') : t('Standard Operations')}
            </p>
          </div>
          <div style={{ flex: 1, minWidth: '150px', background: '#111827', padding: '15px', borderRadius: '12px', border: '1px solid #1f2937' }}>
            <p style={{ margin: 0, fontSize: '0.65rem', color: '#9ca3af', fontWeight: 'bold' }}>{t("CROWD FLOW") || "CROWD FLOW"}</p>
            <h3 style={{ margin: '5px 0 0 0', fontFamily: 'Oswald', fontSize: '1.5rem', color: crowdState === 'CRITICAL_4B' ? '#ef4444' : '#4ade80' }}>
              {crowdState === 'CRITICAL_4B' ? t('BOTTLENECK') : t('OPTIMAL')}
            </h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.65rem', color: '#9ca3af' }}>
              {crowdState === 'CRITICAL_4B' ? t('Critical density at Gate 4B') : t('All gates functioning efficiently')}
            </p>
          </div>
          <div style={{ flex: 1, minWidth: '150px', background: '#111827', padding: '15px', borderRadius: '12px', border: '1px solid #1f2937' }}>
            <p style={{ margin: 0, fontSize: '0.65rem', color: '#9ca3af', fontWeight: 'bold' }}>{t("ACTIVE INCIDENTS") || "ACTIVE INCIDENTS"}</p>
            <h3 style={{ margin: '5px 0 0 0', fontFamily: 'Oswald', fontSize: '1.5rem', color: securityState === 'RESOLVED' ? '#4ade80' : '#ef4444' }}>
              {securityState === 'RESOLVED' ? '0' : '1'}
            </h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.65rem', color: '#9ca3af' }}>
              {securityState === 'RESOLVED' ? t('All clear') : t('Medical alert in Sector 7')}
            </p>
          </div>
        </div>

        {/* Stadium Hologram Map */}
        <div style={{ flex: 1, minHeight: '300px', background: '#0a0a0a', border: '1px solid #1f2937', borderRadius: '15px', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* Cyberpunk Grid Background */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <svg viewBox="0 0 800 600" width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.2))' }}>
            {/* Base Stadium Structure (Octagon) */}
            <rect x="150" y="50" width="500" height="500" rx="150" fill="#000" stroke="#06b6d4" strokeWidth="2" opacity="0.3" />
            
            {/* The Pitch */}
            <rect x="300" y="200" width="200" height="200" rx="10" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />
            <circle cx="400" cy="300" r="30" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />
            <line x1="300" y1="300" x2="500" y2="300" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />

            {/* Simulated Seating Blocks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 400 300)`}>
                <rect x="350" y="70" width="100" height="60" rx="5" fill={stadiumMode === 'ECO' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(6, 182, 212, 0.1)'} stroke={stadiumMode === 'ECO' ? '#4ade80' : '#06b6d4'} strokeWidth="1" />
              </g>
            ))}

            {/* DYNAMIC TELEMETRY OVERLAYS */}
            
            {/* Scenario 1: Crowd Reroute (Gate 4B is Bottom Right - 135 deg block area) */}
            {crowdState === 'CRITICAL_4B' && (
              <g>
                <circle cx="550" cy="450" r="60" fill="rgba(239, 68, 68, 0.4)" filter="blur(15px)" />
                <circle cx="550" cy="450" r="10" fill="#ef4444" />
                <text x="570" y="455" fill="#ef4444" fontSize="14" fontFamily="monospace" fontWeight="bold">{t("GATE 4B: CRITICAL")}</text>
              </g>
            )}

            {crowdState === 'REROUTED' && (
              <g>
                {/* Dissipated Crowd at 4B */}
                <circle cx="550" cy="450" r="30" fill="rgba(74, 222, 128, 0.2)" filter="blur(10px)" />
                <circle cx="550" cy="450" r="8" fill="#4ade80" />
                <text x="570" y="455" fill="#4ade80" fontSize="12" fontFamily="monospace">{t("GATE 4B: CLEAR")}</text>
                
                {/* Reroute Path to Gate 4C (Top Right) */}
                <path d="M 570 470 C 650 450, 650 150, 570 130" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="10,10">
                  <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                </path>
                <circle cx="550" cy="150" r="20" fill="rgba(59, 130, 246, 0.4)" filter="blur(5px)" />
                <text x="570" y="155" fill="#3b82f6" fontSize="12" fontFamily="monospace">{t("GATE 4C: REROUTING ACTIVE")}</text>
              </g>
            )}

            {/* Scenario 3: Security Alert (Sector 7 - Left Side) */}
            {securityState === 'ALERT_SECTOR7' && (
              <g>
                <motion.circle initial={{ r: 10, opacity: 1 }} animate={{ r: 50, opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5 }} cx="200" cy="300" fill="#ef4444" />
                <polygon points="190,310 200,290 210,310" fill="#ef4444" />
                <text x="220" y="305" fill="#ef4444" fontSize="14" fontFamily="monospace" fontWeight="bold">{t("MED-ALERT: SEC-7")}</text>
              </g>
            )}

            {securityState === 'RESOLVED' && (
              <g>
                <circle cx="200" cy="300" r="15" fill="rgba(74, 222, 128, 0.3)" />
                <path d="M 195 300 L 199 305 L 206 295" fill="none" stroke="#4ade80" strokeWidth="3" />
                <text x="220" y="305" fill="#4ade80" fontSize="12" fontFamily="monospace">{t("SEC-7: SECURED & RESOLVED")}</text>
              </g>
            )}

          </svg>

          {/* Map Overlay Text */}
          <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
            <p style={{ margin: 0, color: '#06b6d4', fontSize: '0.8rem', fontFamily: 'monospace', letterSpacing: '2px' }}>{t("METLIFE STADIUM")}</p>
            <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.65rem', fontFamily: 'monospace' }}>{t("TELEMETRY V 2.4.1")}</p>
          </div>
          
        </div>
      </div>

    </div>
  );
}
