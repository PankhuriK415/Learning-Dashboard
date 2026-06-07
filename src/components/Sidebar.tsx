"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Activity, Network, Settings } from "lucide-react";

const NAV_ITEMS = [
  { id: "core", label: "Neural Core", icon: Cpu },
  { id: "network", label: "Knowledge Map", icon: Network },
  { id: "pulse", label: "Synaptic Pulse", icon: Activity },
  { id: "logs", label: "System Logs", icon: Settings },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("core");

  // Dynamically track active section as user scrolls manually
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Triggers when the section dominates the viewport center
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Desktop & Tablet Navigation */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen select-none flex-col border-r border-cyan-accent/10 bg-black transition-all duration-300 md:flex md:w-20 lg:w-64">
        {/* Header Branding */}
        <div className="flex items-center gap-3 border-b border-cyan-accent/5 p-6">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-accent/20 bg-cyan-accent/5">
            <Terminal className="h-5 w-5 text-cyan-accent neural-glow-cyan" />
            <span className="absolute inset-0 animate-pulse rounded-xl bg-cyan-accent/10 pointer-events-none" />
          </div>
          <span className="hidden font-mono text-xs font-semibold tracking-widest text-silver-accent lg:block">
            NEURAL OS <span className="text-cyan-accent">v1.0</span>
          </span>
        </div>

        {/* Nav list */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className="group relative flex w-full cursor-pointer items-center rounded-xl px-4 py-3.5 font-mono text-sm tracking-wider transition-colors duration-200"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 z-0 rounded-xl border border-green-accent/30 bg-emerald-accent/20"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-4 text-left">
                  <Icon
                    className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                      isActive
                        ? "text-green-accent"
                        : "text-silver-accent/50 group-hover:text-cyan-accent"
                    }`}
                  />
                  <span
                    className={`hidden lg:block font-medium ${
                      isActive
                        ? "text-green-accent"
                        : "text-silver-accent/50 group-hover:text-cyan-accent"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer system status */}
        <div className="hidden border-t border-cyan-accent/5 p-4 lg:block">
          <div className="flex items-center gap-3 border border-cyan-accent/5 bg-dark-gray p-3 rounded-lg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-accent"></span>
            </span>
            <span className="font-mono text-[10px] tracking-wide text-silver-accent/40">
              COGNITIVE SYNC: ONLINE
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-cyan-accent/15 bg-black/80 px-4 backdrop-blur-lg md:hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className="relative flex h-12 w-12 items-center justify-center rounded-xl"
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicatorMobile"
                  className="absolute inset-0 z-0 rounded-xl border border-green-accent/30 bg-emerald-accent/20"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <Icon
                className={`relative z-10 h-5 w-5 transition-transform duration-200 ${
                  isActive ? "text-green-accent" : "text-silver-accent/50"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
