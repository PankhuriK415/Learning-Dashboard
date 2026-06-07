import { createClient } from "@supabase/supabase-js";
import { Course } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Only initialize Supabase client if credentials are provided
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Seed data as defined in requirements
export const SEED_COURSES: Course[] = [
  {
    id: "27e46ab6-35b8-468e-9080-1a742cb65860",
    title: "Advanced React Patterns",
    progress: 68,
    icon_name: "Atom",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "bc727931-15a0-43b9-bb83-34e8c187bf5d",
    title: "AI Engineering",
    progress: 85,
    icon_name: "Cpu",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: "f8b7fca1-1de2-4c4b-b0b2-132d0c242a41",
    title: "System Design Mastery",
    progress: 42,
    icon_name: "Network",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    id: "6a9ce020-f5e2-4ea5-a226-4ee3fde69d7b",
    title: "Next.js Performance",
    progress: 92,
    icon_name: "Zap",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
];

/**
 * Fetch all course data using Server Components.
 * Never fetch on the client.
 */
export async function getCourses(): Promise<Course[]> {
  if (!supabase) {
    console.warn("Supabase credentials missing. Falling back to seeded course data.");
    return SEED_COURSES;
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching courses from Supabase:", error.message);
      // Fallback if the query fails (e.g. table not created or seeded yet)
      return SEED_COURSES;
    }

    if (!data || data.length === 0) {
      return SEED_COURSES;
    }

    return data as Course[];
  } catch (err) {
    console.error("Unexpected error fetching courses from Supabase:", err);
    return SEED_COURSES;
  }
}
