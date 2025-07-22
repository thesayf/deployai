import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Design System Colors
const colors = {
  // Foundation
  white: '#FFFFFF',
  black: '#000000',
  
  // Primary Brand
  electricOrange: '#FF6B35',
  crimsonRed: '#E63946',
  cyberBlue: '#457B9D',
  deepMagenta: '#D62598',
  
  // Neutrals
  concrete: '#F5F5F5',
  steel: '#E0E0E0',
  graphite: '#757575',
  charcoal: '#424242',
  obsidian: '#212121',
  
  // Semantic
  emerald: '#00C851',
  amber: '#FFB300',
  sapphire: '#2196F3'
};

// Design System Typography
const typography = {
  displayL: 'text-5xl sm:text-6xl font-black leading-none tracking-tight',
  displayM: 'text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight',
  displayS: 'text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight',
  headingL: 'text-2xl font-bold leading-snug',
  headingM: 'text-xl font-semibold leading-snug',
  headingS: 'text-lg font-semibold leading-snug',
  bodyL: 'text-lg font-normal leading-relaxed',
  bodyM: 'text-base font-normal leading-relaxed',
  bodyS: 'text-sm font-normal leading-normal',
  caption: 'text-xs font-medium leading-tight tracking-wide'
};

// Simple icon components
const TargetIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M9.5 21C7.5 21 6 20 6 20s1-3 1-5c0-2.5 1.5-5 4-6.5C13.5 7 16 7 18 7c1 0 2 0 3 1-1 1-1 2-1 3 0 2-0.5 4.5-2 7-1.5 2.5-4 4-6.5 4-2 0-5 1-5 1s0-1 2-2z" />
    <path d="M6 12l-3 3m12-12l3-3" />
  </svg>
);

const CodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
}

interface TimelineStep {
  id: string;
  week: number;
  title: string;
  description: string;
  tasks: Task[];
  icon: 'target' | 'rocket' | 'code' | 'users';
  color: 'orange' | 'blue' | 'magenta' | 'red';
}

interface TimelineProcessProps {
  steps?: TimelineStep[];
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'compact' | 'vertical';
  showProgress?: boolean;
  className?: string;
  darkMode?: boolean;
}

const defaultSteps: TimelineStep[] = [
  {
    id: 'week-1',
    week: 1,
    title: 'Planning & Wireframing',
    description: 'We map out your entire MVP, from user flows to technical architecture',
    icon: 'target',
    color: 'orange',
    tasks: [
      {
        id: 'task-1-1',
        title: 'Complete Product Blueprint',
        description: 'Full requirements document with user stories, feature prioritization, and success metrics',
        status: 'completed',
      },
      {
        id: 'task-1-2',
        title: 'Interactive Wireframes',
        description: 'Clickable prototypes of all key screens showing user journey and core functionality',
        status: 'completed',
      },
      {
        id: 'task-1-3',
        title: 'Technical Architecture Plan',
        description: 'Database schema, API structure, and technology stack decisions documented',
        status: 'completed',
      },
    ],
  },
  {
    id: 'week-2',
    week: 2,
    title: 'Frontend Sprint',
    description: 'Building your product\'s user interface with pixel-perfect implementation',
    icon: 'rocket',
    color: 'blue',
    tasks: [
      {
        id: 'task-2-1',
        title: 'Complete UI Implementation',
        description: 'All screens built with React/Next.js, responsive and pixel-perfect',
        status: 'completed',
      },
      {
        id: 'task-2-2',
        title: 'User Interactions & Animations',
        description: 'Smooth transitions, loading states, and delightful micro-interactions',
        status: 'in-progress',
      },
      {
        id: 'task-2-3',
        title: 'Component Library Documentation',
        description: 'Reusable component system documented for future development',
        status: 'pending',
      },
    ],
  },
  {
    id: 'week-3',
    week: 3,
    title: 'Backend Sprint',
    description: 'Building the engine that powers your MVP with secure, scalable infrastructure',
    icon: 'code',
    color: 'magenta',
    tasks: [
      {
        id: 'task-3-1',
        title: 'Database & API Development',
        description: 'Complete database setup, REST APIs, and authentication systems',
        status: 'pending',
      },
      {
        id: 'task-3-2',
        title: 'Payment & User Management',
        description: 'Stripe integration, user accounts, and role-based admin dashboard',
        status: 'pending',
      },
      {
        id: 'task-3-3',
        title: 'AI Integration & Third-party APIs',
        description: 'OpenAI/Claude integration and external service connections',
        status: 'pending',
      },
    ],
  },
  {
    id: 'week-4',
    week: 4,
    title: 'Revisions & Handover',
    description: 'Final polish, testing, deployment, and everything you need to go live',
    icon: 'users',
    color: 'red',
    tasks: [
      {
        id: 'task-4-1',
        title: 'Complete Testing & Bug Fixes',
        description: 'Full QA testing, performance optimization, and bug resolution',
        status: 'pending',
      },
      {
        id: 'task-4-2',
        title: 'Production Deployment',
        description: 'Live deployment, SSL setup, domain config, and monitoring tools',
        status: 'pending',
      },
      {
        id: 'task-4-3',
        title: 'Documentation & Training',
        description: 'Complete code documentation and personalized walkthrough session',
        status: 'pending',
      },
    ],
  },
];

