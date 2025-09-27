import React from 'react';
import {
  FileText,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    total: number;
    completed: number;
    processing: number;
    thisMonth: number;
    lastMonth: number;
    conversionRate: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const monthGrowth = stats.lastMonth > 0
    ? ((stats.thisMonth - stats.lastMonth) / stats.lastMonth) * 100
    : 0;

  const statCards = [
    {
      name: 'Total Assessments',
      value: stats.total,
      icon: FileText,
      color: 'bg-blue-500',
      change: null
    },
    {
      name: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: null
    },
    {
      name: 'Processing',
      value: stats.processing,
      icon: Clock,
      color: 'bg-yellow-500',
      change: null
    },
    {
      name: 'This Month',
      value: stats.thisMonth,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: monthGrowth
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                {stat.change !== null && (
                  <span className={`text-sm font-medium ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change >= 0 ? '+' : ''}{stat.change.toFixed(1)}%
                  </span>
                )}
              </div>
              <div className="mt-4">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;