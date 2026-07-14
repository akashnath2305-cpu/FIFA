"use client";

import { useState, useEffect } from "react";
import { FaShieldAlt, FaBus, FaExclamationTriangle, FaCheckCircle, FaMapMarkedAlt, FaCar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function LogisticsDashboard() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  useEffect(() => {
    fetch('/api/transport')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRoutes(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleUpdateStatus = async (routeId: string, status: string) => {
    try {
      const res = await fetch('/api/transport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'UPDATE_ROUTE_STATUS', payload: { routeId, status } })
      });
      if (res.ok) {
        setRoutes(routes.map(r => r.id === routeId ? { ...r, status } : r));
        if (selectedRoute?.id === routeId) {
          setSelectedRoute({ ...selectedRoute, status });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ACTIVE': return '#10b981';
      case 'DELAYED': return '#f59e0b';
      case 'CANCELLED': return '#ef4444';
      default: return 'white';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' , flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)', margin: 0, display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaShieldAlt color="#3b82f6" /> LOGISTICS COMMAND
          </h1>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'Oswald', margin: 0 }}>
            FLEET MANAGEMENT & SECURITY MONITORING
          </p>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, minHeight: 0, gap: '20px' }}>
        
        {/* Fleet Overview List */}
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '1.2rem', fontFamily: 'Oswald', marginBottom: '15px', color: 'white' }}>ACTIVE CONVOYS & ROUTES</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {routes.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No routes currently active.</p>
            ) : routes.map(route => (
              <div 
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                style={{ 
                  background: selectedRoute?.id === route.id ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.3)',
                  padding: '15px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  borderLeft: `4px solid ${getStatusColor(route.status)}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {route.type === 'VIP_CONVOY' ? <FaCar color="#3b82f6" /> : <FaBus color="#10b981" />}
                    <h3 style={{ margin: 0, fontSize: '1rem', color: 'white' }}>{route.name}</h3>
                  </div>
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{route.startLoc} → {route.endLoc}</p>
                </div>
                <span style={{ fontSize: '0.8rem', color: getStatusColor(route.status), fontWeight: 'bold' }}>
                  {route.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Map & AI Analyst */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Map Area */}
          <div className="glass-panel" style={{ flex: 2, position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle, rgba(16,30,50,1) 0%, rgba(5,10,15,1) 100%)' }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {selectedRoute ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #3b82f6', boxShadow: '0 0 20px #3b82f6' }}>
                  {selectedRoute.type === 'VIP_CONVOY' ? <FaCar size={30} color="#3b82f6" /> : <FaBus size={30} color="#10b981" />}
                </div>
                <div style={{ marginTop: '15px', background: 'rgba(0,0,0,0.8)', padding: '10px 20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>{selectedRoute.name} - EN ROUTE</span>
                </div>
              </motion.div>
            ) : (
              <div style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
                <FaMapMarkedAlt size={40} style={{ opacity: 0.5, marginBottom: '10px' }} />
                <span>Select a convoy to view tactical map</span>
              </div>
            )}
          </div>

          {/* AI Security Analyst & Actions */}
          <div className="glass-panel" style={{ flex: 1, padding: '20px', display: 'flex', gap: '20px' }}>
            
            <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaExclamationTriangle /> AI SECURITY ANALYST
              </h3>
              {selectedRoute ? (
                selectedRoute.type === 'VIP_CONVOY' ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    <strong>No anomalies detected.</strong> Route is secured by Police Escort Alpha. Estimated time of arrival is 14 minutes. Traffic density is light.
                  </p>
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    <strong>Minor Delay Predicted.</strong> Congestion detected 2 miles ahead on Route 9. Recommend alerting fans of a potential 10-minute delay.
                  </p>
                )
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Awaiting target selection...</p>
              )}
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1rem', color: 'white' }}>COMMAND ACTIONS</h3>
              <button 
                onClick={() => selectedRoute && handleUpdateStatus(selectedRoute.id, 'ACTIVE')}
                disabled={!selectedRoute}
                style={{ background: 'transparent', border: '1px solid #10b981', color: '#10b981', padding: '10px', borderRadius: '5px', cursor: selectedRoute ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '10px', opacity: selectedRoute ? 1 : 0.5 }}
              >
                <FaCheckCircle /> MARK STATUS CLEAR (ACTIVE)
              </button>
              <button 
                onClick={() => selectedRoute && handleUpdateStatus(selectedRoute.id, 'DELAYED')}
                disabled={!selectedRoute}
                style={{ background: 'transparent', border: '1px solid #f59e0b', color: '#f59e0b', padding: '10px', borderRadius: '5px', cursor: selectedRoute ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '10px', opacity: selectedRoute ? 1 : 0.5 }}
              >
                <FaExclamationTriangle /> REPORT DELAY / CONGESTION
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
