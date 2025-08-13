import React from 'react';

export interface StageInfo {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'pending' | 'active' | 'completed' | 'error';
  icon: string;
}

interface PipelineProgressProps {
  progress: number;
  currentStage: string;
  stages: StageInfo[];
  estimatedTime?: number;
  currentQuote?: { text: string; author: string };
}

const StageIndicator: React.FC<{ stage: StageInfo; isActive: boolean }> = ({ stage, isActive }) => {
  const getStatusColor = () => {
    switch (stage.status) {
      case 'completed':
        return 'bg-green-500 border-green-600';
      case 'active':
        return 'bg-[#457B9D] border-[#3a6a89] animate-pulse';
      case 'error':
        return 'bg-red-500 border-red-600';
      default:
        return 'bg-gray-300 border-gray-400';
    }
  };

  return (
    <div className="flex flex-col items-center flex-1">
      <div className={`
        w-12 h-12 rounded-full border-3 flex items-center justify-center
        transition-all duration-500 ${getStatusColor()}
        ${isActive ? 'scale-110' : ''}
      `}>
        {stage.status === 'completed' ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : stage.status === 'active' ? (
          <div className="w-5 h-5 bg-white rounded-full animate-ping" />
        ) : (
          <span className="text-lg font-bold text-gray-600">{stage.icon}</span>
        )}
      </div>
    </div>
  );
};

export const PipelineProgress: React.FC<PipelineProgressProps> = ({
  progress,
  currentStage,
  stages,
  estimatedTime,
  currentQuote
}) => {
  return (
    <div className="w-full">
      {/* Inspirational quote with fade effect */}
      <div className="mb-8 text-center min-h-[60px] flex flex-col justify-center">
        {currentQuote ? (
          <div className="transition-opacity duration-500">
            <p className="text-gray-700 text-lg italic mb-2">"{currentQuote.text}"</p>
            <p className="text-gray-500 text-sm">— {currentQuote.author}</p>
          </div>
        ) : (
          <p className="text-gray-600 text-sm">
            {stages.find(s => s.id === currentStage)?.description || 'Initializing pipeline...'}
          </p>
        )}
      </div>

      {/* Main progress bar */}
      <div className="relative mb-8">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#457B9D] to-[#3a6a89] h-3 rounded-full transition-all duration-700 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shine" />
          </div>
        </div>
        {/* Progress percentage */}
        <div className="absolute -top-6 transition-all duration-700" style={{ left: `${Math.min(progress, 95)}%` }}>
          <span className="text-xs font-bold text-gray-700">{Math.round(progress)}%</span>
        </div>
      </div>
      
      {/* Stage indicators */}
      <div className="flex justify-between mb-6">
        {stages.map((stage) => (
          <StageIndicator 
            key={stage.id} 
            stage={stage} 
            isActive={currentStage === stage.id}
          />
        ))}
      </div>

      {/* Estimated time */}
      <div className="mt-6 text-center">
        {estimatedTime !== undefined && estimatedTime > 0 ? (
          <p className="text-sm text-gray-500">
            Estimated time remaining: <span className="font-semibold">
              {Math.floor(estimatedTime / 60)}:{String(Math.ceil(estimatedTime % 60)).padStart(2, '0')}
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600 animate-pulse">
            Adding finishing touches, please wait...
          </p>
        )}
      </div>
    </div>
  );
};

export default PipelineProgress;