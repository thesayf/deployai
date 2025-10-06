import { useRouter } from 'next/router';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface TrialBannerProps {
  daysRemaining: number;
  assessmentsUsed: number;
  assessmentsLimit: number;
  trialEndDate: string;
  monthlyPrice: number;
  tenant: string;
}

export function TrialBanner({
  daysRemaining,
  assessmentsUsed,
  assessmentsLimit,
  trialEndDate,
  monthlyPrice,
  tenant
}: TrialBannerProps) {
  const router = useRouter();
  const assessmentsRemaining = assessmentsLimit - assessmentsUsed;
  const isExpiringSoon = daysRemaining <= 3;

  if (isExpiringSoon) {
    // Red/urgent banner for trial ending soon
    return (
      <Alert className="bg-red-50 border-red-300">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <AlertTitle className="text-xl font-bold text-red-900">
          Trial Ending Soon!
        </AlertTitle>
        <AlertDescription className="mt-2 space-y-3">
          <p className="font-semibold text-red-800">
            Only {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left in your trial!
          </p>
          <p className="text-sm text-red-700">
            You'll be charged ${monthlyPrice} on {format(new Date(trialEndDate), 'MMM d, yyyy')}.
            Cancel anytime before then to avoid charges.
          </p>
          <div className="flex gap-3 mt-3">
            <Button
              onClick={() => router.push(`/${tenant}/admin/billing`)}
              size="sm"
              variant="default"
              className="bg-red-600 hover:bg-red-700"
            >
              Manage Subscription
            </Button>
            <Button
              onClick={() => router.push(`/${tenant}/admin/billing/plans`)}
              size="sm"
              variant="outline"
            >
              View Plans
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  // Yellow/info banner for active trial
  return (
    <Alert className="bg-amber-50 border-amber-200">
      <Clock className="h-5 w-5 text-amber-600" />
      <AlertTitle className="text-xl font-bold">
        🎉 You're on a Free Trial!
      </AlertTitle>
      <AlertDescription className="mt-2 space-y-2">
        <p className="font-semibold">
          {daysRemaining} days remaining • {assessmentsRemaining} assessments left
        </p>
        <p className="text-sm text-muted-foreground">
          Your trial ends on {format(new Date(trialEndDate), 'MMM d, yyyy')}.
          After that, you'll be charged ${monthlyPrice}/month.
        </p>
        <div className="flex gap-3 mt-3">
          <Button
            onClick={() => router.push(`/${tenant}/admin/billing/plans`)}
            size="sm"
          >
            Start Subscription Now
          </Button>
          <Button
            onClick={() => router.push(`/${tenant}/admin/billing`)}
            size="sm"
            variant="outline"
          >
            View Billing
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
