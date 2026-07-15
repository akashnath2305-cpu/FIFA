"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useCountdown } from "@/hooks/useCountdown";

// Extracted Components (with their exact inline styles retained)
import TopNav from "@/components/Home/TopNav";
import HeroSection from "@/components/Home/HeroSection";
import FeatureCards from "@/components/Home/FeatureCards";
import LiveScorecardHome from "@/components/Home/LiveScorecardHome";

const StadiumModal = dynamic(() => import("@/components/Modals/StadiumModal"), { ssr: false });
const MatchCenterModal = dynamic(() => import("@/components/Modals/MatchCenterModal"), { ssr: false });

export default function Home() {
  const timeLeft = useCountdown(365, 23, 45, 12);
  const [isStadiumModalOpen, setIsStadiumModalOpen] = useState(false);
  const [isMatchCenterModalOpen, setIsMatchCenterModalOpen] = useState(false);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <TopNav />

      {/* Main Hero Content */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', flexWrap: 'wrap', gap: '30px' }}>
        <HeroSection onEnterStadium={() => setIsStadiumModalOpen(true)} />
        <LiveScorecardHome onOpenMatchCenter={() => setIsMatchCenterModalOpen(true)} />
      </div>

      <FeatureCards />

      {/* MODALS */}
      <AnimatePresence>
        {isStadiumModalOpen && <StadiumModal isOpen={isStadiumModalOpen} onClose={() => setIsStadiumModalOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {isMatchCenterModalOpen && <MatchCenterModal isOpen={isMatchCenterModalOpen} onClose={() => setIsMatchCenterModalOpen(false)} />}
      </AnimatePresence>
    </main>
  );
}
