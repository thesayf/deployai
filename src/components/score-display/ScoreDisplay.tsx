import { motion } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Info
} from 'lucide-react';

interface ScoreDisplayProps {
  aiScore: number;
  roiScore: number;
  marketScore: number;
  implementationRisk: 'Low' | 'Medium' | 'High';
  urgencyFactor: 'Low' | 'Medium' | 'High';
  className?: string;
}

export function ScoreDisplay({
  aiScore,
  roiScore,
  marketScore,
  implementationRisk,
  urgencyFactor,
  className = ''
}: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Needs Improvement';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-700';
      case 'High':
        return 'bg-red-100 text-red-700 border-red-700';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-700';
    }
  };

  const scores = [
    {
      label: 'AI Opportunity',
      score: aiScore,
      icon: Zap,
      description: 'Potential for AI to transform your operations'
    },
    {
      label: 'ROI Potential',
      score: roiScore,
      icon: TrendingUp,
      description: 'Expected return on AI investment'
    },
    {
      label: 'Market Readiness',
      score: marketScore,
      icon: CheckCircle,
      description: 'Availability of suitable AI solutions'
    }
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Main Scores */}
      <div className="grid md:grid-cols-3 gap-6">
        {scores.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-3 border-black p-6 shadow-hard"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8" />
                <div className="text-xs font-medium uppercase text-gray-500">
                  {getScoreLabel(item.score)}
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2">{item.label}</h3>
              
              <div className="mb-4">
                <div className={`text-4xl font-bold ${getScoreColor(item.score)}`}>
                  {item.score}
                </div>
                <div className="text-sm text-gray-500">out of 100</div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-gray-200 border-2 border-black mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className={`h-full ${
                    item.score >= 80 ? 'bg-green-500' :
                    item.score >= 60 ? 'bg-blue-500' :
                    item.score >= 40 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
              </div>

              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Risk Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white border-3 border-black p-6 shadow-hard"
      >
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          Risk Assessment
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Implementation Risk</h4>
            <div className={`inline-flex items-center px-4 py-2 border-2 font-bold uppercase ${getRiskColor(implementationRisk)}`}>
              {implementationRisk}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Complexity and resource requirements for AI adoption
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Urgency Factor</h4>
            <div className={`inline-flex items-center px-4 py-2 border-2 font-bold uppercase ${getRiskColor(urgencyFactor)}`}>
              {urgencyFactor}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              How quickly you should act on AI opportunities
            </p>
          </div>
        </div>
      </motion.div>

      {/* Overall Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 border-3 border-black p-6 shadow-hard"
      >
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-lg mb-2">Overall Assessment</h3>
            <p className="text-gray-700">
              {aiScore >= 70 && roiScore >= 70 ? (
                <>
                  Your organization shows <strong>strong readiness</strong> for AI adoption with 
                  excellent opportunity and ROI potential. You're well-positioned to gain 
                  competitive advantage through strategic AI implementation.
                </>
              ) : aiScore >= 50 || roiScore >= 50 ? (
                <>
                  Your organization has <strong>moderate readiness</strong> for AI adoption. 
                  There are good opportunities available, but you'll need to address some 
                  gaps and build capabilities for successful implementation.
                </>
              ) : (
                <>
                  Your organization is in the <strong>early stages</strong> of AI readiness. 
                  While challenges exist, there are opportunities to build a strong foundation 
                  for future AI adoption with the right strategy and support.
                </>
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}