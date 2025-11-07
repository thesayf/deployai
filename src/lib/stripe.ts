import Stripe from 'stripe';

// Re-export config items for backward compatibility
export * from './stripe-config';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

// Stripe client - SERVER-SIDE ONLY! Do not import this file on the client.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
  typescript: true,
});