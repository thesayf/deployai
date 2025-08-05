import type { NextApiRequest, NextApiResponse } from 'next';
import { generateAdminToken, checkAdminAuth } from '@/lib/auth';

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

    // Generate JWT token
    const token = generateAdminToken();

    // Set cookie with more permissive settings for development
    const isProduction = process.env.NODE_ENV === 'production';
    res.setHeader('Set-Cookie', `admin-token=${token}; Path=/; HttpOnly; SameSite=${isProduction ? 'Strict' : 'Lax'}; Max-Age=86400`);
    
    return res.status(200).json({ success: true });
  } 
  
  if (req.method === 'GET') {
    // Check auth status using JWT
    const isAuthenticated = checkAdminAuth(req);
    
    if (!isAuthenticated) {
      return res.status(401).json({ authenticated: false });
    }

    return res.status(200).json({ authenticated: true });
  }
  
  if (req.method === 'DELETE') {
    // Logout - just clear the cookie
    res.setHeader('Set-Cookie', 'admin-token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}