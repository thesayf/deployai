import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  assessments: number;
  features: string[];
  recommended?: boolean;
}

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  currentTier: string;
  onUpgrade: (tier: string) => void;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 199,
    assessments: 25,
    features: [
      '25 AI assessments per month',
      'Full platform access',
      'Custom AI agent branding',
      'White-label assessment portal',
      'PDF report exports',
      'Email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 499,
    assessments: 100,
    features: [
      '100 AI assessments per month',
      'Everything in Starter',
      'Priority email support',
      'Advanced analytics dashboard',
      'Team collaboration',
      'API access',
    ],
    recommended: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 997,
    assessments: 400,
    features: [
      '400 AI assessments per month',
      'Everything in Professional',
      'Dedicated account manager',
      'Phone support',
      'SLA guarantee (99.9% uptime)',
      'Custom white-label domain',
    ],
  },
];

export function UpgradeModal({ open, onClose, currentTier, onUpgrade }: UpgradeModalProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (tier: string) => {
    setLoading(tier);
    try {
      await onUpgrade(tier);
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Upgrade Your Plan</DialogTitle>
          <p className="text-muted-foreground">
            Choose a plan that fits your needs. You can upgrade or downgrade anytime.
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {PLANS.map((plan) => {
            const isCurrent = plan.id === currentTier;
            const isDowngrade =
              (currentTier === 'professional' && plan.id === 'starter') ||
              (currentTier === 'scale' && (plan.id === 'starter' || plan.id === 'professional'));

            return (
              <div
                key={plan.id}
                className={`relative border-2 rounded-lg p-6 ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50'
                    : plan.recommended
                    ? 'border-orange-500'
                    : 'border-gray-200'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      RECOMMENDED
                    </span>
                  </div>
                )}

                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      CURRENT PLAN
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold">
                    ${plan.price}
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {plan.assessments} assessments/month
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={isCurrent ? 'outline' : 'default'}
                  disabled={isCurrent || loading !== null}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {loading === plan.id ? (
                    'Processing...'
                  ) : isCurrent ? (
                    'Current Plan'
                  ) : isDowngrade ? (
                    'Downgrade'
                  ) : (
                    'Upgrade Now'
                  )}
                </Button>

                {!isCurrent && (
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    {isDowngrade
                      ? 'Changes apply at end of billing period'
                      : 'Prorated charge for time remaining'}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            All plans include a 14-day trial. No credit card required to start.
            Cancel anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
