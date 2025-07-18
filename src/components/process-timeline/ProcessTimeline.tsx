"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  Code,
  Rocket,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
}

interface Week {
  id: string;
  week: number;
  title: string;
  description: string;
  tasks: Task[];
  icon: React.ReactNode;
  color: string;
}

interface ProcessTimelineProps {
  weeks?: Week[];
  className?: string;
}

const defaultWeeks: Week[] = [
  {
    id: "week-1",
    week: 1,
    title: "Planning & Wireframing",
    description:
      "We map out your entire MVP, from user flows to technical architecture",
    icon: <Target className="h-5 w-5" />,
    color: "bg-emerald-500",
    tasks: [
      {
        id: "task-1-1",
        title: "Complete Product Blueprint",
        description:
          "Full requirements document with user stories, feature prioritization, and success metrics",
        status: "completed",
      },
      {
        id: "task-1-2",
        title: "Interactive Wireframes",
        description: "Clickable prototypes of all key screens showing user journey and core functionality",
        status: "completed",
      },
      {
        id: "task-1-3",
        title: "Technical Architecture Plan",
        description: "Database schema, API structure, and technology stack decisions documented",
        status: "completed",
      },
    ],
  },
  {
    id: "week-2",
    week: 2,
    title: "Frontend Sprint",
    description: "Building your product's user interface with pixel-perfect implementation",
    icon: <Rocket className="h-5 w-5" />,
    color: "bg-blue-500",
    tasks: [
      {
        id: "task-2-1",
        title: "Complete UI Implementation",
        description: "All screens built with React/Next.js, responsive and pixel-perfect",
        status: "completed",
      },
      {
        id: "task-2-2",
        title: "User Interactions & Animations",
        description: "Smooth transitions, loading states, and delightful micro-interactions",
        status: "in-progress",
      },
      {
        id: "task-2-3",
        title: "Component Library Documentation",
        description: "Reusable component system documented for future development",
        status: "pending",
      },
    ],
  },
  {
    id: "week-3",
    week: 3,
    title: "Backend Sprint",
    description: "Building the engine that powers your MVP with secure, scalable infrastructure",
    icon: <Code className="h-5 w-5" />,
    color: "bg-purple-500",
    tasks: [
      {
        id: "task-3-1",
        title: "Database & API Development",
        description: "Complete database setup, REST APIs, and authentication systems",
        status: "in-progress",
      },
      {
        id: "task-3-2",
        title: "Payment & User Management",
        description: "Stripe integration, user accounts, and role-based admin dashboard",
        status: "pending",
      },
      {
        id: "task-3-3",
        title: "AI Integration & Third-party APIs",
        description: "OpenAI/Claude integration and external service connections",
        status: "pending",
      },
    ],
  },
  {
    id: "week-4",
    week: 4,
    title: "Revisions & Handover",
    description: "Final polish, testing, deployment, and everything you need to go live",
    icon: <Users className="h-5 w-5" />,
    color: "bg-orange-500",
    tasks: [
      {
        id: "task-4-1",
        title: "Complete Testing & Bug Fixes",
        description: "Full QA testing, performance optimization, and bug resolution",
        status: "pending",
      },
      {
        id: "task-4-2",
        title: "Production Deployment",
        description: "Live deployment, SSL setup, domain config, and monitoring tools",
        status: "pending",
      },
      {
        id: "task-4-3",
        title: "Documentation & Training",
        description: "Complete code documentation and personalized walkthrough session",
        status: "pending",
      },
    ],
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const expandedContentVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

function WeekCard({ week, index }: { week: Week; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "pending":
        return "Pending";
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className={cn("rounded-xl p-3 text-white", week.color)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {week.icon}
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Week {week.week}
            </h3>
          </div>
        </div>
      </div>

      {/* Title and Description */}
      <div className="mb-4">
        <h4 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {week.title}
        </h4>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {week.description}
        </p>
      </div>

      {/* Expandable Tasks */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={expandedContentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <motion.div
              variants={childVariants}
              className="border-t border-gray-200 pt-4 dark:border-gray-700"
            >
              <h5 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Calendar className="h-4 w-4" />
                Tasks & Deliverables
              </h5>
              <div className="space-y-3">
                {week.tasks.map((task, taskIndex) => (
                  <motion.div
                    key={task.id}
                    variants={childVariants}
                    custom={taskIndex}
                    className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700"
                  >
                    <div className="mt-0.5">{getStatusIcon(task.status)}</div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <h6 className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </h6>
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap",
                            task.status === "completed" &&
                              "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                            task.status === "in-progress" &&
                              "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                            task.status === "pending" &&
                              "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                          )}
                        >
                          {getStatusText(task.status)}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                        {task.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click to expand hint */}
      <motion.div
        className="mt-4 text-center"
        animate={{ opacity: isExpanded ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Click to {isExpanded ? "collapse" : "view tasks"}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function ProcessTimeline({
  weeks = defaultWeeks,
  className,
}: ProcessTimelineProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl py-16 px-6", className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-center"
      >
        <h2 className="mx-auto lg:max-w-4xl text-center text-4xl font-black leading-tight md:text-6xl md:leading-tight">
          Your Next 4 Weeks With Us
        </h2>
      </motion.div>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {weeks.map((week, index) => (
          <motion.div
            key={week.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: index * 0.1 + 0.3,
              mass: 0.8,
            }}
          >
            <WeekCard week={week} index={index} />
          </motion.div>
        ))}
      </div>

    </div>
  );
}

export default ProcessTimeline;
