import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface CurrentPlanCardProps {
  planName: string;
  planTier: string;
  price: number | string;
  status: string;
  nextPaymentDate: string | null;
  nextPaymentAmount: number | null;
  cancelAtPeriodEnd: boolean;
  onUpgrade: () => void;
  onCancel: () => void;
  assessmentsUsed: number;
  assessmentsLimit: number | null;
  currentPeriodEnd: string | null;
}

const TIER_COLORS = {
  starter: 'bg-orange-500 text-white',
  professional: 'bg-blue-500 text-white',
  scale: 'bg-green-500 text-white',
} as const;

const STATUS_VARIANTS = {
  active: { label: 'Active', variant: 'default' as const, color: 'bg-green-100 text-green-800 border-green-200' },
  trialing: { label: 'Trial', variant: 'secondary' as const, color: 'bg-blue-100 text-blue-800 border-blue-200' },
  past_due: { label: 'Past Due', variant: 'destructive' as const, color: 'bg-red-100 text-red-800 border-red-200' },
  canceled: { label: 'Canceled', variant: 'secondary' as const, color: 'bg-gray-100 text-gray-800 border-gray-200' },
  incomplete: { label: 'Incomplete', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  none: { label: 'No Plan', variant: 'secondary' as const, color: 'bg-gray-100 text-gray-800 border-gray-200' },
} as const;

export function CurrentPlanCard({
  planName,
  planTier,
  price,
  status,
  nextPaymentDate,
  nextPaymentAmount,
  cancelAtPeriodEnd,
  onUpgrade,
  onCancel,
  assessmentsUsed,
  assessmentsLimit,
  currentPeriodEnd,
}: CurrentPlanCardProps) {
  const tierColor = TIER_COLORS[planTier as keyof typeof TIER_COLORS] || TIER_COLORS.starter;
  const statusInfo = STATUS_VARIANTS[status as keyof typeof STATUS_VARIANTS] || STATUS_VARIANTS.none;

  const formatPrice = (amount: number | string) => {
    if (typeof amount === 'string') return amount;
    return `$${amount}`;
  };

  const usagePercentage = assessmentsLimit
    ? (assessmentsUsed / assessmentsLimit) * 100
    : 0;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold">Your Plan</CardTitle>
            <p className="text-sm text-gray-500">
              Renews {nextPaymentDate ? format(new Date(nextPaymentDate), 'MMM d, yyyy') : 'N/A'}
            </p>
          </div>
          <Button onClick={onUpgrade} variant="outline" size="sm" className="h-9 px-4">
            Change Plan
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="border-t pt-5 space-y-6">
          {/* Plan Details */}
          <div className="space-y-2">
            <p className="text-base text-gray-600">{planName}</p>
            <p className="text-2xl font-medium text-gray-900">{formatPrice(price)}/month</p>
          </div>

          {/* Usage Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Usage</span>
              <span className="text-sm text-gray-500">
                {assessmentsUsed} of {assessmentsLimit === null ? '∞' : assessmentsLimit}
              </span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            {currentPeriodEnd && (
              <p className="text-sm text-gray-500">
                Resets {format(new Date(currentPeriodEnd), 'MMM d, yyyy')}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
