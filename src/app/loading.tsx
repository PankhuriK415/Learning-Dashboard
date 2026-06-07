"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[80vh] p-6 font-mono select-none">
      {/* Central Holographic Pulsar */}
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Pulsing glow rings */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-cyan-accent/10 blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            rotate: 360,
          }}
          transition={{
            scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
          className="absolute h-20 w-20 rounded-full border border-dashed border-cyan-accent/30"
        />
        <motion.div
          animate={{
            scale: [1, 0.9, 1],
            rotate: -360,
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
          }}
          className="absolute h-12 w-12 rounded-full border border-double border-green-accent/30"
        />
        {/* Core Dot */}
        <div className="h-3.5 w-3.5 rounded-full bg-cyan-accent shadow-[0_0_15px_rgba(0,240,255,0.8)] animate-pulse" />
      </div>

      {/* Futuristic status text */}
      <div className="mt-8 text-center">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xs font-semibold tracking-[0.2em] text-cyan-accent"
        >
          ESTABLISHING SYNAPSE CHANNELS
        </motion.div>
        <div className="mt-2 text-[10px] text-silver-accent/30 tracking-widest uppercase">
          Flux Rate: 284.1 MHz | DB: Online
        </div>
      </div>

      {/* Shimmering Placeholder Skeleton Grid */}
      <div className="mt-12 w-full max-w-4xl grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative flex flex-col justify-between p-6 border border-white/5 rounded-xl bg-black/40 min-h-[170px] overflow-hidden"
          >
            {/* Shimmer element */}
            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
              className="absolute inset-y-0 w-2/3 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -skew-x-12 pointer-events-none"
            />

            <div className="flex items-center justify-between">
              <div className="h-8 w-8 rounded-lg bg-white/5 animate-pulse" />
              <div className="h-3 w-16 rounded bg-white/5 animate-pulse" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-4 w-2/3 rounded bg-white/5 animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-white/5 animate-pulse" />
            </div>

            <div className="mt-6 border-t border-white/5 pt-3">
              <div className="h-2 w-full rounded bg-white/5 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
