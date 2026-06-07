"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
  index: number;
}

const getIconComponent = (name: string) => {
  const Icon = (Icons as any)[name];
  if (Icon) return Icon;
  return Icons.BookOpen;
};

const WAVE_PATHS = [
  "M 0,10 Q 50,0 100,10 T 200,10 T 300,10 T 400,10",
  "M 0,10 C 40,20 80,0 120,10 T 240,10 T 360,10",
  "M 0,10 Q 75,20 150,10 T 300,10 T 450,10",
  "M 0,10 C 60,-5 120,25 180,10 T 360,10",
];

export default function CourseCard({ course, index }: CourseCardProps) {
  const Icon = getIconComponent(course.icon_name);
  const wavePath = WAVE_PATHS[index % WAVE_PATHS.length];
  
  const isEven = index % 2 === 0;
  const accentColor = isEven ? "text-cyan-accent" : "text-green-accent";
  const glowClass = isEven ? "shadow-[0_0_15px_rgba(0,240,255,0.15)]" : "shadow-[0_0_15px_rgba(0,255,135,0.15)]";
  const gradId = `grad-${course.id}`;

  return (
    <motion.article
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{
        scale: 1.02,
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-black/60 border border-white/5 overflow-hidden select-none cursor-pointer h-full min-h-[200px]"
    >
      {/* 1. Hardware-accelerated hover glow overlay (prevents layout shifts & repaints) */}
      <div 
        className={`absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 border pointer-events-none ${
          isEven ? "border-cyan-accent/30 bg-cyan-accent/[0.02]" : "border-green-accent/30 bg-green-accent/[0.02]"
        } ${glowClass}`} 
      />

      {/* 2. Abstract Gradient Mesh Background */}
      <div className="absolute inset-0 -z-20 opacity-30 mix-blend-screen pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id={`mesh-${course.id}-1`} cx="20%" cy="30%" r="60%">
              <stop offset="0%" stopColor={isEven ? "#00f0ff" : "#00ff87"} stopOpacity="0.25" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`mesh-${course.id}-2`} cx="80%" cy="70%" r="50%">
              <stop offset="0%" stopColor={isEven ? "#023c28" : "#0d1b15"} stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="transparent" />
          <circle cx="20%" cy="30%" r="50%" fill={`url(#mesh-${course.id}-1)`} />
          <circle cx="80%" cy="70%" r="40%" fill={`url(#mesh-${course.id}-2)`} />
        </svg>
      </div>

      {/* Card Header Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-black/45 border border-white/5 transition-transform duration-300 group-hover:scale-110 ${accentColor}`}>
            <Icon className="h-5.5 w-5.5" />
          </div>
          <span className="font-mono text-[9px] tracking-widest text-silver-accent/30">
            NODE #{course.id.slice(0, 5).toUpperCase()}
          </span>
        </div>

        <h3 className="mt-4 font-mono text-base font-bold tracking-tight text-white group-hover:text-white transition-colors duration-200">
          {course.title}
        </h3>
      </div>

      {/* Progress & Energy Pathway */}
      <div className="relative z-10 mt-6">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-wider mb-2">
          <span className="text-silver-accent/40">SYNAPTIC INTEGRATION</span>
          <span className={`${accentColor} font-semibold`}>{course.progress}%</span>
        </div>

        {/* Custom SVG Neural Energy Channel */}
        <div className="relative w-full h-5 overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 350 20">
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isEven ? "#00f0ff" : "#00ff87"} stopOpacity="0.9" />
                <stop offset="100%" stopColor={isEven ? "#023c28" : "#00f0ff"} stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Channel base pathway */}
            <path
              d={wavePath}
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Filling Energy stream: Animates on initial load */}
            <motion.path
              d={wavePath}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: course.progress / 100 }}
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 12,
                delay: 0.3 + index * 0.1,
              }}
            />

            {/* Pulsing energy cluster particle at front of progress */}
            {course.progress > 0 && (
              <motion.circle
                r="2.5"
                fill={isEven ? "#00f0ff" : "#00ff87"}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: `${course.progress}%` }}
                transition={{
                  type: "spring",
                  stiffness: 40,
                  damping: 12,
                  delay: 0.3 + index * 0.1,
                }}
                style={{
                  motionPath: `path("${wavePath}")`,
                }}
                className={isEven ? "shadow-[0_0_8px_#00f0ff]" : "shadow-[0_0_8px_#00ff87]"}
              />
            )}
          </svg>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[9px] text-silver-accent/30">
        <span>STATUS: {course.progress === 100 ? "COMPLETED" : "SYNCING"}</span>
        <div className="flex gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${course.progress > 50 ? "bg-green-accent" : "bg-yellow-500"} animate-pulse`} />
          <span>CH: 0{index + 1}</span>
        </div>
      </div>
    </motion.article>
  );
}
