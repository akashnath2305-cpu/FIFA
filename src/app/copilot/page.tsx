"use client";

import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaUserAlt, FaMagic } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export default function CopilotPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "ai",
      text: t("Hello! I am your AI Copilot for stadium operations. You can ask me about emergency protocols, wayfinding for accessibility, live crowd data, and more. How can I assist you today?")
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    t("Fastest accessible route to VIP Lounge C for a wheelchair user?"),
    t("Protocol for medical emergency in Section 104?"),
    t("Is the roof open? What about the rain?"),
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      
      const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: "ai", text: data.reply || "Error generating response." };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: "ai", text: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  // Very basic markdown parsing for bold and newlines
  const formatText = (text: string) => {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\n/g, '<br/>');
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px', flexWrap: 'wrap' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--fifa-gold)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px var(--fifa-gold-glow)' }}>
          <FaRobot size={24} color="var(--fifa-gold)" />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 'clamp(1.1rem, 4vw, 1.8rem)', color: 'white', fontFamily: 'Oswald', textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
            {t("OPERATIONS AI COPILOT")}
          </h1>
          <p style={{ margin: 0, color: 'var(--fifa-gold)', letterSpacing: '1px', fontSize: '0.9rem' }}>
            {t("GEN-AI PROTOCOL ASSISTANT")}
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0' }}>
        
        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map(msg => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              style={{ 
                display: 'flex', 
                gap: '15px', 
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                maxWidth: '85%'
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: msg.sender === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(212,175,55,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, border: msg.sender === 'user' ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--fifa-gold)' }}>
                {msg.sender === 'user' ? <FaUserAlt color="white" /> : <FaRobot color="var(--fifa-gold)" />}
              </div>
              
              <div style={{ 
                background: msg.sender === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.6)', 
                padding: '15px 20px', 
                borderRadius: '15px', 
                borderTopRightRadius: msg.sender === 'user' ? 0 : '15px',
                borderTopLeftRadius: msg.sender === 'user' ? '15px' : 0,
                color: 'white',
                lineHeight: '1.6',
                fontSize: '1rem',
                border: msg.sender === 'ai' ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                {formatText(msg.text)}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '15px', alignSelf: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212,175,55,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--fifa-gold)' }}>
                <FaRobot color="var(--fifa-gold)" />
              </div>
              <div style={{ background: 'rgba(0,0,0,0.6)', padding: '15px 20px', borderRadius: '15px', borderTopLeftRadius: 0, border: '1px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '8px', height: '8px', background: 'var(--fifa-gold)', borderRadius: '50%' }} />
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: '8px', height: '8px', background: 'var(--fifa-gold)', borderRadius: '50%' }} />
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: '8px', height: '8px', background: 'var(--fifa-gold)', borderRadius: '50%' }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div style={{ padding: '0 20px 10px 20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => handleSend(s)}
              disabled={loading}
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: 'var(--text-muted)', 
                padding: '8px 15px', 
                borderRadius: '20px',
                fontSize: '0.85rem',
                cursor: loading ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; } }}
              onMouseLeave={(e) => { if (!loading) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-muted)'; } }}
            >
              <FaMagic color="var(--fifa-gold)" /> {s}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            style={{ display: 'flex', gap: '15px' }}
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("Ask the AI Copilot...")}
              disabled={loading}
              style={{ 
                flex: 1, 
                background: 'rgba(0,0,0,0.5)', 
                border: '1px solid rgba(255,255,255,0.2)', 
                padding: '15px 20px', 
                color: 'white', 
                borderRadius: '30px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button 
              type="submit"
              disabled={loading || !input.trim()}
              style={{ 
                width: '55px', 
                height: '55px', 
                borderRadius: '50%', 
                background: input.trim() && !loading ? 'linear-gradient(135deg, var(--fifa-gold), #8C6A1C)' : 'rgba(255,255,255,0.1)', 
                border: 'none', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                cursor: input.trim() && !loading ? 'pointer' : 'default',
                transition: 'all 0.3s'
              }}
            >
              <FaPaperPlane color={input.trim() && !loading ? "black" : "rgba(255,255,255,0.3)"} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