const iconMap = {
  target: TargetIcon,
  rocket: RocketIcon,
  code: CodeIcon,
  users: UsersIcon,
};

const colorMap = {
  orange: colors.electricOrange,
  blue: colors.cyberBlue,
  magenta: colors.deepMagenta,
  red: colors.crimsonRed,
};

export const TimelineProcess: React.FC<TimelineProcessProps> = ({
  steps = defaultSteps,
  title = 'Your Next 4 Weeks With Us',
  subtitle = 'From concept to launch in 30 days',
  variant = 'default',
  showProgress = true,
  className = '',
  darkMode = false,
}) => {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const getStepProgress = (step: TimelineStep): number => {
    const completedTasks = step.tasks.filter(task => task.status === 'completed').length;
    return (completedTasks / step.tasks.length) * 100;
  };

  const getOverallProgress = (): number => {
    const totalTasks = steps.reduce((acc, step) => acc + step.tasks.length, 0);
    const completedTasks = steps.reduce(
      (acc, step) => acc + step.tasks.filter(task => task.status === 'completed').length,
      0
    );
    return Math.round((completedTasks / totalTasks) * 100);
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckIcon className="w-4 h-4" />;
      case 'in-progress':
        return <ClockIcon className="w-4 h-4" />;
      case 'pending':
        return <div className="w-4 h-4 rounded-full border-2 border-current" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return colors.emerald;
      case 'in-progress':
        return colors.sapphire;
      case 'pending':
        return colors.graphite;
    }
  };

  const renderTimelineStep = (step: TimelineStep, index: number) => {
    const Icon = iconMap[step.icon];
    const isExpanded = expandedSteps.has(step.id);
    const progress = getStepProgress(step);
    const isActive = step.tasks.some(task => task.status === 'in-progress');
    const isCompleted = step.tasks.every(task => task.status === 'completed');

    return (
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative"
      >
        {/* Connector Line (for non-vertical variants) */}
        {variant !== 'vertical' && index < steps.length - 1 && (
          <div
            className="absolute hidden lg:block"
            style={{
              right: '-50%',
              top: '48px',
              width: '100%',
              height: '4px',
              background: progress >= 100 ? colors.emerald : colors.steel,
              border: `2px solid ${colors.black}`,
              zIndex: 0,
            }}
          />
        )}

        <div
          className="relative cursor-pointer group"
          style={{
            background: colors.white,
            border: `4px solid ${colors.black}`,
            boxShadow: isActive ? `8px 8px 0px ${colors.black}` : `6px 6px 0px ${colors.black}`,
            transition: 'all 0.15s ease',
            transform: 'translate(0, 0)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.transform = 'translate(-2px, -2px)';
            el.style.boxShadow = `8px 8px 0px ${colors.black}`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.transform = 'translate(0, 0)';
            el.style.boxShadow = isActive ? `8px 8px 0px ${colors.black}` : `6px 6px 0px ${colors.black}`;
          }}
          onClick={() => toggleStep(step.id)}
        >
          {/* Progress Bar */}
          {showProgress && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '8px',
                background: colors.steel,
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                style={{
                  height: '100%',
                  background: isCompleted 
                    ? colors.emerald 
                    : `linear-gradient(90deg, ${colorMap[step.color]}, ${colors.crimsonRed})`,
                }}
              />
            </div>
          )}

          {/* Header */}
          <div className="p-6 pb-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  style={{
                    background: colorMap[step.color],
                    color: colors.white,
                    width: '56px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `3px solid ${colors.black}`,
                    boxShadow: `3px 3px 0px ${colors.black}`,
                  }}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <span
                    className={`${typography.caption} uppercase`}
                    style={{
                      color: colors.charcoal,
                      letterSpacing: '1px',
                      fontWeight: 700,
                    }}
                  >
                    Week {step.week}
                  </span>
                  <h3
                    className={typography.headingL}
                    style={{ color: colors.black }}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>
              <div
                style={{
                  background: colors.white,
                  border: `2px solid ${colors.black}`,
                  padding: '6px',
                  boxShadow: `2px 2px 0px ${colors.black}`,
                  transition: 'transform 0.2s ease',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <ChevronIcon className="w-5 h-5" />
              </div>
            </div>

            <p
              className={typography.bodyM}
              style={{
                color: colors.charcoal,
                marginBottom: '24px',
              }}
            >
              {step.description}
            </p>
          </div>

          {/* Tasks (Expandable) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  style={{
                    borderTop: `3px solid ${colors.black}`,
                    padding: '24px',
                    background: colors.concrete,
                  }}
                >
                  <h4
                    className={`${typography.headingS} uppercase mb-4`}
                    style={{ color: colors.black }}
                  >
                    Tasks & Deliverables
                  </h4>
                  <div className="space-y-3">
                    {step.tasks.map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                        style={{
                          background: colors.white,
                          border: `2px solid ${colors.black}`,
                          padding: '20px',
                          paddingTop: '56px',
                          boxShadow: `3px 3px 0px ${colors.black}`,
                        }}
                      >
                        {/* Status Badge - Positioned at top right */}
                        <div
                          className="absolute top-3 right-3"
                          style={{
                            padding: '4px 12px',
                            background: getStatusColor(task.status),
                            color: colors.white,
                            border: `2px solid ${colors.black}`,
                            boxShadow: `2px 2px 0px ${colors.black}`,
                          }}
                        >
                          <span className={`${typography.caption} uppercase font-bold`}>
                            {task.status.replace('-', ' ')}
                          </span>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div
                            style={{
                              color: getStatusColor(task.status),
                              flexShrink: 0,
                            }}
                          >
                            {getStatusIcon(task.status)}
                          </div>
                          <div className="flex-1">
                            <h5
                              className={typography.bodyM}
                              style={{
                                color: colors.black,
                                fontWeight: 600,
                                marginBottom: '8px',
                              }}
                            >
                              {task.title}
                            </h5>
                            <p
                              className={typography.bodyS}
                              style={{ color: colors.graphite }}
                            >
                              {task.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status Badge */}
          <div
            className="absolute -top-3 -right-3"
            style={{
              background: isCompleted ? colors.emerald : isActive ? colors.sapphire : colors.white,
              color: isCompleted || isActive ? colors.white : colors.black,
              border: `3px solid ${colors.black}`,
              padding: '8px 16px',
              boxShadow: `3px 3px 0px ${colors.black}`,
              zIndex: 10,
            }}
          >
            <span className={`${typography.caption} uppercase font-bold`}>
              {isCompleted ? 'Complete' : isActive ? 'Active' : `${progress}%`}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className={`w-full ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2
              className={`${typography.displayM} uppercase`}
              style={{
                color: darkMode ? colors.white : colors.black,
                textShadow: darkMode 
                  ? `3px 3px 0px ${colors.black}, 4px 4px 0px ${colors.electricOrange}` 
                  : `3px 3px 0px ${colors.electricOrange}`,
                marginBottom: '16px',
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className={typography.bodyL}
              style={{
                color: darkMode ? colors.steel : colors.charcoal,
                maxWidth: '48rem',
                margin: '0 auto',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Overall Progress */}
      {showProgress && (
        <div className="max-w-4xl mx-auto mb-12">
          <div
            style={{
              background: colors.white,
              border: `3px solid ${colors.black}`,
              padding: '24px',
              boxShadow: `4px 4px 0px ${colors.black}`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3
                className={`${typography.headingS} uppercase`}
                style={{ color: colors.black }}
              >
                Overall Progress
              </h3>
              <span
                className={`${typography.displayS}`}
                style={{ color: colors.electricOrange }}
              >
                {getOverallProgress()}%
              </span>
            </div>
            <div
              style={{
                height: '20px',
                background: colors.steel,
                border: `2px solid ${colors.black}`,
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getOverallProgress()}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${colors.electricOrange}, ${colors.crimsonRed})`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Timeline Steps */}
      <div
        className={
          variant === 'vertical'
            ? 'max-w-3xl mx-auto space-y-6'
            : variant === 'compact'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'
            : 'grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'
        }
      >
        {steps.map((step, index) => renderTimelineStep(step, index))}
      </div>
    </section>
  );
};