import type { NextApiRequest, NextApiResponse } from 'next';
import { syncStripeDataToSupabase, getTenantSyncStatus } from '@/lib/stripe/sync';

// Test endpoint for sync function
// This should be removed before production deployment

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ error: 'Not found' });
  }

  const { customerId, tenantId, action } = req.body;

  try {
    if (action === 'sync' && customerId) {
      // Test sync function
      console.log(`[TEST SYNC] Testing sync for customer: ${customerId}`);
      const result = await syncStripeDataToSupabase(customerId);

      return res.status(200).json({
        success: true,
        message: 'Sync test completed',
        result
      });
    }

    if (action === 'status' && tenantId) {
      // Test status function
      console.log(`[TEST SYNC] Getting status for tenant: ${tenantId}`);
      const status = await getTenantSyncStatus(tenantId);

      return res.status(200).json({
        success: true,
        message: 'Status check completed',
        status
      });
    }

    return res.status(400).json({
      error: 'Invalid request',
      usage: {
        sync: 'POST with { "action": "sync", "customerId": "cus_xxx" }',
        status: 'POST with { "action": "status", "tenantId": "uuid" }'
      }
    });

  } catch (error: any) {
    console.error('[TEST SYNC ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'Sync test failed',
      message: error.message || 'Unknown error'
    });
  }
}