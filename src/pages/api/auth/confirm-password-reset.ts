import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

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

  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    console.log('[CONFIRM-PASSWORD-RESET] Validating token');

    // Find user with matching reset token
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();

    if (userError) {
      console.error('[CONFIRM-PASSWORD-RESET] Error listing users:', userError);
      return res.status(500).json({ error: 'Failed to validate reset token' });
    }

    const user = users?.users.find(
      u =>
        u.user_metadata?.password_reset_token === token &&
        u.user_metadata?.password_reset_expires
    );

    if (!user) {
      console.log('[CONFIRM-PASSWORD-RESET] Invalid token');
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Check if token has expired
    const expiresAt = new Date(user.user_metadata.password_reset_expires);
    const now = new Date();

    if (now > expiresAt) {
      console.log('[CONFIRM-PASSWORD-RESET] Token expired');
      return res.status(400).json({ error: 'Reset token has expired. Please request a new one.' });
    }

    console.log('[CONFIRM-PASSWORD-RESET] Token valid, updating password for user:', user.id);

    // Update the user's password
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password: newPassword,
      user_metadata: {
        ...user.user_metadata,
        // Clear the reset token
        password_reset_token: null,
        password_reset_expires: null,
      },
    });

    if (updateError) {
      console.error('[CONFIRM-PASSWORD-RESET] Error updating password:', updateError);
      return res.status(500).json({ error: 'Failed to update password' });
    }

    console.log('[CONFIRM-PASSWORD-RESET] Password updated successfully');

    return res.status(200).json({
      success: true,
      message: 'Password has been reset successfully',
    });
  } catch (error: any) {
    console.error('[CONFIRM-PASSWORD-RESET] Exception:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred',
      details: error.message,
    });
  }
}
