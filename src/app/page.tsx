"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlay, FaChevronRight, FaSearch, FaGlobeAmericas, FaFutbol, FaTimes, FaMap, FaVideo, FaChartBar, FaShieldAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";
import LiveScorecard from "@/components/LiveScorecard";
import dynamic from "next/dynamic";

const StadiumModal = dynamic(() => import("@/components/Modals/StadiumModal"), { ssr: false });
const MatchCenterModal = dynamic(() => import("@/components/Modals/MatchCenterModal"), { ssr: false });

export default function Home() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 365, hrs: 23, mins: 45, secs: 12 });
  const [isStadiumModalOpen, setIsStadiumModalOpen] = useState(false);
  const [isMatchCenterModalOpen, setIsMatchCenterModalOpen] = useState(false);

  // Simple countdown ticker simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hrs, mins, secs } = prev;
        if (secs > 0) secs--;
        else {
          secs = 59;
          if (mins > 0) mins--;
          else {
            mins = 59;
            if (hrs > 0) hrs--;
            else { hrs = 23; days--; }
          }
        }
        return { days, hrs, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col h-full w-full">

      {/* Top Navigation Bar */}
      <header className="flex items-center justify-end mb-[40px] relative shrink-0">
        {/* Left Side: Brand Logo (Fixed to align with Sidebar) */}
        <div className="fixed top-[30px] left-[30px] flex items-center gap-3 z-[100]">
          <div className="w-[52px] h-[52px] rounded-full overflow-hidden flex justify-center items-center shadow-[0_0_15px_rgba(255,223,0,0.5)] relative">
            <Image src="/logo-flame.avif" alt="Flame Logo" fill sizes="100vw" className="object-cover scale-150" priority />
          </div>
          <div>
            <h1 
              className="m-0 font-oswald italic text-[clamp(1rem,3.5vw,1.5rem)] font-black tracking-[4px] text-[#FFDF00] uppercase"
              style={{ textShadow: '0 0 10px rgba(255, 223, 0, 0.8), 0 0 20px rgba(255, 223, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.4)' }}
            >
              FIFA FEVER
            </h1>
          </div>
        </div>

        {/* Right Side: Tools */}
        <div className="flex items-center gap-5">
          <LanguageSwitcher />

          <div className="flex gap-2.5">
            <Link href="/login" className="no-underline">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)' }}
                whileTap={{ scale: 0.95 }}
                className="px-[18px] py-[6px] text-[0.8rem] font-bold rounded-[50px] border-none bg-gradient-to-br from-[#FFDF00] to-[#D4AF37] text-black cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.4)] font-oswald tracking-[1px]"
              >
                {t("PORTAL")}
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Content */}
      <div className="flex flex-1 relative flex-wrap gap-[30px]">

        {/* Left Side: Giant Typography */}
        <div className="flex-1 min-w-[300px] flex flex-col justify-center items-center text-center z-10">
          <p 
            className="font-oswald tracking-[4px] text-[1rem] font-semibold mb-[15px]"
            style={{ 
              background: 'linear-gradient(90deg, #FFDF00, #D4AF37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'
            }}
          >
            {t("BEYOND BORDERS. BEYOND LIMITS.")}
          </p>
          <div className="relative w-[280px] h-[280px] mb-[30px] rounded-[35px] overflow-hidden shadow-[0_10px_40px_rgba(212,175,55,0.3),inset_0_0_20px_rgba(212,175,55,0.2)] border border-[#d4af3733]">
            <Image src="/logo_26.jpg" alt="FIFA 26 Logo" fill sizes="100vw" className="object-cover scale-110" priority />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-[15px]">
              <h2 className="text-[clamp(1.2rem,4.5vw,2rem)] m-0 text-center leading-none text-white font-extrabold tracking-[1px] drop-shadow-[0_5px_25px_rgba(0,0,0,1)]">
                {t("FIFA WORLD CUP")}
              </h2>
              <span 
                className="text-[clamp(1.6rem,6vw,2.8rem)] inline-block mt-[5px] font-black"
                style={{
                  background: 'linear-gradient(135deg, #FFDF00 20%, #FDF5A9 50%, #8C6A1C 80%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 5px 15px rgba(0,0,0,1)) drop-shadow(0 2px 5px rgba(0,0,0,1)) drop-shadow(0 0 30px rgba(255, 223, 0, 0.8))'
                }}
              >
                2026
              </span>
            </div>
          </div>

          <motion.button
            onClick={() => setIsStadiumModalOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(212, 175, 55, 0.8)' }}
            whileTap={{ scale: 0.95 }}
            className="w-[280px] py-[15px] text-[1rem] font-bold rounded-[40px] border border-white/40 bg-gradient-to-br from-[#FFDF00] via-[#D4AF37] to-[#8C6A1C] text-black cursor-pointer flex justify-center items-center gap-[10px] shadow-[0_8px_15px_rgba(212,175,55,0.4)] font-oswald tracking-[1px]"
          >
            {t("ENTER THE STADIUM")} <FaFutbol size={16} />
          </motion.button>
        </div>

        {/* Right Side: Live Scorecard Extracted */}
        <LiveScorecard onOpenMatchCenter={() => setIsMatchCenterModalOpen(true)} />

      </div>

      {/* Netflix TV Style Bottom Rows (Cards) */}
      <div className="mt-[20px] z-10">
        <div className="horizontal-scroll flex gap-[15px] w-full overflow-x-hidden">

          <Link href="/ticket" className="no-underline flex-1 min-w-0">
            <motion.div whileHover={{ scale: 1.05 }} className="glass-panel w-full h-[75px] flex items-center px-3 py-2.5 gap-2.5 relative overflow-hidden">
              <div className="text-[clamp(1rem,3.5vw,1.5rem)]">🎫</div>
              <div className="overflow-hidden">
                <h3 className="text-white m-0 text-[0.9rem] whitespace-nowrap overflow-hidden text-ellipsis">{t("LIVING TICKET")}</h3>
                <p className="text-[#D4AF37] text-[0.7rem] m-[2px_0_0_0] flex items-center gap-1">{t("AI Concierge")} <FaChevronRight size={8} /></p>
              </div>
            </motion.div>
          </Link>

          <Link href="/navigator" className="no-underline flex-1 min-w-0">
            <motion.div whileHover={{ scale: 1.05 }} className="glass-panel w-full h-[75px] flex items-center px-3 py-2.5 gap-2.5 overflow-hidden">
              <div className="text-[clamp(1rem,3.5vw,1.5rem)]">🏟️</div>
              <div className="overflow-hidden">
                <h3 className="text-white m-0 text-[0.9rem] whitespace-nowrap overflow-hidden text-ellipsis">{t("AR NAVIGATOR")}</h3>
                <p className="text-gray-400 text-[0.7rem] m-[2px_0_0_0] flex items-center gap-1">{t("Find your seat")} <FaChevronRight size={8} /></p>
              </div>
            </motion.div>
          </Link>

          <Link href="/nexus" className="no-underline flex-1 min-w-0">
            <motion.div whileHover={{ scale: 1.05 }} className="glass-panel w-full h-[75px] flex items-center px-3 py-2.5 gap-2.5 overflow-hidden">
              <div className="text-[clamp(1rem,3.5vw,1.5rem)]">🌍</div>
              <div className="overflow-hidden">
                <h3 className="text-white m-0 text-[0.9rem] whitespace-nowrap overflow-hidden text-ellipsis">{t("GLOBAL NEXUS")}</h3>
                <p className="text-gray-400 text-[0.7rem] m-[2px_0_0_0] flex items-center gap-1">{t("Live Chat")} <FaChevronRight size={8} /></p>
              </div>
            </motion.div>
          </Link>

          <Link href="/vibemap" className="no-underline flex-1 min-w-0">
            <motion.div whileHover={{ scale: 1.05 }} className="glass-panel w-full h-[75px] flex items-center px-3 py-2.5 gap-2.5 overflow-hidden">
              <div className="text-[clamp(1rem,3.5vw,1.5rem)]">🔥</div>
              <div className="overflow-hidden">
                <h3 className="text-white m-0 text-[0.9rem] whitespace-nowrap overflow-hidden text-ellipsis">{t("VIBE MAP")}</h3>
                <p className="text-gray-400 text-[0.7rem] m-[2px_0_0_0] flex items-center gap-1">{t("City Sentiment")} <FaChevronRight size={8} /></p>
              </div>
            </motion.div>
          </Link>

          <Link href="/fancards" className="no-underline flex-1 min-w-0">
            <motion.div whileHover={{ scale: 1.05 }} className="glass-panel w-full h-[75px] flex items-center px-3 py-2.5 gap-2.5 overflow-hidden">
              <div className="text-[clamp(1rem,3.5vw,1.5rem)]">🃏</div>
              <div className="overflow-hidden">
                <h3 className="text-white m-0 text-[0.9rem] whitespace-nowrap overflow-hidden text-ellipsis">{t("FAN CARDS")}</h3>
                <p className="text-gray-400 text-[0.7rem] m-[2px_0_0_0] flex items-center gap-1">{t("Trivia & Polls")} <FaChevronRight size={8} /></p>
              </div>
            </motion.div>
          </Link>

        </div>
      </div>

      <AnimatePresence>
        {isStadiumModalOpen && <StadiumModal isOpen={isStadiumModalOpen} onClose={() => setIsStadiumModalOpen(false)} />}
      </AnimatePresence>

      {/* MATCH CENTER MODAL */}
      <AnimatePresence>
        {isMatchCenterModalOpen && <MatchCenterModal isOpen={isMatchCenterModalOpen} onClose={() => setIsMatchCenterModalOpen(false)} />}
      </AnimatePresence>

    </main>
  );
}
