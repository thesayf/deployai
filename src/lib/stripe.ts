import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
  typescript: true,
});

// Helper function to format amount for Stripe (converts dollars to cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};

// Helper function to format amount from Stripe (converts cents to dollars)
export const formatAmountFromStripe = (amount: number): number => {
  return amount / 100;
};

// Subscription tier configuration
export const SUBSCRIPTION_TIERS = {
  starter: {
    name: 'Starter',
    price: 199,
    assessments: 25,
    overagePrice: 4,
    priceId: process.env.STRIPE_PRICE_STARTER_ID,
  },
  professional: {
    name: 'Professional',
    price: 499,
    assessments: 100,
    overagePrice: 3,
    priceId: process.env.STRIPE_PRICE_PROFESSIONAL_ID,
  },
  scale: {
    name: 'Scale',
    price: 997,
    assessments: 400,
    overagePrice: 2,
    priceId: process.env.STRIPE_PRICE_SCALE_ID,
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

// Trial configuration
export const TRIAL_PERIOD_DAYS = 14;

// Single assessment price
export const SINGLE_ASSESSMENT_PRICE = 99;
export const SINGLE_ASSESSMENT_PRICE_ID = process.env.STRIPE_PRICE_SINGLE_ID;