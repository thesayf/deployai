import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ImprovementMetricsProps } from '../types';

// Animated counter hook
const useAnimatedCounter = (
  end: number,
  duration: number = 2000,
  shouldAnimate: boolean = true
) => {
  const [count, setCount] = useState(shouldAnimate ? 0 : end);

  useEffect(() => {
    if (!shouldAnimate) return;
    
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
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

// Separate component for metric card to avoid hook rules violation
interface MetricCardProps {
  improvement: {
    metric: string;
    currentState: string;
    projectedState: string;
    improvement: string;
  };
  index: number;
  controls: any;
  inView: boolean;
  styles: any;
  variant: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  improvement, 
  index, 
  controls, 
  inView, 
  styles,
  variant 
}) => {
  // Extract percentage from improvement string (e.g., "95% faster" -> 95)
  const extractPercentage = (improvement: string): number => {
    const match = improvement.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };
  
  const percentage = extractPercentage(improvement.improvement);
  const animatedValue = useAnimatedCounter(percentage, 2000, inView);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5,
            delay: index * 0.15
          }
        }
      }}
      className={`border-3 ${styles.card} p-6 text-center`}
      style={{
        boxShadow: variant === 'executive' || variant === 'playful'
          ? '6px 6px 0 rgba(0,0,0,0.2)'
          : undefined
      }}
    >
      {/* Metric Name */}
      <h3 className={`text-lg font-black uppercase mb-6 ${styles.metric}`}>
        {improvement.metric}
      </h3>

      {/* Before/After Comparison */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className={`px-4 py-3 border-2 ${styles.current} font-bold text-sm`}>
          {improvement.currentState}
        </div>
        
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`text-3xl ${styles.arrow}`}
        >
          →
        </motion.div>
        
        <div className={`px-4 py-3 border-2 ${styles.projected} font-bold text-sm`}>
          {improvement.projectedState}
        </div>
      </div>

      {/* Improvement Percentage */}
      <motion.div
        initial={{ scale: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            transition: {
              duration: 0.5,
              delay: 0.5 + index * 0.15,
              type: "spring",
              stiffness: 200
            }
          }
        }}
        className={`inline-block px-4 py-2 border-2 ${styles.improvementBg}`}
      >
        <div className={`text-3xl font-black ${styles.improvement}`}>
          {variant === 'minimal' ? (
            improvement.improvement
          ) : (
            <>
              {animatedValue}% 
              <span className="text-lg ml-1">
                {improvement.improvement.replace(/\d+%?\s*/, '')}
              </span>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ImprovementMetrics: React.FC<ImprovementMetricsProps> = ({
  improvements,
  variant = 'executive',
  className = ''
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Extract percentage from improvement string (e.g., "95% faster" -> 95)
  const extractPercentage = (improvement: string): number => {
    const match = improvement.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'impact':
        return {
          container: 'bg-black text-white',
          card: 'bg-gradient-to-br from-gray-900 to-black border-yellow-400',
          metric: 'text-yellow-400',
          current: 'bg-red-600 text-white border-red-400',
          projected: 'bg-green-500 text-white border-green-400',
          arrow: 'text-yellow-400',
          improvement: 'text-green-400',
          improvementBg: 'bg-green-900/50 border-green-400'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-green-50 to-cyan-50',
          card: 'bg-white border-black hover:shadow-2xl transition-all',
          metric: 'text-gray-900',
          current: 'bg-gradient-to-r from-red-400 to-pink-400 text-white border-black',
          projected: 'bg-gradient-to-r from-green-400 to-emerald-400 text-white border-black',
          arrow: 'text-orange-500',
          improvement: 'text-green-600',
          improvementBg: 'bg-green-100 border-green-600'
        };
      case 'minimal':
        return {
          container: 'bg-gray-50',
          card: 'bg-white border-gray-300',
          metric: 'text-gray-900',
          current: 'bg-gray-200 text-gray-700 border-gray-400',
          projected: 'bg-gray-800 text-white border-gray-900',
          arrow: 'text-gray-500',
          improvement: 'text-gray-900',
          improvementBg: 'bg-gray-100 border-gray-400'
        };
      default: // executive
        return {
          container: 'bg-gray-50',
          card: 'bg-white border-black shadow-hard',
          metric: 'text-gray-900',
          current: 'bg-red-500 text-white border-black',
          projected: 'bg-green-500 text-white border-black',
          arrow: 'text-blue-600',
          improvement: 'text-green-600',
          improvementBg: 'bg-green-50 border-green-600'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`p-8 ${styles.container} ${className}`} ref={ref}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
            Expected Improvements
          </h2>
          <div className="w-24 h-1 bg-current"></div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {improvements.map((improvement, index) => (
            <MetricCard
              key={index}
              improvement={improvement}
              index={index}
              controls={controls}
              inView={inView}
              styles={styles}
              variant={variant}
            />
          ))}
        </div>

        {/* Visual Impact Statement */}
        {(variant === 'executive' || variant === 'impact') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className={`inline-block px-8 py-4 border-3 ${
              variant === 'impact' ? 'bg-yellow-400 text-black border-white' : 'bg-blue-100 border-blue-900'
            }`}>
              <p className="text-lg font-bold">
                Total efficiency gain across all metrics: {' '}
                <span className="text-2xl">
                  {Math.round(improvements.reduce((acc, imp) => 
                    acc + extractPercentage(imp.improvement), 0
                  ) / improvements.length)}%
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};