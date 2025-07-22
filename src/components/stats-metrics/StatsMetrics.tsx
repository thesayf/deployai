import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
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

const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M9.5 21C7.5 21 6 20 6 20s1-3 1-5c0-2.5 1.5-5 4-6.5C13.5 7 16 7 18 7c1 0 2 0 3 1-1 1-1 2-1 3 0 2-0.5 4.5-2 7-1.5 2.5-4 4-6.5 4-2 0-5 1-5 1s0-1 2-2z" />
    <path d="M6 12l-3 3m12-12l3-3" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

interface StatItem {
  id: string;
  value: string | number;
  label: string;
  description?: string;
  icon?: 'trending' | 'users' | 'rocket' | 'star' | 'chart' | 'clock';
  prefix?: string;
  suffix?: string;
  color?: 'orange' | 'blue' | 'magenta' | 'red' | 'emerald' | 'amber';
  animate?: boolean;
  animationDuration?: number;
}

interface StatsMetricsProps {
  stats: StatItem[];
  title?: string;
  subtitle?: string;
  variant?: 'grid' | 'cards' | 'minimal' | 'featured';
  columns?: 2 | 3 | 4;
  showIcons?: boolean;
  animateOnScroll?: boolean;
  className?: string;
}

const iconMap = {
  trending: TrendingUpIcon,
  users: UsersIcon,
  rocket: RocketIcon,
  star: StarIcon,
  chart: ChartIcon,
  clock: ClockIcon,
};

const colorMap = {
  orange: colors.electricOrange,
  blue: colors.cyberBlue,
  magenta: colors.deepMagenta,
  red: colors.crimsonRed,
  emerald: colors.emerald,
  amber: colors.amber,
};

// Animated counter hook
const useAnimatedCounter = (
  end: number,
  duration: number = 2000,
  shouldAnimate: boolean = true
) => {
  const [count, setCount] = useState(shouldAnimate ? 0 : end);

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(end);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, shouldAnimate]);

  return count;
};

const AnimatedStatValue: React.FC<{
  value: string | number;
  prefix?: string;
  suffix?: string;
  animate?: boolean;
  duration?: number;
  inView: boolean;
}> = ({ value, prefix, suffix, animate = true, duration = 2000, inView }) => {
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value;
  const isNumber = !isNaN(numericValue);
  
  const animatedValue = useAnimatedCounter(
    isNumber ? numericValue : 0,
    duration,
    animate && isNumber && inView
  );

  if (!isNumber || !animate) {
    return (
      <>
        {prefix}
        {value}
        {suffix}
      </>
    );
  }

  return (
    <>
      {prefix}
      {animatedValue}
      {suffix}
    </>
  );
};

export const StatsMetrics: React.FC<StatsMetricsProps> = ({
  stats,
  title,
  subtitle,
  variant = 'grid',
  columns = 3,
  showIcons = true,
  animateOnScroll = true,
  className = '',
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const renderStatItem = (stat: StatItem, index: number) => {
    const Icon = stat.icon ? iconMap[stat.icon] : null;
    const accentColor = stat.color ? colorMap[stat.color] : colors.electricOrange;
    const isFeatured = variant === 'featured' && index === 0;

    if (variant === 'minimal') {
      return (
        <motion.div
          key={stat.id}
          variants={itemVariants}
          className="text-center"
        >
          <div
            className={typography.displayM}
            style={{ color: accentColor }}
          >
            <AnimatedStatValue
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              animate={stat.animate}
              duration={stat.animationDuration}
              inView={inView}
            />
          </div>
          <div
            className={`${typography.bodyM} uppercase`}
            style={{ color: colors.obsidian }}
          >
            {stat.label}
          </div>
        </motion.div>
      );
    }

    const statContent = (
      <motion.div
        key={stat.id}
        variants={itemVariants}
        className={`relative ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}`}
        style={{
          background: colors.white,
          border: `${isFeatured ? '4px' : '3px'} solid ${colors.black}`,
          boxShadow: `${isFeatured ? '8px 8px' : '6px 6px'} 0px ${colors.black}`,
          padding: isFeatured ? '48px' : variant === 'cards' ? '32px' : '24px',
          transition: 'all 0.15s ease',
          transform: 'translate(0, 0)',
          height: '100%',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = 'translate(-2px, -2px)';
          el.style.boxShadow = `${isFeatured ? '10px 10px' : '8px 8px'} 0px ${colors.black}`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = 'translate(0, 0)';
          el.style.boxShadow = `${isFeatured ? '8px 8px' : '6px 6px'} 0px ${colors.black}`;
        }}
      >
        {/* Accent Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: `linear-gradient(90deg, ${accentColor}, ${colors.crimsonRed})`,
          }}
        />

        <div className={`flex ${variant === 'cards' ? 'flex-col' : 'items-center'} gap-4`}>
          {/* Icon */}
          {showIcons && Icon && (
            <div
              style={{
                width: isFeatured ? '80px' : '56px',
                height: isFeatured ? '80px' : '56px',
                background: accentColor,
                color: colors.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `3px solid ${colors.black}`,
                boxShadow: `3px 3px 0px ${colors.black}`,
                flexShrink: 0,
              }}
            >
              <Icon className={isFeatured ? 'w-10 h-10' : 'w-7 h-7'} />
            </div>
          )}

          {/* Content */}
          <div className={`flex-1 ${variant === 'cards' ? 'text-center' : ''}`}>
            <div
              className={isFeatured ? typography.displayL : typography.displayS}
              style={{ 
                color: colors.black,
                marginBottom: '8px',
              }}
            >
              <AnimatedStatValue
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                animate={stat.animate}
                duration={stat.animationDuration}
                inView={inView}
              />
            </div>
            <div
              className={`${isFeatured ? typography.headingM : typography.bodyM} uppercase`}
              style={{ 
                color: colors.obsidian,
                marginBottom: stat.description ? '8px' : 0,
              }}
            >
              {stat.label}
            </div>
            {stat.description && (
              <p
                className={typography.bodyS}
                style={{ color: colors.graphite }}
              >
                {stat.description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );

    return statContent;
  };

  return (
    <section className={`w-full ${className}`} ref={ref}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2
              className={`${typography.displayM} uppercase`}
              style={{
                color: colors.black,
                textShadow: `3px 3px 0px ${colors.electricOrange}`,
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
                color: colors.charcoal,
                maxWidth: '48rem',
                margin: '0 auto',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={`
          grid gap-6 max-w-6xl mx-auto
          ${variant === 'minimal' ? `grid-cols-2 md:grid-cols-${columns}` : ''}
          ${variant === 'grid' ? `grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}` : ''}
          ${variant === 'cards' ? 'grid-cols-1 md:grid-cols-2' : ''}
          ${variant === 'featured' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
        `}
      >
        {stats.map((stat, index) => renderStatItem(stat, index))}
      </motion.div>
    </section>
  );
};