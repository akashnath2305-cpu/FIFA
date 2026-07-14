"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import {
  FaTicketAlt,
  FaBell,
  FaMapMarkerAlt,
  FaGlobeAmericas,
  FaFire,
  FaGamepad,
  FaRobot,
  FaClipboardList
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useAuth();

  const navItems = [
    { name: "Living Ticket", path: "/ticket", icon: <FaTicketAlt />, roles: ["FAN"] },
    { name: "Smart Alerts", path: "/alerts", icon: <FaBell />, roles: ["FAN", "STAFF", "ORGANIZER"] },
    { name: "Seat Navigator", path: "/navigator", icon: <FaMapMarkerAlt />, roles: ["FAN"] },
    { name: "Global Nexus", path: "/nexus", icon: <FaGlobeAmericas />, roles: ["FAN"] },
    { name: "Vibe Map", path: "/vibemap", icon: <FaFire />, roles: ["FAN"] },
    { name: "Fan Cards", path: "/fancards", icon: <FaGamepad />, roles: ["FAN"] },
    { name: "AI Copilot", path: "/copilot", icon: <FaRobot />, roles: ["STAFF", "ORGANIZER"] },
    { name: "Mission Log", path: "/tasks", icon: <FaClipboardList />, roles: ["STAFF", "ORGANIZER"] },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <img src="/logo.png" alt="FIFA Fever 2026" style={{ width: '80px', height: '80px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} />
        <span>FIFA Fever</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          if (role && item.roles && !item.roles.includes(role)) return null;
          
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
