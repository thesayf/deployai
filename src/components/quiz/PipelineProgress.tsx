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
        w-12 h-12 rounded-full border-3 flex items-center justify-center mb-2
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
          <span className="text-xl">{stage.icon}</span>
        )}
      </div>
      <p className={`text-xs text-center ${isActive ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
        {stage.name}
      </p>
    </div>
  );
};

export const PipelineProgress: React.FC<PipelineProgressProps> = ({
  progress,
  currentStage,
  stages,
  estimatedTime
}) => {
  return (
    <div className="w-full">
      {/* Stage description */}
      <div className="mb-6 text-center">
        <p className="text-gray-600 text-sm">
          {stages.find(s => s.id === currentStage)?.description || 'Initializing pipeline...'}
        </p>
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

      {/* Detailed progress steps */}
      <div className="space-y-2 text-sm">
        {stages.map((stage, index) => (
          <div 
            key={stage.id}
            className={`flex items-center space-x-3 transition-all duration-300 ${
              stage.status === 'completed' ? 'opacity-100' : 
              stage.status === 'active' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
              stage.status === 'completed' ? 'bg-green-500' :
              stage.status === 'active' ? 'bg-[#457B9D] animate-pulse' :
              'bg-gray-300'
            }`}>
              {stage.status === 'completed' && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {stage.status === 'active' && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <span className={stage.status === 'active' ? 'font-semibold' : ''}>
              Stage {index + 1}: {stage.name}
            </span>
            {stage.status === 'completed' && (
              <span className="text-green-600 text-xs">✓ Complete</span>
            )}
            {stage.status === 'active' && (
              <span className="text-[#457B9D] text-xs animate-pulse">Processing...</span>
            )}
          </div>
        ))}
      </div>

      {/* Estimated time */}
      {estimatedTime && estimatedTime > 0 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Estimated time remaining: <span className="font-semibold">{Math.ceil(estimatedTime)} seconds</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PipelineProgress;