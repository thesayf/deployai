import React from 'react';

interface MonthlyTrendProps {
  data: Array<{
    month: string;
    count: number;
  }>;
}

const MonthlyTrend: React.FC<MonthlyTrendProps> = ({ data }) => {
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Trend</h2>

        {data.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 font-medium">No data available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Chart */}
            <div className="flex items-end justify-between h-32 gap-2">
              {data.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col justify-end h-24">
                    <div
                      className="bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                      style={{
                        height: `${(item.count / maxCount) * 100}%`,
                        minHeight: item.count > 0 ? '8px' : '0'
                      }}
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium text-gray-900">{item.count}</p>
                    <p className="text-xs text-gray-600">{item.month.slice(0, 3)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500">Total (6 months)</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {data.reduce((sum, item) => sum + item.count, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Average/month</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {Math.round(data.reduce((sum, item) => sum + item.count, 0) / data.length)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyTrend;