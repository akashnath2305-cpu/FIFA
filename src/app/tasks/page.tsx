"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { FaPlus, FaCheckCircle, FaSpinner, FaCircle, FaListUl } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function TasksPage() {
  const { role } = useAuth();
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Organizer state
  const [isCreating, setIsCreating] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskSteps, setNewTaskSteps] = useState([""]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data.filter((t: any) => t.status !== "COMPLETED"));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Organizer Functions ---------------- //
  const handleAddStep = () => setNewTaskSteps([...newTaskSteps, ""]);
  
  const handleStepChange = (index: number, val: string) => {
    const updated = [...newTaskSteps];
    updated[index] = val;
    setNewTaskSteps(updated);
  };

  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const validSteps = newTaskSteps.filter(s => s.trim() !== "");
    if (!newTaskTitle || !newTaskDesc || validSteps.length === 0) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTaskTitle, description: newTaskDesc, steps: validSteps })
      });
      if (res.ok) {
        setIsCreating(false);
        setNewTaskTitle("");
        setNewTaskDesc("");
        setNewTaskSteps([""]);
        fetchTasks();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // ---------------- Staff Functions ---------------- //
  const toggleStep = async (stepId: string, currentStatus: string) => {
    const newStatus = currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED";
    
    // Optimistic update
    setTasks(prev => {
      let isNewlyCompleted = false;
      const newTasks = prev.map(t => {
        const hasStep = t.steps.find((s: any) => s.id === stepId);
        if (!hasStep) return t;

        const updatedSteps = t.steps.map((s: any) => s.id === stepId ? { ...s, status: newStatus } : s);
        const completedCount = updatedSteps.filter((s: any) => s.status === "COMPLETED").length;
        let newTStatus = "PENDING";
        if (completedCount === updatedSteps.length) {
          newTStatus = "COMPLETED";
          if (t.status !== "COMPLETED") isNewlyCompleted = true;
        }
        else if (completedCount > 0) newTStatus = "IN_PROGRESS";

        return { ...t, steps: updatedSteps, status: newTStatus };
      });

      if (isNewlyCompleted) {
        setTimeout(() => {
          setTasks(current => current.filter(t => t.status !== "COMPLETED"));
        }, 2000);
      }

      return newTasks;
    });

    try {
      await fetch("/api/tasks/step", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId, status: newStatus })
      });
    } catch (e) {
      console.error(e);
      fetchTasks(); // Revert on error
    }
  };

  // ---------------- Shared Helpers ---------------- //
  const getStatusIcon = (status: string) => {
    if (status === "COMPLETED") return <FaCheckCircle color="#10b981" />;
    if (status === "IN_PROGRESS") return <FaSpinner color="#fbbf24" className="fa-spin" />;
    return (
      <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <FaCircle color="#ef4444" size={14} />
      </motion.div>
    );
  };

  const getStatusColor = (status: string) => {
    if (status === "COMPLETED") return "#10b981";
    if (status === "IN_PROGRESS") return "#fbbf24";
    return "#ef4444"; // Red for pending
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>{t("Loading Tasks...")}</div>;
  }

  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 'clamp(1rem, 3.5vw, 1.5rem)', color: 'var(--fifa-gold)', textShadow: '0 0 15px rgba(212, 175, 55, 0.4)' }}>
            {role === "ORGANIZER" ? t("DISPATCH CENTER") : t("MISSION LOG")}
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {role === "ORGANIZER" ? t("Manage and assign operational tasks to field staff.") : t("Execute active instructions and update progress.")}
          </p>
        </div>
        
        {role === "ORGANIZER" && (
          <button 
            onClick={() => setIsCreating(!isCreating)}
            style={{ padding: '12px 24px', background: 'var(--fifa-gold)', border: 'none', borderRadius: '30px', color: 'black', fontWeight: 'bold', fontFamily: 'Oswald', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            {isCreating ? t("CANCEL") : <><FaPlus /> {t("CREATE TASK")}</>}
          </button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', gap: '30px', paddingBottom: '50px', flexWrap: 'wrap' }}>
        
        {/* Organizer Creation Form */}
        <AnimatePresence>
          {role === "ORGANIZER" && isCreating && (
            <motion.div 
              initial={{ opacity: 0, x: -50, width: 0 }}
              animate={{ opacity: 1, x: 0, width: '400px' }}
              exit={{ opacity: 0, x: -50, width: 0 }}
              style={{ overflow: 'hidden', flexShrink: 0 }}
            >
              <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ margin: 0, color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>{t("NEW DIRECTIVE")}</h3>
                
                <input 
                  type="text" placeholder={t("Task Title")} value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}
                  style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px', color: 'white', borderRadius: '8px' }}
                />
                
                <textarea 
                  placeholder={t("Task Description...")} value={newTaskDesc} onChange={(e) => setNewTaskDesc(e.target.value)}
                  style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px', color: 'white', borderRadius: '8px', minHeight: '80px', resize: 'vertical' }}
                />

                <div>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: 'var(--fifa-gold)' }}>{t("ACTION STEPS")}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {newTaskSteps.map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem' }}>{idx + 1}</div>
                        <input 
                          type="text" placeholder={`${t("Step")} ${idx + 1}`} value={step} onChange={(e) => handleStepChange(idx, e.target.value)}
                          style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '8px', color: 'white', outline: 'none' }}
                        />
                      </div>
                    ))}
                    <button onClick={handleAddStep} style={{ background: 'transparent', border: '1px dashed rgba(255,255,255,0.3)', color: 'white', padding: '10px', borderRadius: '8px', cursor: 'pointer', marginTop: '10px', fontSize: '0.8rem' }}>
                      + {t("ADD STEP")}
                    </button>
                  </div>
                </div>

                <button onClick={handleSubmitTask} style={{ background: 'linear-gradient(135deg, var(--fifa-gold), #8C6A1C)', border: 'none', color: 'black', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                  {t("DISPATCH TASK")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task Feed */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '300px' }}>
          {tasks.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '50px' }}>{t("No active tasks found.")}</div>
          ) : (
            <AnimatePresence>
            {tasks.map(task => {
              const completedSteps = task.steps.filter((s: any) => s.status === "COMPLETED").length;
              const totalSteps = task.steps.length;
              const progress = totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);

              return (
                <motion.div 
                  key={task.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    boxShadow: task.status === "COMPLETED" ? '0 0 50px rgba(16, 185, 129, 0.4)' : '0 15px 35px rgba(0,0,0,0.6)',
                    backgroundColor: task.status === "COMPLETED" ? 'rgba(16, 185, 129, 0.15)' : 'rgba(10,10,10,0.55)'
                  }}
                  exit={{ opacity: 0, scale: 0.8, height: 0, marginBottom: 0, padding: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
                  className="glass-panel" 
                  style={{ position: 'relative', flexShrink: 0, padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px', borderLeft: `4px solid ${getStatusColor(task.status)}` }}
                >
                  
                  {/* Giant Green Tick Overlay */}
                  <AnimatePresence>
                    {task.status === "COMPLETED" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: 'spring', bounce: 0.6, duration: 0.8 }}
                        style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(16,185,129,0.1)', zIndex: 10, backdropFilter: 'blur(2px)' }}
                      >
                         <FaCheckCircle size={120} color="#10b981" style={{ filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.8))' }} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Task Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                        {getStatusIcon(task.status)}
                        <span style={{ color: getStatusColor(task.status), fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px' }}>{task.status}</span>
                      </div>
                      <h2 style={{ margin: 0, color: 'white', fontFamily: 'Oswald', fontSize: '1.4rem' }}>{task.title}</h2>
                      <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{task.description}</p>
                    </div>
                  </div>

                  {/* Completion Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t("Resolution Progress")}</span>
                      <span style={{ fontSize: '0.75rem', color: 'white', fontWeight: 'bold' }}>{progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: getStatusColor(task.status), transition: 'width 0.4s ease-out' }} />
                    </div>
                  </div>

                  {/* Steps List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                    {task.steps.map((step: any, idx: number) => {
                      const isChecked = step.status === "COMPLETED";
                      return (
                        <label key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: role === "STAFF" ? 'pointer' : 'default', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.2s' }}
                          onMouseEnter={(e) => { if (role === "STAFF") e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.3)' }}
                        >
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            disabled={role !== "STAFF"}
                            onChange={() => toggleStep(step.id, step.status)}
                            style={{ display: 'none' }} // Hide default square checkbox
                          />
                          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {isChecked ? (
                              <FaCheckCircle size={18} color="var(--fifa-gold)" />
                            ) : (
                              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', transition: 'border-color 0.2s' }} />
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, color: isChecked ? 'var(--text-muted)' : 'white', textDecoration: isChecked ? 'line-through' : 'none', fontSize: '0.9rem' }}>
                              {step.description}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                </motion.div>
              );
            })}
            </AnimatePresence>
          )}
        </div>

      </div>
    </div>
  );
}
