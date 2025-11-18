import Stripe from 'stripe';

// Re-export config items for backward compatibility
export * from './stripe-config';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

// Log key info for debugging (only first 12 chars for security)
console.log('[STRIPE INIT] Stripe key configured:', process.env.STRIPE_SECRET_KEY?.substring(0, 12));
console.log('[STRIPE INIT] Key mode:', process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 'LIVE' : 'TEST');

// Stripe client - SERVER-SIDE ONLY! Do not import this file on the client.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});