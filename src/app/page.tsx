import React from "react";
import DashboardGrid from "@/components/DashboardGrid";
import { getCourses } from "@/lib/supabase";

// Force dynamic server rendering for real-time DB fetches
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-6 md:p-10 select-none">
      {/* Cybernetic header telemetry bar */}
      <header className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-widest text-cyan-accent">
            NEURAL OS // CORE_SYSTEM
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] text-silver-accent/30">
          <span>STATION: COGNITIVE_A7</span>
          <span className="h-1.5 w-1.5 rounded-full bg-green-accent animate-pulse" />
        </div>
      </header>

      {/* Bento Grid Wrapper */}
      <DashboardGrid courses={courses} />
    </main>
  );
}

