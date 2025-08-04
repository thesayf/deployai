import { NextApiRequest } from 'next';

// Session store - shared across the application
// In production, use Redis or database
export const adminSessions = new Map<string, { expiresAt: number }>();

// Clean up expired sessions periodically
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [token, session] of adminSessions.entries()) {
      if (session.expiresAt < now) {
        adminSessions.delete(token);
      }
    }
  }, 60 * 60 * 1000); // Clean up every hour
}

export function checkAdminAuth(req: NextApiRequest): boolean {
  const token = req.cookies['admin-token'];
  
  if (!token) {
    return false;
  }

  const session = adminSessions.get(token);
  
  if (!session || session.expiresAt < Date.now()) {
    adminSessions.delete(token);
    return false;
  }

  return true;
}