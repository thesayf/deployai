import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'your-secret-key-change-this-in-production';

export function generateAdminToken(): string {
  // Create token with 24 hour expiry
  return jwt.sign(
    { 
      admin: true,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    },
    JWT_SECRET
  );
}

export function checkAdminAuth(req: NextApiRequest): boolean {
  const token = req.cookies['admin-token'];
  
  if (!token) {
    return false;
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Check if it's an admin token
    if (decoded.admin === true) {
      return true;
    }
    
    return false;
  } catch (error) {
    // Token is invalid or expired
    return false;
  }
}