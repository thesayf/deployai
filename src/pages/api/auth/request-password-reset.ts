import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    console.log('[PASSWORD-RESET] Request received for:', email);

    // Look up user by email using admin API
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();

    if (userError) {
      console.error('[PASSWORD-RESET] Error listing users:', userError);
      // Still return success for security (don't reveal if email exists)
      return res.status(200).json({
        success: true,
        message: 'If an account exists, a reset link will be sent',
      });
    }

    const user = users?.users.find(u => u.email?.toLowerCase() === email.toLowerCase());

    if (!user) {
      console.log('[PASSWORD-RESET] User not found for email:', email);
      // Still return success for security (don't reveal if email exists)
      return res.status(200).json({
        success: true,
        message: 'If an account exists, a reset link will be sent',
      });
    }

    console.log('[PASSWORD-RESET] User found:', user.id);

    // Generate a secure reset token
    const resetToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiration

    // Store the reset token in user metadata
    // In production, you might want a separate password_reset_tokens table
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: {
        ...user.user_metadata,
        password_reset_token: resetToken,
        password_reset_expires: expiresAt.toISOString(),
      },
    });

    if (updateError) {
      console.error('[PASSWORD-RESET] Error storing reset token:', updateError);
      return res.status(500).json({ error: 'Failed to generate reset link' });
    }

    console.log('[PASSWORD-RESET] Reset token generated');

    // Send password reset email
    const { sendPasswordResetEmail } = await import('@/lib/email/email-service');

    const emailResult = await sendPasswordResetEmail({
      email: user.email!,
      firstName: user.user_metadata?.full_name?.split(' ')[0],
      resetToken,
      expiresInMinutes: 60,
    });

    if (!emailResult.success) {
      console.error('[PASSWORD-RESET] Failed to send email:', emailResult.error);
      return res.status(500).json({ error: 'Failed to send reset email' });
    }

    console.log('[PASSWORD-RESET] Reset email sent successfully');

    return res.status(200).json({
      success: true,
      message: 'If an account exists, a reset link will be sent',
    });
  } catch (error: any) {
    console.error('[PASSWORD-RESET] Exception:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred',
      details: error.message,
    });
  }
}
