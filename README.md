# Neural Learning OS

A living operating system for knowledge. Designed as an interactive cognitive ecosystem rather than a standard dashboard. Users navigate an intelligent network of knowledge nodes, energy streams, activity sweeps, and synapse pathways.

Built as a submission-ready, high-fidelity React dashboard optimized for Next.js App Router, Framer Motion, and Supabase.

---

## 🌌 Core Design & Color System

- **Background**: Obsidian Black (`#050505`)
- **Primary Accents**: Electric Cyan (`#00f0ff`) & Aurora Green (`#00ff87`)
- **Secondary Accents**: Deep Emerald (`#023c28`)
- **Highlights**: Soft Silver (`#cbd5e1`)

### Key Visual Innovations
- **No Div Soup**: Styled with strictly semantic HTML5 elements (`main`, `nav`, `section`, `article`, `aside`).
- **Interactive 3D Parallax**: The `NeuralCore` Command Center tilts in 3D coordinates based on mouse vectors. Internal layers shift at variable speeds to produce genuine physical depth.
- **Wavy SVG Energy Channels**: Instead of generic progress bars, courses feature a custom undulating SVG path that fills up organically using Framer Motion spring solvers (`type: "spring", stiffness: 45, damping: 12`).
- **Knowledge Pulse Matrix**: A responsive synaptic heatmap scanner that propagates hover lights to neighboring nodes in real-time, backed by live terminal scrolling logs.
- **Ambient Canvas Particles**: An interactive HTML5 canvas background animating float-particles that connect together when near, and link dynamically to the mouse cursor.

---

## 🛠️ Tech Stack & Requirements

- **Framework**: Next.js App Router (TypeScript)
- **Styling**: Tailwind CSS v4 & Custom CSS3 animations
- **Animations**: Framer Motion
- **Database**: Supabase
- **Icons**: Lucide React

---

## 📦 File Architecture

```
├── E:\Projects\Learning-Dashboard\
│   ├── .env.example          # Environment variables template
│   ├── README.md             # Project documentation
│   ├── supabase_setup.sql    # Database migration & seed inserts
│   ├── tsconfig.json         # TypeScript rules configuration
│   └── src/
│       ├── app/
│       │   ├── layout.tsx    # Root frame, SEO metadata, canvas insertion
│       │   ├── page.tsx      # Server Component: fetching course data
│       │   ├── loading.tsx   # Neural shimmer & rotating placeholder pulse
│       │   ├── error.tsx     # Glitching reconnect terminal interface
│       │   └── globals.css   # Custom CSS theme variables, scanline grids, webkit scrollbars
│       ├── components/
│       │   ├── BackgroundCanvas.tsx # Floating interactive canvas particles
│       │   ├── Sidebar.tsx   # Sidebar collapsing to tablet icons / bottom bar on mobile
│       │   ├── NeuralCore.tsx# Parallax Command Center hero card
│       │   ├── CourseCluster.tsx # Course cards with wavy SVG energy paths
│       │   └── PulseMatrix.tsx # Heatmap scanner grid and scroll console
│       └── lib/
│           ├── supabase.ts   # Server-side Supabase client & fallback data loader
│           └── types.ts      # TypeScript interfaces
```

---

## 🚀 Setup & Execution

### 1. Clone the project and install dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase connection parameters:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

*Note: If these variables are not present or public URL is missing, the application will output a console warning and gracefully fall back to local seed data. This ensures it is robust and previewable offline.*

### 3. Database Migration
In your Supabase project dashboard, open the **SQL Editor**, paste the contents of `supabase_setup.sql`, and run it. This creates the public `courses` table, sets up public read security policies, and populates it with the initial courses.

### 4. Running Locally
Run the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
Verify that compilation runs cleanly:
```bash
npm run build
```
The application compiles fully static paths where possible and handles dynamic server elements.
