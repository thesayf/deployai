import React, { useState } from 'react';
import { Rocket, Clock, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

interface Action {
  action: string;
  timeline: string;
  priority: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  impact: 'high' | 'medium' | 'low';
  quickWin?: boolean;
  dependencies?: string[];
}

interface RoadmapPhase {
  phase: string;
  timeline: string;
  focus: string;
  actions: Action[];
}

interface StrategicRecommendations {
  priorityRanking: {
    recommendation: string;
    priority: number;
    justification: string;
  }[];
  implementationRoadmap: RoadmapPhase[];
  nextSteps: {
    immediate: string[];
    week1: string[];
    month1: string[];
  };
}

interface ImplementationRoadmapProps {
  strategicRecommendations?: StrategicRecommendations;
}

const ImplementationRoadmap: React.FC<ImplementationRoadmapProps> = ({
  strategicRecommendations,
}) => {
  const [showFullRoadmap, setShowFullRoadmap] = useState(false);

  const getPriorityBadge = (priority: string) => {
    const config = {
      high: 'bg-red-100 text-red-800 border-red-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      low: 'bg-blue-100 text-blue-800 border-blue-300',
    };
    return config[priority as keyof typeof config] || config.medium;
  };

  const getEffortBadge = (effort: string) => {
    const config = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
    };
    return config[effort as keyof typeof config] || config.medium;
  };

  // Get quick wins from all phases
  const allActions = strategicRecommendations?.implementationRoadmap?.flatMap(
    (phase) => phase.actions
  ) || [];
  const quickWins = allActions.filter((action) => action.quickWin);

  // Get immediate and week 1 actions
  const immediateActions = strategicRecommendations?.nextSteps?.immediate || [];
  const week1Actions = strategicRecommendations?.nextSteps?.week1 || [];
  const thisWeekActions = [...immediateActions, ...week1Actions];

  // Get first 30 days (first phase or month1 actions)
  const first30Days = strategicRecommendations?.nextSteps?.month1 || [];

  if (!strategicRecommendations) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">Implementation Roadmap</h2>
        </div>
        <p className="text-sm text-gray-500">Roadmap data not available</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Rocket className="h-5 w-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-900">Implementation Roadmap</h2>
      </div>

      {/* Quick Wins Section */}
      {quickWins.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <h3 className="text-md font-semibold text-gray-800">Quick Wins</h3>
            <span className="text-sm text-gray-500">
              ({quickWins.length} high-impact, low-effort actions)
            </span>
          </div>

          <div className="space-y-3">
            {quickWins.map((action, index) => (
              <div
                key={index}
                className="border border-green-200 bg-green-50 rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <p className="font-medium text-gray-900 flex-1">{action.action}</p>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityBadge(
                      action.priority
                    )}`}
                  >
                    {action.priority.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-600">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {action.timeline}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${getEffortBadge(action.effort)}`}>
                    {action.effort} effort
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 capitalize">
                    {action.impact} impact
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* This Week Section */}
      {thisWeekActions.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-blue-600" />
            <h3 className="text-md font-semibold text-gray-800">This Week</h3>
            <span className="text-sm text-gray-500">Start here</span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ul className="space-y-2">
              {thisWeekActions.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded border-2 border-blue-500 flex-shrink-0 mt-0.5 bg-white"></div>
                  <span className="text-sm text-gray-900">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* First 30 Days Timeline */}
      {first30Days.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-orange-600" />
            <h3 className="text-md font-semibold text-gray-800">First 30 Days</h3>
          </div>

          <div className="space-y-3">
            {first30Days.map((action, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-orange-700">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-900 flex-1">{action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expandable Full Roadmap */}
      {strategicRecommendations.implementationRoadmap &&
        strategicRecommendations.implementationRoadmap.length > 0 && (
          <div>
            <button
              onClick={() => setShowFullRoadmap(!showFullRoadmap)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              {showFullRoadmap ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Hide Full Roadmap
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  View Full Implementation Roadmap
                </>
              )}
            </button>

            {showFullRoadmap && (
              <div className="mt-6 space-y-6">
                {strategicRecommendations.implementationRoadmap.map((phase, phaseIndex) => (
                  <div
                    key={phaseIndex}
                    className="border border-gray-200 rounded-lg p-5 bg-gray-50"
                  >
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-purple-700">
                            {phaseIndex + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{phase.phase}</h4>
                          <p className="text-sm text-gray-600">{phase.timeline}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 ml-13">{phase.focus}</p>
                    </div>

                    <div className="space-y-3 ml-13">
                      {phase.actions.map((action, actionIndex) => (
                        <div
                          key={actionIndex}
                          className="border border-gray-200 bg-white rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <p className="font-medium text-gray-900 flex-1">{action.action}</p>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityBadge(
                                action.priority
                              )}`}
                            >
                              {action.priority}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <span>
                              <Clock className="h-3 w-3 inline mr-1" />
                              {action.timeline}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className={`px-2 py-0.5 rounded ${getEffortBadge(action.effort)}`}>
                              {action.effort} effort
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="capitalize">{action.impact} impact</span>
                          </div>
                          {action.dependencies && action.dependencies.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-xs text-gray-500">
                                Dependencies: {action.dependencies.join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      {/* Priority Ranking */}
      {strategicRecommendations.priorityRanking &&
        strategicRecommendations.priorityRanking.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 mb-4">Priority Ranking</h3>
            <div className="space-y-3">
              {strategicRecommendations.priorityRanking.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-gray-700">{item.priority}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{item.recommendation}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.justification}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default ImplementationRoadmap;
