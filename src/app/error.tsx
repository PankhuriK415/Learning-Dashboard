"use client";

import React, { useEffect } from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an external service or console
    console.error("Neural Learning OS Sync Error:", error);
  }, [error]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[80vh] p-6 font-mono select-none">
      {/* Glitch error container */}
      <div className="relative flex flex-col items-center max-w-md w-full border border-red-500/20 bg-black/60 p-8 rounded-2xl text-center">
        {/* Border glow */}
        <div className="absolute inset-0 rounded-2xl bg-red-500/5 blur-xl pointer-events-none" />

        {/* Cyber Alert Icon */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-red-500/5 border border-red-500/20 mb-6">
          <ShieldAlert className="h-8 w-8 text-red-500 animate-pulse" />
          <span className="absolute inset-0 rounded-xl bg-red-500/10 animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
        </div>

        {/* Glitch Header */}
        <h2 className="glitch-text text-xl font-bold tracking-widest text-red-500 uppercase">
          Neural OS Disconnect
        </h2>

        <p className="mt-4 text-xs text-silver-accent/60 leading-relaxed">
          The synapse pathways failed to sync with the central database. Code:{" "}
          <span className="text-red-400 font-bold">{error.digest || "ERR_SYNAPSE_TIMEOUT"}</span>
        </p>

        {/* Raw Log printout */}
        <div className="mt-6 w-full bg-black/80 border border-white/5 p-4 rounded-lg text-left font-mono text-[9px] text-red-400/80 overflow-x-auto">
          <div>&gt; SYSTEM CORE STATUS: OFFLINE</div>
          <div className="mt-1">&gt; ERROR LOG: {error.message || "Unknown cognitive rupture"}</div>
          <div className="mt-1">&gt; RE-ROUTING ATTENUATION FLOW... FAILED</div>
        </div>

        {/* Retry Button */}
        <button
          onClick={() => reset()}
          className="mt-8 group cursor-pointer relative flex items-center justify-center gap-3 w-full border border-red-500/30 bg-red-500/5 py-3 rounded-xl font-mono text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-200"
        >
          <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
          <span>RE-SYNC SYNAPSE MATRIX</span>
        </button>
      </div>
    </main>
  );
}
