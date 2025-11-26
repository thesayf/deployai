/**
 * Stripe Configuration
 * This file contains Stripe-related constants that can be safely imported on the client side.
 * DO NOT import stripe.ts on the client - it contains the secret key!
 */

// Subscription tier configuration (safe for client-side)
export const SUBSCRIPTION_TIERS = {
  starter: {
    name: 'Starter',
    price: 199,
    assessments: 25,
    overagePrice: 40,
    priceId: process.env.STRIPE_PRICE_STARTER_ID,
  },
  professional: {
    name: 'Professional',
    price: 499,
    assessments: 100,
    overagePrice: 40,
    priceId: process.env.STRIPE_PRICE_PROFESSIONAL_ID,
  },
  scale: {
    name: 'Scale',
    price: 997,
    assessments: 400,
    overagePrice: 40,
    priceId: process.env.STRIPE_PRICE_SCALE_ID,
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

// Trial configuration
export const TRIAL_PERIOD_DAYS = 14;
export const TRIAL_ASSESSMENT_LIMIT = 10; // Fixed limit for all trial periods regardless of chosen tier

// Single assessment price
export const SINGLE_ASSESSMENT_PRICE = 99;
export const SINGLE_ASSESSMENT_PRICE_ID = process.env.STRIPE_PRICE_SINGLE_ID;

// Helper function to format amount for Stripe (converts dollars to cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};

// Helper function to format amount from Stripe (converts cents to dollars)
export const formatAmountFromStripe = (amount: number): number => {
  return amount / 100;
};
