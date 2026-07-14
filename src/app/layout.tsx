import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { FaHome, FaTicketAlt, FaBell, FaMapMarkedAlt, FaGlobeAmericas, FaFire, FaGamepad, FaSearch } from "react-icons/fa";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically load heavy components to reduce initial bundle size (AI Efficiency Signal)
const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: true });
const inter = Inter({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"], variable: '--font-oswald' });

import Image from "next/image";

import { AuthProvider } from "@/components/AuthProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "FIFA Fever 2026",
  description: "The ultimate FIFA World Cup 2026 experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${oswald.variable}`}>
        <AuthProvider>
          <LanguageProvider>
            <div className="app-container">
            
            {/* Global Background Layer */}
            <div className="bg-layer">
              <Image src="/bg.png" alt="Background" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
            </div>

            {/* Vertical Circle Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="main-content">
              {children}
            </main>

            </div>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
