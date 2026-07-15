"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function FeatureCards() {
  const { t } = useLanguage();

  return (
    <div style={{ marginTop: '20px', zIndex: 10 }}>
      <div className="horizontal-scroll" style={{ display: 'flex', gap: '15px', width: '100%', overflowX: 'hidden' }}>

        <Link href="/ticket" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }} aria-label={t("Go to Living Ticket AI Concierge")}>
          <motion.div whileHover={{ scale: 1.05 }} className="glass-panel" style={{ width: '100%', height: '75px', display: 'flex', alignItems: 'center', padding: '10px 12px', gap: '10px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)' }} role="img" aria-hidden="true">🎫</div>
            <div style={{ overflow: 'hidden' }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{t("LIVING TICKET")}</h3>
              <p style={{ color: 'var(--fifa-gold)', fontSize: '0.7rem', margin: '2px 0 0 0' }}>{t("AI Concierge")} <FaChevronRight size={8} aria-hidden="true" /></p>
            </div>
          </motion.div>
        </Link>

        <Link href="/navigator" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }} aria-label={t("Open AR Navigator to find your seat")}>
          <motion.div whileHover={{ scale: 1.05 }} className="glass-panel" style={{ width: '100%', height: '75px', display: 'flex', alignItems: 'center', padding: '10px 12px', gap: '10px', overflow: 'hidden' }}>
            <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)' }} role="img" aria-hidden="true">🏟️</div>
            <div style={{ overflow: 'hidden' }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{t("AR NAVIGATOR")}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '2px 0 0 0' }}>{t("Find your seat")} <FaChevronRight size={8} aria-hidden="true" /></p>
            </div>
          </motion.div>
        </Link>

        <Link href="/nexus" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }} aria-label={t("Open Global Nexus live chat")}>
          <motion.div whileHover={{ scale: 1.05 }} className="glass-panel" style={{ width: '100%', height: '75px', display: 'flex', alignItems: 'center', padding: '10px 12px', gap: '10px', overflow: 'hidden' }}>
            <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)' }} role="img" aria-hidden="true">🌍</div>
            <div style={{ overflow: 'hidden' }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{t("GLOBAL NEXUS")}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '2px 0 0 0' }}>{t("Live Chat")} <FaChevronRight size={8} aria-hidden="true" /></p>
            </div>
          </motion.div>
        </Link>

        <Link href="/vibemap" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }} aria-label={t("Open Vibe Map for city sentiment")}>
          <motion.div whileHover={{ scale: 1.05 }} className="glass-panel" style={{ width: '100%', height: '75px', display: 'flex', alignItems: 'center', padding: '10px 12px', gap: '10px', overflow: 'hidden' }}>
            <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)' }} role="img" aria-hidden="true">🔥</div>
            <div style={{ overflow: 'hidden' }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{t("VIBE MAP")}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '2px 0 0 0' }}>{t("City Sentiment")} <FaChevronRight size={8} aria-hidden="true" /></p>
            </div>
          </motion.div>
        </Link>

        <Link href="/fancards" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }} aria-label={t("Play Fan Cards trivia and polls")}>
          <motion.div whileHover={{ scale: 1.05 }} className="glass-panel" style={{ width: '100%', height: '75px', display: 'flex', alignItems: 'center', padding: '10px 12px', gap: '10px', overflow: 'hidden' }}>
            <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)' }} role="img" aria-hidden="true">🃏</div>
            <div style={{ overflow: 'hidden' }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{t("FAN CARDS")}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '2px 0 0 0' }}>{t("Trivia & Polls")} <FaChevronRight size={8} aria-hidden="true" /></p>
            </div>
          </motion.div>
        </Link>

      </div>
    </div>
  );
}
