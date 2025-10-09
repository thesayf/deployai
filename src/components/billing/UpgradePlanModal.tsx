import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { PricingCard } from './PricingCard';

interface UpgradePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTier: string | null;
  tenantSubdomain: string;
}

const TIER_DETAILS = {
  starter: {
    name: 'Starter Plan',
    monthly: 199,
    yearly: 159, // 20% discount
    assessments: 5,
    badgeText: 'STARTER',
    badgeColor: 'bg-orange-500 text-white',
    badgeDotColor: 'bg-orange-500',
    features: [
      '5 AI assessments per month',
      'Full platform access',
      'Custom AI agent branding',
      'White-label assessment portal',
      'PDF report exports',
      'Email support',
      '14-day free trial',
    ],
  },
  professional: {
    name: 'Growth Plan',
    monthly: 499,
    yearly: 399, // 20% discount
    assessments: 20,
    badgeText: 'PRO',
    badgeColor: 'bg-blue-500 text-white',
    badgeDotColor: 'bg-blue-500',
    features: [
      '20 AI assessments per month',
      'Everything in Starter',
      'Priority email support',
      'Advanced analytics dashboard',
      'Team collaboration',
      'Export to multiple formats',
    ],
  },
  scale: {
    name: 'Enterprise Plan',
    monthly: 997,
    yearly: 797, // 20% discount
    assessments: null,
    badgeText: 'ENTERPRISE',
    badgeColor: 'bg-green-500 text-white',
    badgeDotColor: 'bg-green-500',
    features: [
      'Unlimited AI assessments',
      'Everything in Professional',
      'Dedicated account manager',
      'Phone & priority support',
      'SLA guarantee (99.9% uptime)',
      'Custom white-label domain',
      'Advanced security features',
      'Training & onboarding',
    ],
  },
};

export function UpgradePlanModal({
  open,
  onOpenChange,
  currentTier,
  tenantSubdomain,
}: UpgradePlanModalProps) {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanSelect = async (tier: string) => {
    if (tier === 'scale') {
      // Enterprise plan - contact sales
      router.push('/contact');
      onOpenChange(false);
      return;
    }

    if (currentTier === tier) {
      // Already on this plan
      return;
    }

    setIsLoading(true);

    try {
      // Use Stripe Customer Portal for plan changes
      const response = await fetch('/api/stripe/get-customer-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantSubdomain }),
      });

      const { customerId } = await response.json();

      if (!customerId) {
        throw new Error('No customer found. Please start a trial first.');
      }

      // Open Customer Portal to manage subscription
      const portalResponse = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          returnUrl: `${window.location.origin}/${tenantSubdomain}/admin/settings/billing`,
        }),
      });

      const { url } = await portalResponse.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Failed to open portal:', error);
      alert('Failed to open billing portal. Please try again.');
      setIsLoading(false);
    }
  };

  const getActionText = (tier: string) => {
    if (currentTier === tier) return 'Current Plan';
    if (tier === 'scale') return 'Contact Sales';

    // Determine if upgrade or downgrade
    const tierOrder = ['starter', 'professional', 'scale'];
    const currentIndex = currentTier ? tierOrder.indexOf(currentTier) : -1;
    const targetIndex = tierOrder.indexOf(tier);

    if (currentIndex < targetIndex) return 'Upgrade';
    if (currentIndex > targetIndex) return 'Downgrade';
    return 'Select Plan';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Choose Your Plan</DialogTitle>
          <DialogDescription>
            Upgrade or downgrade anytime. No commitments.
          </DialogDescription>
        </DialogHeader>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 py-4">
          <span className={!isYearly ? 'font-semibold text-sm' : 'text-sm text-muted-foreground'}>
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={isYearly ? 'font-semibold text-sm' : 'text-sm text-muted-foreground'}>
            Yearly
          </span>
          {isYearly && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium ml-2">
              Save 20%
            </span>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <PricingCard
            name={TIER_DETAILS.starter.name}
            price={isYearly ? TIER_DETAILS.starter.yearly : TIER_DETAILS.starter.monthly}
            priceLabel={isYearly ? '/month (billed yearly)' : '/month'}
            badgeText={TIER_DETAILS.starter.badgeText}
            badgeColor={TIER_DETAILS.starter.badgeColor}
            badgeDotColor={TIER_DETAILS.starter.badgeDotColor}
            features={TIER_DETAILS.starter.features}
            isCurrentPlan={currentTier === 'starter'}
            onAction={() => handlePlanSelect('starter')}
            actionText={isLoading ? 'Loading...' : getActionText('starter')}
            actionVariant={currentTier === 'starter' ? 'outline' : 'default'}
            isDisabled={currentTier === 'starter' || isLoading}
          />

          <PricingCard
            name={TIER_DETAILS.professional.name}
            price={isYearly ? TIER_DETAILS.professional.yearly : TIER_DETAILS.professional.monthly}
            priceLabel={isYearly ? '/month (billed yearly)' : '/month'}
            badgeText={TIER_DETAILS.professional.badgeText}
            badgeColor={TIER_DETAILS.professional.badgeColor}
            badgeDotColor={TIER_DETAILS.professional.badgeDotColor}
            features={TIER_DETAILS.professional.features}
            isCurrentPlan={currentTier === 'professional'}
            isDark={true}
            isRecommended={true}
            onAction={() => handlePlanSelect('professional')}
            actionText={isLoading ? 'Loading...' : getActionText('professional')}
            actionVariant="default"
            isDisabled={currentTier === 'professional' || isLoading}
          />

          <PricingCard
            name={TIER_DETAILS.scale.name}
            price="Custom"
            priceLabel="/month"
            badgeText={TIER_DETAILS.scale.badgeText}
            badgeColor={TIER_DETAILS.scale.badgeColor}
            badgeDotColor={TIER_DETAILS.scale.badgeDotColor}
            features={TIER_DETAILS.scale.features}
            isCurrentPlan={currentTier === 'scale'}
            onAction={() => handlePlanSelect('scale')}
            actionText={isLoading ? 'Loading...' : getActionText('scale')}
            actionVariant={currentTier === 'scale' ? 'outline' : 'default'}
            isDisabled={currentTier === 'scale' || isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
