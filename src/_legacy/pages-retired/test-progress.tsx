import React, { useEffect, useState, useRef } from 'react';
import { PipelineProgress, StageInfo } from '@/components/quiz/PipelineProgress';

const TestProgressPage = () => {
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('stage1');
  const [estimatedTime, setEstimatedTime] = useState<number>(80);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  
  // Test with shorter durations (20 seconds each)
  const STAGE_DURATIONS = {
    stage1: 20,
    stage2: 20,
    stage3: 20,
    stage4: 20
  };
  
  const businessName = "Acme Corporation";
  
  const [stageDetails, setStageDetails] = useState<StageInfo[]>([
    {
      id: 'stage1',
      name: 'Requirements',
      description: 'Understanding Your Requirements',
      progress: 25,
      status: 'active',
      icon: '1'
    },
    {
      id: 'stage2',
      name: 'Solutions',
      description: `Exploring Strategic Solutions for ${businessName}`,
      progress: 50,
      status: 'pending',
      icon: '2'
    },
    {
      id: 'stage3',
      name: 'Evaluation',
      description: 'Evaluating Optimal Approaches',
      progress: 75,
      status: 'pending',
      icon: '3'
    },
    {
      id: 'stage4',
      name: 'Roadmap',
      description: 'Finalizing Your Strategic Roadmap',
      progress: 100,
      status: 'pending',
      icon: '4'
    }
  ]);
  
  const INSPIRATIONAL_QUOTES = [
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
    { text: "Growth and comfort do not coexist.", author: "Ginni Rometty, IBM" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "The only way to win is to learn faster than everyone else.", author: "Eric Ries" },
    { text: "Be customer-obsessed, not tech-obsessed.", author: "Jeff Bezos" },
    { text: "The heart and soul of a company is creativity and innovation.", author: "Robert Iger, Disney" },
    { text: "Digital transformation is a fundamental reality for businesses today.", author: "Warren Buffett" },
  ];
  
  // Animation refs
  const animationRef = useRef<number>();
  const currentStageRef = useRef(1);
  const stageStartTimeRef = useRef(Date.now());
  const simulatedDataRef = useRef<number[]>([]);
  
  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prev => (prev + 1) % INSPIRATIONAL_QUOTES.length);
    }, 5000); // Faster rotation for testing
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate data completion at random times
  useEffect(() => {
    // Simulate stage completions
    const stage1Time = 15000 + Math.random() * 8000; // 15-23 seconds
    const stage2Time = 35000 + Math.random() * 8000; // 35-43 seconds
    const stage3Time = 55000 + Math.random() * 8000; // 55-63 seconds
    const stage4Time = 75000 + Math.random() * 8000; // 75-83 seconds
    
    simulatedDataRef.current = [stage1Time, stage2Time, stage3Time, stage4Time];
    
    const timers: NodeJS.Timeout[] = [];
    
    // Stage 1 completes
    timers.push(setTimeout(() => {
      console.log('Stage 1 data complete!');
      const jumpTo = 25 + Math.random() * 4;
      setPipelineProgress(Math.round(jumpTo));
      setStageDetails(prev => prev.map((stage, idx) => ({
        ...stage,
        status: idx === 0 ? 'completed' : idx === 1 ? 'active' : stage.status
      })));
      setCurrentStage('stage2');
      currentStageRef.current = 2;
      stageStartTimeRef.current = Date.now();
    }, stage1Time));
    
    // Stage 2 completes
    timers.push(setTimeout(() => {
      console.log('Stage 2 data complete!');
      const jumpTo = 50 + Math.random() * 4;
      setPipelineProgress(Math.round(jumpTo));
      setStageDetails(prev => prev.map((stage, idx) => ({
        ...stage,
        status: idx <= 1 ? 'completed' : idx === 2 ? 'active' : stage.status
      })));
      setCurrentStage('stage3');
      currentStageRef.current = 3;
      stageStartTimeRef.current = Date.now();
    }, stage2Time));
    
    // Stage 3 completes
    timers.push(setTimeout(() => {
      console.log('Stage 3 data complete!');
      const jumpTo = 75 + Math.random() * 4;
      setPipelineProgress(Math.round(jumpTo));
      setStageDetails(prev => prev.map((stage, idx) => ({
        ...stage,
        status: idx <= 2 ? 'completed' : idx === 3 ? 'active' : stage.status
      })));
      setCurrentStage('stage4');
      currentStageRef.current = 4;
      stageStartTimeRef.current = Date.now();
    }, stage3Time));
    
    // Stage 4 completes
    timers.push(setTimeout(() => {
      console.log('Stage 4 data complete! Process finished.');
      setPipelineProgress(100);
      setStageDetails(prev => prev.map(stage => ({
        ...stage,
        status: 'completed'
      })));
      setEstimatedTime(0);
    }, stage4Time));
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);
  
  // Smooth animation
  useEffect(() => {
    const animate = () => {
      const currentStage = currentStageRef.current;
      if (currentStage > 4) return;
      
      const elapsed = (Date.now() - stageStartTimeRef.current) / 1000;
      const stageDuration = STAGE_DURATIONS[`stage${currentStage}` as keyof typeof STAGE_DURATIONS];
      const stageProgress = Math.min(elapsed / stageDuration, 0.99);
      
      const ranges: Record<number, [number, number]> = {
        1: [0, 25],
        2: [25, 50],
        3: [50, 75],
        4: [75, 100]
      };
      
      const [min, max] = ranges[currentStage];
      const targetProgress = min + (max - min) * stageProgress;
      
      // Don't exceed current stage's max until data is ready
      const cappedProgress = Math.min(targetProgress, max - 0.5);
      setPipelineProgress(Math.round(cappedProgress));
      
      // Update estimated time
      const totalRemaining = Object.entries(STAGE_DURATIONS)
        .slice(currentStage - 1)
        .reduce((sum, [_, duration]) => sum + duration, 0);
      const currentStageRemaining = Math.max(0, stageDuration - elapsed);
      setEstimatedTime(Math.floor(currentStageRemaining + (totalRemaining - stageDuration)));
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Testing Progress Animation
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Simulating with 20-second stages (80 seconds total)
          </p>
          
          <PipelineProgress
            progress={pipelineProgress}
            currentStage={currentStage}
            stages={stageDetails}
            estimatedTime={estimatedTime}
            currentQuote={INSPIRATIONAL_QUOTES[currentQuoteIndex]}
          />
          
          <div className="mt-8 p-4 bg-gray-50 rounded text-sm">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <p>Current Stage: {currentStage}</p>
            <p>Progress: {pipelineProgress}%</p>
            <p>Time Remaining: {estimatedTime}s</p>
            <p>Quote Index: {currentQuoteIndex}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestProgressPage;