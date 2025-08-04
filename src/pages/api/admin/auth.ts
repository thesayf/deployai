import type { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from 'crypto';
import { adminSessions } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Login
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not set in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create session token
    const token = createHash('sha256')
      .update(`${Date.now()}-${Math.random()}`)
      .digest('hex');
    
    // Store session with 24 hour expiry
    adminSessions.set(token, {
      expiresAt: Date.now() + (24 * 60 * 60 * 1000)
    });

    // Set cookie with more permissive settings for development
    const isProduction = process.env.NODE_ENV === 'production';
    res.setHeader('Set-Cookie', `admin-token=${token}; Path=/; HttpOnly; SameSite=${isProduction ? 'Strict' : 'Lax'}; Max-Age=86400`);
    
    return res.status(200).json({ success: true });
  } 
  
  if (req.method === 'GET') {
    // Check auth status
    const cookieHeader = req.headers.cookie;
    console.log('Cookie header:', cookieHeader);
    
    const token = req.cookies['admin-token'];
    console.log('Parsed token:', token);
    console.log('Active sessions:', adminSessions.size);
    
    if (!token) {
      return res.status(401).json({ authenticated: false, reason: 'No token' });
    }

    const session = adminSessions.get(token);
    
    if (!session) {
      return res.status(401).json({ authenticated: false, reason: 'No session' });
    }
    
    if (session.expiresAt < Date.now()) {
      adminSessions.delete(token);
      return res.status(401).json({ authenticated: false, reason: 'Session expired' });
    }

    return res.status(200).json({ authenticated: true });
  }
  
  if (req.method === 'DELETE') {
    // Logout
    const token = req.cookies['admin-token'];
    
    if (token) {
      adminSessions.delete(token);
    }
    
    res.setHeader('Set-Cookie', 'admin-token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}