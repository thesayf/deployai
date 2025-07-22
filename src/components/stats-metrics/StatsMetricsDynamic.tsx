import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Design System Colors
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  electricOrange: '#FF6B35',
  crimsonRed: '#E63946',
  cyberBlue: '#457B9D',
  deepMagenta: '#D62598',
  concrete: '#F5F5F5',
  steel: '#E0E0E0',
  graphite: '#757575',
  charcoal: '#424242',
  obsidian: '#212121',
  emerald: '#00C851',
  amber: '#FFB300',
  sapphire: '#2196F3'
};

// Typography
const typography = {
  displayXL: 'text-6xl sm:text-7xl font-black leading-none tracking-tight',
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

interface StatItem {
  id: string;
  value: string | number;
  label: string;
  description?: string;
  prefix?: string;
  suffix?: string;
  color?: 'orange' | 'blue' | 'magenta' | 'red' | 'emerald' | 'amber';
  animate?: boolean;
  animationDuration?: number;
}

interface StatsMetricsDynamicProps {
  stats: StatItem[];
  title?: string;
  subtitle?: string;
  variant?: 'chaos' | 'circular' | 'stack' | 'zigzag' | 'orbit' | 'wave';
  className?: string;
}

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

export const StatsMetricsDynamic: React.FC<StatsMetricsDynamicProps> = ({
  stats,
  title,
  subtitle,
  variant = 'chaos',
  className = '',
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const renderChaosLayout = () => {
    const positions = [
      { top: '10%', left: '15%', rotate: -15 },
      { top: '5%', right: '20%', rotate: 25 },
      { bottom: '20%', left: '10%', rotate: -8 },
      { bottom: '15%', right: '15%', rotate: 12 },
      { top: '40%', left: '35%', rotate: -20 },
      { top: '35%', right: '30%', rotate: 30 },
    ];

    return (
      <div 
        className="relative h-[600px] overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {stats.map((stat, index) => {
          const position = positions[index % positions.length];
          const accentColor = stat.color ? colorMap[stat.color] : colors.electricOrange;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: position.rotate,
              }}
              transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              style={{
                position: 'absolute',
                ...position,
              }}
              whileHover={{ 
                scale: 1.1, 
                rotate: position.rotate * -1,
                transition: { type: 'spring', stiffness: 300 }
              }}
            >
              <div
                style={{
                  background: colors.white,
                  border: `4px solid ${colors.black}`,
                  boxShadow: `8px 8px 0px ${colors.black}`,
                  padding: '32px',
                  transform: `rotate(${position.rotate}deg)`,
                }}
                className="cursor-pointer"
              >
                <div
                  className={typography.displayM}
                  style={{ 
                    color: accentColor,
                    textShadow: `2px 2px 0px ${colors.black}`,
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
                  className={`${typography.bodyM} uppercase mt-2`}
                  style={{ color: colors.obsidian }}
                >
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderCircularLayout = () => {
    const radius = 200;
    const centerX = 250;
    const centerY = 250;

    return (
      <div className="relative h-[500px] flex items-center justify-center">
        {/* Center circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            background: `linear-gradient(135deg, ${colors.electricOrange}, ${colors.crimsonRed})`,
            border: `4px solid ${colors.black}`,
            boxShadow: `6px 6px 0px ${colors.black}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {title && (
            <h3 
              className={`${typography.headingM} text-center uppercase`}
              style={{ color: colors.white }}
            >
              {title}
            </h3>
          )}
        </motion.div>

        {/* Orbiting stats */}
        {stats.map((stat, index) => {
          const angle = (index * 360) / stats.length;
          const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
          const accentColor = stat.color ? colorMap[stat.color] : colors.electricOrange;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: [0, 360],
              }}
              transition={{
                opacity: { delay: index * 0.1 },
                scale: { delay: index * 0.1 },
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                style={{
                  background: colors.white,
                  border: `3px solid ${colors.black}`,
                  boxShadow: `6px 6px 0px ${colors.black}`,
                  padding: '24px',
                  minWidth: '150px',
                }}
              >
                <div
                  className={typography.displayS}
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
                  className={`${typography.caption} uppercase`}
                  style={{ color: colors.obsidian }}
                >
                  {stat.label}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderStackLayout = () => {
    return (
      <div className="relative max-w-2xl mx-auto">
        {stats.map((stat, index) => {
          const accentColor = stat.color ? colorMap[stat.color] : colors.electricOrange;
          const offset = index * 20;
          const rotation = index % 2 === 0 ? -2 : 2;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 100, rotate: 0 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotate: rotation,
              }}
              transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: 0,
                zIndex: 50,
              }}
              style={{
                position: 'relative',
                marginBottom: '-60px',
                zIndex: stats.length - index,
                transform: `translateX(${offset}px)`,
              }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${colors.white}, ${accentColor}20)`,
                  border: `4px solid ${colors.black}`,
                  boxShadow: `10px 10px 0px ${colors.black}`,
                  padding: '40px',
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className={typography.displayL}
                      style={{ 
                        color: accentColor,
                        textShadow: `3px 3px 0px ${colors.black}`,
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
                      className={`${typography.headingM} uppercase`}
                      style={{ color: colors.black }}
                    >
                      {stat.label}
                    </div>
                    {stat.description && (
                      <p
                        className={typography.bodyS}
                        style={{ color: colors.charcoal }}
                      >
                        {stat.description}
                      </p>
                    )}
                  </div>
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: accentColor,
                      transform: 'rotate(45deg)',
                      border: `3px solid ${colors.black}`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderZigzagLayout = () => {
    return (
      <div className="max-w-4xl mx-auto">
        {stats.map((stat, index) => {
          const accentColor = stat.color ? colorMap[stat.color] : colors.electricOrange;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100,
              }}
              className={`flex ${isEven ? 'justify-start' : 'justify-end'} mb-8`}
            >
              <motion.div
                whileHover={{ scale: 1.05, x: isEven ? 10 : -10 }}
                className="relative"
                style={{ width: '70%' }}
              >
                {/* Connecting line */}
                {index < stats.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      [isEven ? 'right' : 'left']: '-35%',
                      width: '70%',
                      height: '3px',
                      background: colors.black,
                      transform: `rotate(${isEven ? '25deg' : '-25deg'})`,
                      zIndex: -1,
                    }}
                  />
                )}

                <div
                  style={{
                    background: colors.white,
                    border: `4px solid ${colors.black}`,
                    boxShadow: `8px 8px 0px ${accentColor}`,
                    padding: '32px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Accent corner */}
                  <div
                    style={{
                      position: 'absolute',
                      [isEven ? 'top' : 'bottom']: 0,
                      [isEven ? 'left' : 'right']: 0,
                      width: '0',
                      height: '0',
                      borderStyle: 'solid',
                      borderWidth: isEven ? '80px 80px 0 0' : '0 0 80px 80px',
                      borderColor: isEven 
                        ? `${accentColor} transparent transparent transparent`
                        : `transparent transparent ${accentColor} transparent`,
                    }}
                  />

                  <div className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-6`}>
                    <div className="flex-1">
                      <div
                        className={typography.displayM}
                        style={{ color: colors.black }}
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
                        className={`${typography.headingS} uppercase`}
                        style={{ color: accentColor }}
                      >
                        {stat.label}
                      </div>
                    </div>
                    <div
                      className={typography.displayXL}
                      style={{ 
                        color: colors.concrete,
                        fontFamily: 'monospace',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderWaveLayout = () => {
    return (
      <div className="relative overflow-hidden py-16">
        {/* Wave background */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z"
            fill={`${colors.electricOrange}20`}
            stroke={colors.black}
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>

        {/* Stats on wave */}
        <div className="relative z-10 flex justify-around items-end h-[300px]">
          {stats.map((stat, index) => {
            const accentColor = stat.color ? colorMap[stat.color] : colors.electricOrange;
            const height = 150 + Math.sin((index / stats.length) * Math.PI) * 100;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { delay: index * 0.1 },
                  y: {
                    delay: index * 0.1,
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                }}
                style={{ marginBottom: `${height}px` }}
              >
                <div
                  style={{
                    background: colors.white,
                    border: `3px solid ${colors.black}`,
                    boxShadow: `6px 6px 0px ${colors.black}`,
                    padding: '24px',
                    textAlign: 'center',
                    minWidth: '140px',
                  }}
                >
                  <div
                    className={typography.displayS}
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
                    className={`${typography.caption} uppercase`}
                    style={{ color: colors.obsidian }}
                  >
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderOrbitLayout = () => {
    return (
      <div 
        className="relative h-[600px] flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        {/* Central stat */}
        {stats[0] && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: 'absolute',
              zIndex: 20,
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${colors.electricOrange}, ${colors.crimsonRed})`,
                border: `4px solid ${colors.black}`,
                boxShadow: `8px 8px 0px ${colors.black}`,
                padding: '48px',
                textAlign: 'center',
              }}
            >
              <div
                className={typography.displayL}
                style={{ color: colors.white }}
              >
                <AnimatedStatValue
                  value={stats[0].value}
                  prefix={stats[0].prefix}
                  suffix={stats[0].suffix}
                  animate={stats[0].animate}
                  duration={stats[0].animationDuration}
                  inView={inView}
                />
              </div>
              <div
                className={`${typography.headingM} uppercase`}
                style={{ color: colors.white }}
              >
                {stats[0].label}
              </div>
            </div>
          </motion.div>
        )}

        {/* Orbiting stats */}
        {stats.slice(1).map((stat, index) => {
          const accentColor = stat.color ? colorMap[stat.color] : colors.cyberBlue;
          const orbitRadius = 250;
          const speed = 20 + index * 5;

          return (
            <motion.div
              key={stat.id}
              style={{
                position: 'absolute',
                width: `${orbitRadius * 2}px`,
                height: `${orbitRadius * 2}px`,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: speed,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '100%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  rotateY: [0, -360],
                }}
                transition={{
                  duration: speed,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div
                  style={{
                    background: colors.white,
                    border: `3px solid ${colors.black}`,
                    boxShadow: `4px 4px 0px ${accentColor}`,
                    padding: '20px',
                    minWidth: '120px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    className={typography.headingL}
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
                    className={`${typography.caption} uppercase`}
                    style={{ color: colors.obsidian }}
                  >
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const layouts = {
    chaos: renderChaosLayout,
    circular: renderCircularLayout,
    stack: renderStackLayout,
    zigzag: renderZigzagLayout,
    wave: renderWaveLayout,
    orbit: renderOrbitLayout,
  };

  const renderLayout = layouts[variant] || layouts.chaos;

  return (
    <section className={`w-full ${className}`} ref={ref}>
      {/* Header */}
      {(title || subtitle) && variant !== 'circular' && (
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

      {/* Dynamic Layout */}
      {renderLayout()}
    </section>
  );
};