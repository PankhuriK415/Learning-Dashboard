"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Terminal } from "lucide-react";

interface LogEntry {
  id: string;
  time: string;
  msg: string;
  type: "success" | "info" | "warning";
}

const INITIAL_LOGS: LogEntry[] = [
  { id: "1", time: "14:24:02", msg: "SYS_INIT: Quantum synapse network online.", type: "success" },
  { id: "2", time: "14:24:15", msg: "MEM_SYNC: Advanced React Patterns channel stable.", type: "info" },
  { id: "3", time: "14:24:32", msg: "FLUX_CAL: Cognitive load adjusted to 284 MHz.", type: "info" },
];

const LOG_MESSAGES = [
  "COGNITIVE: Synaptic pathways optimized for system design.",
  "AI_ENG: Processing neural training checkpoint #8102.",
  "PERF: Cache invalidation successfully completed in 1.4ms.",
  "MEM_SYNC: System Design Mastery delta consolidated.",
  "OS_FLUX: Readjusting neural scan grids.",
  "SYS_MONITOR: Memory density within safe parameters.",
];

export default function PulseMatrix() {
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);

  const rows = 6;
  const cols = 10;

  // Add random terminal logs periodically to make dashboard feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toTimeString().split(" ")[0];
      const msg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const types: ("success" | "info" | "warning")[] = ["success", "info", "warning"];
      const type = types[Math.floor(Math.random() * types.length)];
      
      setLogs((prev) => [
        { id: Math.random().toString(), time, msg, type },
        ...prev.slice(0, 4),
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      whileHover={{
        scale: 1.015,
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="group relative border border-white/5 bg-black/60 p-6 flex flex-col justify-between h-full rounded-2xl select-none"
    >
      {/* Hardware-accelerated hover glow overlay (prevents layout shifts & repaints) */}
      <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 border border-green-accent/30 bg-green-accent/[0.01] shadow-[0_0_25px_rgba(0,255,135,0.08)] pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-accent animate-pulse" />
          <h3 className="font-mono text-sm font-bold tracking-wider text-white">
            KNOWLEDGE PULSE MATRIX
          </h3>
        </div>
        <span className="font-mono text-[9px] text-green-accent tracking-widest uppercase">
          SCANNER ACTIVE
        </span>
      </div>

      <div className="grid gap-6 mt-6 lg:grid-cols-12">
        {/* Synapse Grid Scanner */}
        <div className="relative lg:col-span-7 flex items-center justify-center p-4 border border-white/5 rounded-xl bg-black/30 overflow-hidden">
          {/* Sweeping scanline */}
          <motion.div
            animate={{ y: ["-10%", "110%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-accent/30 to-transparent pointer-events-none z-10"
          />

          <div className="grid grid-cols-10 gap-3">
            {Array.from({ length: rows }).map((_, r) =>
              Array.from({ length: cols }).map((_, c) => {
                // Determine highlight intensity based on proximity to hovered cell
                let intensity = 0; // 0 = base, 1 = mid, 2 = high (hovered)
                if (hoveredCell) {
                  const dist = Math.hypot(r - hoveredCell.r, c - hoveredCell.c);
                  if (dist === 0) intensity = 2;
                  else if (dist <= 1.8) intensity = 1;
                }

                // Random base pulse rate to make nodes shimmer gently
                const delay = (r * 10 + c) * 0.05;

                return (
                  <div
                    key={`${r}-${c}`}
                    onMouseEnter={() => setHoveredCell({ r, c })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className="relative flex h-5 w-5 cursor-crosshair items-center justify-center rounded-md"
                  >
                    {/* Outer aura glowing on hover */}
                    <motion.div
                      animate={{
                        scale: intensity === 2 ? 1.5 : intensity === 1 ? 1.25 : 1,
                        opacity: intensity === 2 ? 0.8 : intensity === 1 ? 0.4 : 0.15,
                      }}
                      className={`absolute inset-0 rounded-full ${
                        intensity === 2
                          ? "bg-cyan-accent/40"
                          : intensity === 1
                          ? "bg-green-accent/20"
                          : "bg-emerald-800/10"
                      }`}
                    />

                    {/* Central synapse node */}
                    <motion.div
                      animate={{
                        scale: intensity === 2 ? 1.3 : [0.9, 1.1, 0.9],
                        backgroundColor:
                          intensity === 2
                            ? "#00f0ff"
                            : intensity === 1
                            ? "#00ff87"
                            : "rgba(2, 60, 40, 0.6)",
                      }}
                      transition={
                        intensity === 0
                          ? { duration: 2, repeat: Infinity, delay, ease: "easeInOut" }
                          : { type: "spring", stiffness: 300, damping: 15 }
                      }
                      className="h-2 w-2 rounded-full"
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Live terminal logs feed */}
        <div id="logs" className="lg:col-span-5 flex flex-col justify-between border border-white/5 bg-black/40 p-4 rounded-xl font-mono text-[10px] scroll-mt-24">
          <div className="flex items-center gap-2 text-silver-accent/40 mb-3 uppercase tracking-wider">
            <Terminal className="h-3.5 w-3.5" />
            <span>NEURAL SCAN LOGS</span>
          </div>

          <div className="space-y-2.5 h-[140px] overflow-hidden">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="text-cyan-accent/60">[{log.time}]</span>
                  <span
                    className={
                      log.type === "success"
                        ? "text-green-accent"
                        : log.type === "warning"
                        ? "text-yellow-500"
                        : "text-silver-accent"
                    }
                  >
                    {log.msg}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
