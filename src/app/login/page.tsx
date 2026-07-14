"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaEnvelope, FaLock, FaFutbol, FaIdBadge, FaGlobeAmericas, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<"FAN" | "ORGANIZER" | "STAFF">("FAN");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const payload = isLogin
        ? { email, password }
        : { email, password, name, role };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Automatically log in using context provider
      login(data.user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', background: 'transparent', position: 'relative', overflow: 'hidden', padding: '20px' }}>

      {/* Background Graphic Elements for FIFA Vibes */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 70%)', filter: 'blur(60px)' }} 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} 
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '420px', background: 'rgba(15, 15, 25, 0.75)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(25px)', WebkitBackdropFilter: 'blur(25px)', boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.15)' }}
      >

        {/* Logo / Title Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            style={{ background: 'linear-gradient(135deg, #FFDF00, #D4AF37)', padding: '12px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)' }}
          >
            <FaFutbol size={28} color="black" />
          </motion.div>
          <h1 style={{ margin: 0, fontFamily: 'Oswald', fontSize: 'clamp(1.3rem, 5vw, 2.2rem)', background: 'linear-gradient(135deg, #FFDF00, #FDF5A9, #D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '3px', filter: 'drop-shadow(0 4px 15px rgba(212, 175, 55, 0.5))' }}>FIFA 2026</h1>
        </div>
        <p style={{ color: '#9ca3af', marginBottom: '30px', letterSpacing: '2px', textAlign: 'center', fontSize: '0.85rem', textTransform: 'uppercase' }}>
          Centralized Access Portal
        </p>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', width: '100%', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '5px', marginBottom: '25px' }}>
          <button
            onClick={() => { setIsLogin(true); setError(""); }}
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: isLogin ? 'rgba(255,255,255,0.1)' : 'transparent', color: isLogin ? 'white' : '#9ca3af', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            SIGN IN
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(""); }}
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: !isLogin ? 'rgba(255,255,255,0.1)' : 'transparent', color: !isLogin ? 'white' : '#9ca3af', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            SIGN UP
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>

          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ position: 'relative' }}>
                  <FaUserCircle style={{ position: 'absolute', top: '14px', left: '15px', color: '#9ca3af' }} size={18} />
                  <input
                    id="signup-name"
                    name="signup-name"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    style={{ width: '100%', padding: '12px 15px 12px 45px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none', fontSize: '0.95rem' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ position: 'relative' }}>
            <FaEnvelope style={{ position: 'absolute', top: '14px', left: '15px', color: '#9ca3af' }} size={16} />
            <input
              id="login-email"
              name="login-email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 15px 12px 45px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <FaLock style={{ position: 'absolute', top: '14px', left: '15px', color: '#9ca3af' }} size={16} />
            <input
              id="login-password"
              name="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 45px 12px 45px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none', fontSize: '0.95rem' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', top: '14px', right: '15px', background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: 0 }}
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>

          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '8px' }}>Select Role</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => setRole("FAN")} style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', borderRadius: '10px', border: `1px solid ${role === "FAN" ? '#FFDF00' : 'rgba(255,255,255,0.2)'}`, background: role === "FAN" ? 'rgba(255, 223, 0, 0.1)' : 'rgba(0,0,0,0.2)', color: 'white', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <FaUserCircle size={20} color={role === "FAN" ? '#FFDF00' : '#9ca3af'} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>FAN</span>
                  </button>
                  <button type="button" onClick={() => setRole("ORGANIZER")} style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', borderRadius: '10px', border: `1px solid ${role === "ORGANIZER" ? '#06b6d4' : 'rgba(255,255,255,0.2)'}`, background: role === "ORGANIZER" ? 'rgba(6, 182, 212, 0.1)' : 'rgba(0,0,0,0.2)', color: 'white', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <FaGlobeAmericas size={20} color={role === "ORGANIZER" ? '#06b6d4' : '#9ca3af'} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>ORGANIZER</span>
                  </button>
                  <button type="button" onClick={() => setRole("STAFF")} style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', borderRadius: '10px', border: `1px solid ${role === "STAFF" ? '#10b981' : 'rgba(255,255,255,0.2)'}`, background: role === "STAFF" ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0,0,0,0.2)', color: 'white', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <FaIdBadge size={20} color={role === "STAFF" ? '#10b981' : '#9ca3af'} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>STAFF</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px' }}>
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type="submit"
            style={{ width: '100%', padding: '15px', marginTop: '10px', background: 'linear-gradient(135deg, #FFDF00, #D4AF37)', color: 'black', fontWeight: 'bold', fontSize: '1rem', border: 'none', borderRadius: '10px', cursor: isLoading ? 'not-allowed' : 'pointer', fontFamily: 'Oswald', letterSpacing: '1px', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)', opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "AUTHENTICATING..." : (isLogin ? "ENTER STADIUM" : "CREATE PASS")}
          </motion.button>

        </form>

      </motion.div>
    </div>
  );
}
