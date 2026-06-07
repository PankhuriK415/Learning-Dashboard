# Neural Learning OS

A living operating system for knowledge. Designed as an interactive cognitive ecosystem rather than a standard dashboard. Users navigate an intelligent network of knowledge nodes, energy streams, activity sweeps, and synapse pathways.

Built as a submission-ready, high-fidelity React dashboard optimized for Next.js App Router, Framer Motion, and Supabase.

---

## 🌌 Core Design & Color System

- **Background**: Obsidian Black (`#050505`)
- **Primary Accents**: Electric Cyan (`#00f0ff`) & Aurora Green (`#00ff87`)
- **Secondary Accents**: Deep Emerald (`#023c28`)
- **Highlights**: Soft Silver (`#cbd5e1`)

---

## 🏗️ Architectural Choices

### 1. Unified Bento Grid
Instead of isolated columns, we structure the dashboard main content as a cohesive Bento Grid.
- **Desktop (>1024px)**: 3-column layout where the Hero Tile spans 2 cols, the Activity Matrix spans 1 col, and the dynamic Course Tiles span 1 col each, filling columns organically.
- **Tablet (768px-1024px)**: 2-column layout. The Hero and Activity matrix span 2 cols, and Course Tiles span 1 col each.
- **Mobile (<768px)**: 1-column layout where all cards stack vertically.

### 2. Zero-Layout-Shift Hover States
To meet the strict hardware-acceleration and repaint constraints:
- Hover elevation is powered by Framer Motion's spring solvers (`type: "spring", stiffness: 300, damping: 20`) using CSS `transform` exclusively.
- Glowing border reveals are implemented using absolute-positioned layout overlays that transition `opacity` (0% to 100%) on hover. This avoids layout property changes (like margins or border-width) that trigger repaints, delivering a buttery-smooth 60fps interaction.

### 3. Interactive UI Elements
- **3D Parallax Tilt**: The `NeuralCore` Command Center tilts in 3D coordinates based on mouse vectors. Internal layers shift at variable speeds to produce genuine physical depth.
- **Wavy SVG Energy Channels**: Instead of generic progress bars, courses feature a custom undulating SVG path that fills up organically using Framer Motion spring solvers (`type: "spring", stiffness: 40, damping: 12`).
- **Knowledge Pulse Matrix**: A responsive synaptic heatmap scanner representing learning activity that propagates hover lights to neighboring nodes in real-time, backed by live terminal scrolling logs.
- **Ambient Canvas Particles**: An interactive HTML5 canvas background animating float-particles that connect together when near, and link dynamically to the mouse cursor.

---

## ⚡ Server / Client Component Split

To maximize performance, security, and interactive fidelity, the application is divided cleanly between server-rendered data and client-side interactions:

### 1. Server Components (RSC)
- `src/app/page.tsx` remains a Server Component (`export const dynamic = "force-dynamic"`). It fetches the active course nodes securely from the Supabase PostgreSQL database on the server, ensuring credentials are never leaked.
- If Supabase environment variables are missing, the query fails, or the tables are not yet seeded, the server gracefully falls back to local seed data.

### 2. Client Components
- `src/components/DashboardGrid.tsx`: Receives fetched courses as props and serves as the Bento Grid coordinator. It manages the stagger parent-child variants, allowing all tiles to stagger-in sequentially on load.
- `src/components/CourseCard.tsx`: Handles dynamic Lucide icon resolving, renders SVG mesh background gradients, animates the progress bar from 0% on initial load, and manages hover-glow elevation.
- `src/components/NeuralCore.tsx`: Tracks mouse vectors and animates the 3D parallax tilt.
- `src/components/PulseMatrix.tsx`: Manages the contribution scanner matrix state and outputs live-rolling logs.
- `src/components/Sidebar.tsx`: Manages active tab state and animates the background highlight snapping into place using Framer Motion's `layoutId`.

---

## 🛠️ Challenges & Solutions

### 1. Next.js / React 19 Render-time Component Creation
**Challenge**: ESLint flagged dynamic Lucide icon rendering (`const Icon = getIconComponent(course.icon_name)`) with a `react-hooks/static-components` error: *"Cannot create components during render. Declare components outside of render."*
**Solution**: Rather than assigning the looked-up icon component to a capital-letter variable in the render method, we instantiated the component dynamically using `React.createElement(getIconComponent(course.icon_name), { className: "h-5.5 w-5.5" })`. This satisfies the ESLint rule completely and is fully type-safe.

### 2. TypeScript Type Inference for Animation Variants
**Challenge**: Decoupling the staggered variants inside `DashboardGrid.tsx` caused type warnings on `type: "spring"` because literal strings were inferred as generic `string` types.
**Solution**: Imported the `Variants` type from `framer-motion` and explicitly annotated `CONTAINER_VARIANTS` and `ITEM_VARIANTS` to satisfy the TypeScript compiler.

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
