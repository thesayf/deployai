import { SUBSCRIPTION_TIERS } from '@/lib/stripe';

export interface OverageResult {
  isOverage: boolean;
  overagePriceCents: number;
  overageCount: number;
  totalOverageCharge: number;
}

/**
 * Get overage price in cents for a given subscription tier
 */
export function getOveragePriceForTier(tier: string): number {
  const tierConfig = SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS];
  if (!tierConfig) {
    return SUBSCRIPTION_TIERS.starter.overagePrice * 100; // Default to starter
  }
  return tierConfig.overagePrice * 100; // Convert dollars to cents
}

/**
 * Calculate if current usage would be an overage
 */
export function calculateOverage(
  assessmentsUsed: number,
  assessmentsLimit: number | null,
  tier: string
): OverageResult {
  // If no limit (shouldn't happen with new pricing), no overage
  if (assessmentsLimit === null) {
    return {
      isOverage: false,
      overagePriceCents: 0,
      overageCount: 0,
      totalOverageCharge: 0,
    };
  }

  // Check if current usage is at or over limit
  const isOverage = assessmentsUsed >= assessmentsLimit;
  const overagePriceCents = isOverage ? getOveragePriceForTier(tier) : 0;
  const overageCount = isOverage ? assessmentsUsed - assessmentsLimit + 1 : 0;
  const totalOverageCharge = overageCount * (overagePriceCents / 100);

  return {
    isOverage,
    overagePriceCents,
    overageCount,
    totalOverageCharge,
  };
}

/**
 * Format overage charge for display
 */
export function formatOverageCharge(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * Check if enough time has passed since last notification
 * to send another one (throttling)
 */
export function shouldSendOverageNotification(
  lastNotificationSentAt: string | null,
  throttleMinutes: number = 60
): boolean {
  if (!lastNotificationSentAt) {
    return true; // Never sent before, send now
  }

  const lastSent = new Date(lastNotificationSentAt);
  const now = new Date();
  const minutesSinceLastNotification = (now.getTime() - lastSent.getTime()) / (1000 * 60);

  return minutesSinceLastNotification >= throttleMinutes;
}
