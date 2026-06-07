export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface ActivityPulse {
  id: string;
  timestamp: string;
  intensity: number; // 0 to 4 for heatmap colors
  category: "neural" | "code" | "design" | "system";
  message: string;
}
