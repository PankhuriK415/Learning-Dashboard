"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import * as Icons from "lucide-react";
import { Course } from "@/lib/types";

interface CourseClusterProps {
  courses: Course[];
}

// Helper to look up Lucide icons dynamically
const getIconComponent = (name: string) => {
  const Icon = (Icons as any)[name];
  if (Icon) return Icon;
  return Icons.BookOpen;
};

// Unique wave patterns for the progress bar to make them feel organic
const WAVE_PATHS = [
  "M 0,10 Q 50,0 100,10 T 200,10 T 300,10 T 400,10",
  "M 0,10 C 40,20 80,0 120,10 T 240,10 T 360,10",
  "M 0,10 Q 75,20 150,10 T 300,10 T 450,10",
  "M 0,10 C 60,-5 120,25 180,10 T 360,10",
];

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
};

export default function CourseCluster({ courses }: CourseClusterProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {courses.map((course, idx) => {
        const Icon = getIconComponent(course.icon_name);
        const wavePath = WAVE_PATHS[idx % WAVE_PATHS.length];
        
        // Visual branding per module
        const borderClass = idx % 2 === 0 ? "neural-border" : "neural-border-green";
        const accentColor = idx % 2 === 0 ? "text-cyan-accent" : "text-green-accent";
        const accentGlow = idx % 2 === 0 ? "neural-glow-cyan" : "neural-glow-green";
        const gradId = `grad-${course.id}`;

        return (
          <motion.article
            key={course.id}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={CARD_VARIANTS}
            className={`relative flex flex-col justify-between p-6 select-none cursor-pointer ${borderClass}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Subtle local glow */}
            <div className="absolute -left-4 -top-4 -z-10 h-24 w-24 rounded-full bg-cyan-500/5 blur-xl pointer-events-none" />

            {/* Course Header */}
            <div>
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-black/40 border border-white/5 transition-transform duration-300 hover:scale-105 ${accentColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-silver-accent/30">
                  NODE #{course.id.slice(0, 5).toUpperCase()}
                </span>
              </div>

              <h2 className="mt-4 font-mono text-lg font-bold tracking-tight text-white group-hover:text-cyan-accent">
                {course.title}
              </h2>
            </div>

            {/* Progress & Energy Pathway */}
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-wider mb-2">
                <span className="text-silver-accent/40">SYNAPTIC INTEGRATION</span>
                <span className={accentColor}>{course.progress}%</span>
              </div>

              {/* Custom SVG Neural Energy Channel */}
              <div className="relative w-full h-5 overflow-hidden">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 350 20">
                  <defs>
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={idx % 2 === 0 ? "#00f0ff" : "#00ff87"} stopOpacity="0.8" />
                      <stop offset="100%" stopColor={idx % 2 === 0 ? "#023c28" : "#00f0ff"} stopOpacity="0.2" />
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

                  {/* Filling Energy stream */}
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
                      stiffness: 45,
                      damping: 12,
                      delay: 0.2 + idx * 0.1,
                    }}
                  />

                  {/* Pulsing energy cluster particle at front of progress */}
                  {course.progress > 0 && (
                    <motion.circle
                      r="2"
                      fill={idx % 2 === 0 ? "#00f0ff" : "#00ff87"}
                      className={accentGlow}
                      initial={{ offsetDistance: "0%" }}
                      animate={{ offsetDistance: `${course.progress}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 45,
                        damping: 12,
                        delay: 0.2 + idx * 0.1,
                      }}
                      style={{
                        motionPath: `path("${wavePath}")`,
                      }}
                    />
                  )}
                </svg>
              </div>
            </div>

            {/* Neural status readouts */}
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[9px] text-silver-accent/30">
              <span>STATUS: {course.progress === 100 ? "COMPLETED" : "SYNCING"}</span>
              <div className="flex gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${course.progress > 50 ? "bg-green-accent" : "bg-yellow-500"} animate-pulse`} />
                <span>CH: 0{idx + 1}</span>
              </div>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
