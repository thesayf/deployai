import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/router';

interface UsageMeterProps {
  used: number;
  limit: number | null;
  percentage: number;
  tier: string;
  tenant?: string;
}

const UsageMeter: React.FC<UsageMeterProps> = ({ used, limit, percentage, tier, tenant }) => {
  const router = useRouter();
  const isUnlimited = limit === null;
  const isNearLimit = !isUnlimited && percentage >= 80;
  const isAtLimit = !isUnlimited && percentage >= 100;

  const getBarColor = () => {
    if (isAtLimit) return 'bg-red-500';
    if (isNearLimit) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusMessage = () => {
    if (isUnlimited) return 'Unlimited assessments';
    if (isAtLimit) return 'Assessment limit reached';
    if (isNearLimit) return 'Approaching limit';
    return `${limit! - used} assessments remaining`;
  };

  const handleUpgradeClick = () => {
    if (tenant) {
      router.push(`/${tenant}/admin/billing`);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-full">
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Usage This Month</h2>
          <span className="px-2 py-1 bg-gray-900 text-white font-medium text-xs rounded">
            {tier}
          </span>
        </div>

        {!isUnlimited ? (
          <div className="flex flex-col justify-between flex-1">
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>{used} used</span>
                <span>{limit} limit</span>
              </div>
              <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getBarColor()} transition-all duration-300 rounded-full`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>

            {/* Status message */}
            <div className={`flex items-center gap-2 p-3 border rounded-md ${
              isAtLimit ? 'bg-red-50 border-red-200' : isNearLimit ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'
            }`}>
              {(isAtLimit || isNearLimit) && (
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              )}
              <p className="font-medium text-sm">{getStatusMessage()}</p>
            </div>

            {/* Upgrade prompt */}
            {isNearLimit && (
              <div className="mt-4">
                <button
                  onClick={handleUpgradeClick}
                  className="w-full bg-gray-900 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Manage Billing
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-semibold">{used}</p>
                <p className="font-medium">Assessments Used</p>
              </div>
              <div className="text-6xl">∞</div>
            </div>
            <p className="mt-4 font-medium">{getStatusMessage()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsageMeter;