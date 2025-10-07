import type { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { customerId, limit = '10' } = req.query;

    if (!customerId || typeof customerId !== 'string') {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    // Fetch invoices from Stripe
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: parseInt(limit as string, 10),
    });

    // Transform invoices to match our interface
    const transformedInvoices = invoices.data.map((invoice) => {
      // Get plan name from line items
      const planName =
        invoice.lines.data[0]?.description ||
        'Subscription';

      // Determine status
      let status: 'paid' | 'processing' | 'failed';
      if (invoice.status === 'paid') {
        status = 'paid';
      } else if (invoice.status === 'open' || invoice.status === 'draft') {
        status = 'processing';
      } else {
        status = 'failed';
      }

      return {
        id: invoice.id,
        planName: `${planName} - ${new Date(invoice.created * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`,
        amount: invoice.amount_paid / 100,
        purchaseDate: new Date(invoice.created * 1000).toISOString(),
        endDate: invoice.period_end ? new Date(invoice.period_end * 1000).toISOString() : null,
        status,
        pdfUrl: invoice.invoice_pdf,
        hostedUrl: invoice.hosted_invoice_url,
      };
    });

    return res.status(200).json({ invoices: transformedInvoices });
  } catch (error: any) {
    console.error('Error fetching invoices:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch invoices' });
  }
}
