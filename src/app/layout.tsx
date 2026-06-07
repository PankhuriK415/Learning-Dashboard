import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neural Learning OS - Cognitive Knowledge Network",
  description:
    "An intelligent neural learning network and activity operating system. Navigate knowledge nodes, energy streams, and synapse pathways.",
  keywords: ["Neural Learning", "OS", "Synaptic Net", "AI Engineering", "Vercel", "Awwwards"],
  authors: [{ name: "Neural OS Design Lab" }],
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased dark`}
    >
      <body className="min-h-screen bg-obsidian text-silver-accent font-sans scanlines flex flex-col">
        {/* Living Background canvas particles */}
        <BackgroundCanvas />

        <div className="flex flex-1 min-h-screen">
          {/* Responsive Sidebar component */}
          <Sidebar />

          {/* Main workspace frame: Adjust margins to account for fixed sidebar */}
          <div className="flex-1 flex flex-col md:pl-20 lg:pl-64 pb-20 md:pb-0 relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
