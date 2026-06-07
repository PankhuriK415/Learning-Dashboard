"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Course } from "@/lib/types";
import NeuralCore from "./NeuralCore";
import PulseMatrix from "./PulseMatrix";
import CourseCard from "./CourseCard";

interface DashboardGridProps {
  courses: Course[];
}

const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function DashboardGrid({ courses }: DashboardGridProps) {
  return (
    <motion.div
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start w-full"
    >
      {/* 1. Hero Tile (Spans 2 columns on desktop & tablet) */}
      <motion.section 
        variants={ITEM_VARIANTS} 
        id="core" 
        className="md:col-span-2 scroll-mt-24 h-full"
      >
        <NeuralCore />
      </motion.section>

      {/* 2. Activity Tile (Spans 1 column on desktop, 2 columns on tablet, stacks on mobile) */}
      <motion.aside 
        variants={ITEM_VARIANTS} 
        id="pulse" 
        className="lg:col-span-1 md:col-span-2 scroll-mt-24 h-full"
      >
        <PulseMatrix />
      </motion.aside>

      {/* 3. Course Tiles (Each spans 1 column) */}
      {courses.map((course, idx) => (
        <motion.div
          key={course.id}
          variants={ITEM_VARIANTS}
          className="h-full"
        >
          <CourseCard course={course} index={idx} />
        </motion.div>
      ))}
    </motion.div>
  );
}
