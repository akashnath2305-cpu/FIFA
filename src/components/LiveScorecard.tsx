"use client";

import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useLanguage } from "@/components/LanguageProvider";

interface LiveScorecardProps {
  onOpenMatchCenter: () => void;
}

export default function LiveScorecard({ onOpenMatchCenter }: LiveScorecardProps) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 min-w-[300px] flex justify-center items-center z-10">
      <div className="glass-panel w-full max-w-[340px] flex flex-col gap-5 rounded-[25px] border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] p-[25px]">
        <h3 className="text-gray-400 text-xs tracking-widest border-b border-white/10 pb-2.5 font-semibold flex justify-between">
          <span>{t("LIVE MATCH")}</span>
          <span className="text-red-400 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> 65'
          </span>
        </h3>

        {/* Live Match Grid */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-2.5">
            <img src="https://flagcdn.com/w80/us.png" alt="USA Flag" className="w-[45px] h-[30px] object-cover rounded shadow-md" />
            <span className="font-oswald text-xl font-semibold text-white">USA</span>
          </div>
          
          <div className="flex gap-[15px] items-center">
            <span className="text-[clamp(1.2rem,4.5vw,2rem)] font-oswald font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">2</span>
            <span className="text-2xl font-oswald text-gray-400">-</span>
            <span className="text-[clamp(1.2rem,4.5vw,2rem)] font-oswald font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">1</span>
          </div>

          <div className="flex flex-col items-center gap-2.5">
            <img src="https://flagcdn.com/w80/mx.png" alt="Mexico Flag" className="w-[45px] h-[30px] object-cover rounded shadow-md" />
            <span className="font-oswald text-xl font-semibold text-white">MEX</span>
          </div>
        </div>

        <h3 className="text-gray-400 text-xs tracking-widest mt-2.5 font-semibold border-b border-white/10 pb-2.5">
          {t("UPCOMING")}
        </h3>
        
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="https://flagcdn.com/w40/ca.png" alt="Canada" className="w-6 rounded-sm" /> 
              <span className="font-oswald text-white text-[1.1rem]">CAN</span>
              <span className="text-gray-400 text-xs mx-1">vs</span>
              <span className="font-oswald text-white text-[1.1rem]">ARG</span> 
              <img src="https://flagcdn.com/w40/ar.png" alt="Argentina" className="w-6 rounded-sm" />
            </div>
            <span className="text-[#D4AF37] text-xs font-bold">20:00</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="https://flagcdn.com/w40/br.png" alt="Brazil" className="w-6 rounded-sm" /> 
              <span className="font-oswald text-white text-[1.1rem]">BRA</span>
              <span className="text-gray-400 text-xs mx-1">vs</span>
              <span className="font-oswald text-white text-[1.1rem]">ENG</span> 
              <img src="https://flagcdn.com/w40/gb-eng.png" alt="England" className="w-6 rounded-sm" />
            </div>
            <span className="text-gray-400 text-xs">{t("Tomorrow")}</span>
          </div>
        </div>

        <button 
          onClick={onOpenMatchCenter}
          className="bg-transparent border border-[#D4AF37]/30 rounded-xl text-[#D4AF37] flex justify-center items-center gap-2.5 font-oswald text-sm tracking-wide p-3 mt-1 cursor-pointer transition-all duration-300 hover:bg-[#D4AF37]/10"
        >
          {t("MATCH CENTER")} <FaChevronRight size={10} />
        </button>
      </div>
    </div>
  );
}
