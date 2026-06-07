"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Flame, Zap, Brain, Shield, RefreshCw } from "lucide-react";

export default function NeuralCore() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for tracking cursor relative coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D tilt
  const springConfig = { stiffness: 120, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  // Secondary elements shift differently for depth parallax
  const px = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);
  const py = useSpring(useTransform(y, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Normalized position relative to center of the component (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="perspective-1000 w-full select-none">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.015,
          y: -4,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="group relative flex flex-col justify-between overflow-hidden border border-cyan-accent/10 bg-black/60 p-6 md:p-8 rounded-2xl md:min-h-[280px]"
      >
        {/* Hardware-accelerated hover glow overlay (prevents layout shifts & repaints) */}
        <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 border border-cyan-accent/30 bg-cyan-accent/[0.01] shadow-[0_0_25px_rgba(0,240,255,0.08)] pointer-events-none" />

        {/* Animated Background Glow */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-accent/10 blur-[80px]" />
          <div className="absolute top-1/4 right-1/4 h-32 w-32 rounded-full bg-green-accent/5 blur-[60px]" />
        </div>

        {/* Floating Particle Elements (Layered Parallax) */}
        <motion.div
          style={{ x: px, y: py, translateZ: 40 }}
          className="absolute right-12 top-8 hidden pointer-events-none md:block"
        >
          <div className="relative flex h-24 w-24 items-center justify-center">
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-cyan-accent/20"
            />
            {/* Inner reverse spinning ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute h-16 w-16 rounded-full border border-double border-green-accent/20"
            />
            <Brain className="h-8 w-8 text-cyan-accent neural-glow-cyan" />
          </div>
        </motion.div>

        {/* Upper Command Info */}
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-cyan-accent">
              NEURAL OS // CORE_SYSTEM
            </span>
            <h1 className="mt-1 font-mono text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Welcome back, Pankhuri
            </h1>
          </div>

          {/* Sync status pills */}
          <div className="flex flex-wrap gap-2.5">
            <div className="flex items-center gap-2 rounded-lg border border-cyan-accent/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] text-cyan-accent">
              <Zap className="h-3.5 w-3.5 animate-pulse" />
              <span>SYNC: 94.8%</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-green-accent/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] text-green-accent">
              <Shield className="h-3.5 w-3.5" />
              <span>STABILITY: NOMINAL</span>
            </div>
          </div>
        </div>

        {/* Floating particles background lines */}
        <div className="absolute inset-y-0 right-1/4 w-px bg-gradient-to-b from-transparent via-cyan-accent/10 to-transparent pointer-events-none" />

        {/* Main core stats & streak */}
        <div className="relative z-10 mt-8 grid gap-6 sm:grid-cols-3">
          {/* Streak Metric */}
          <div className="flex items-center gap-4 rounded-xl border border-cyan-accent/5 bg-black/30 p-4 transition-colors hover:border-cyan-accent/20">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-accent/5 border border-cyan-accent/15">
              <Flame className="h-6 w-6 text-orange-500 fill-orange-500/10 animate-bounce" />
              <span className="absolute inset-0 animate-ping rounded-xl bg-orange-500/5 opacity-50" />
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-wider text-silver-accent/40">
                LEARNING STREAK
              </div>
              <div className="font-mono text-lg font-bold text-white">
                14 Days Sync
              </div>
            </div>
          </div>

          {/* Cognitive Load */}
          <div className="flex items-center gap-4 rounded-xl border border-cyan-accent/5 bg-black/30 p-4 transition-colors hover:border-cyan-accent/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-accent/5 border border-green-accent/15">
              <RefreshCw className="h-6 w-6 text-green-accent animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-wider text-silver-accent/40">
                ACTIVE FLUX
              </div>
              <div className="font-mono text-lg font-bold text-white">
                284.1 MHz
              </div>
            </div>
          </div>

          {/* Sync Efficiency */}
          <div className="flex items-center gap-4 rounded-xl border border-cyan-accent/5 bg-black/30 p-4 transition-colors hover:border-cyan-accent/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/5 border border-red-500/15">
              <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-wider text-silver-accent/40">
                NEURAL INTEGRITY
              </div>
              <div className="font-mono text-lg font-bold text-white">
                99.8% Perfect
              </div>
            </div>
          </div>
        </div>

        {/* Ambient edge lighting lines */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-accent/40 to-transparent" />
      </motion.div>
    </section>
  );
}
