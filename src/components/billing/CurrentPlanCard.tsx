import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
}: CurrentPlanCardProps) {
  const tierColor = TIER_COLORS[planTier as keyof typeof TIER_COLORS] || TIER_COLORS.starter;
  const statusInfo = STATUS_VARIANTS[status as keyof typeof STATUS_VARIANTS] || STATUS_VARIANTS.none;

  const formatPrice = (amount: number | string) => {
    if (typeof amount === 'string') return amount;
    return `$${amount}`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold mb-0.5">Your Plan</CardTitle>
            <p className="text-xs text-muted-foreground">
              Renews {nextPaymentDate ? format(new Date(nextPaymentDate), 'd MMM yyyy') : 'N/A'}
            </p>
          </div>
          <Button onClick={onUpgrade} variant="outline" size="sm" className="h-8 px-4">
            Change Plan
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-6 border-t pt-4">
          {/* Left: Plan Details */}
          <div className="space-y-1.5">
            <h3 className="text-muted-foreground text-sm">{planName}</h3>
            <div className="text-xl font-bold">{formatPrice(price)}/month</div>
            <p className="text-sm text-muted-foreground">4 included users</p>
            <button onClick={onUpgrade} className="text-sm text-blue-600 hover:underline pt-1">
              Upgrade Plan
            </button>
          </div>

          {/* Right: Additional Users */}
          <div className="space-y-1.5">
            <h3 className="text-muted-foreground text-sm">Additional Users</h3>
            <div className="text-xl font-bold">--</div>
            <p className="text-sm text-muted-foreground">0 included users</p>
            <button className="text-sm text-blue-600 hover:underline pt-1">
              Add More
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
