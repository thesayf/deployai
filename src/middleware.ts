import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  const currentHost = hostname.replace(':3000', '').replace(':3001', '');

  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'deployai.studio';
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const subdomain = currentHost.replace(`.${baseDomain}`, '');

    if (subdomain && subdomain !== currentHost && subdomain !== 'www') {
      const response = NextResponse.next();
      response.headers.set('x-tenant-subdomain', subdomain);
      return response;
    }

    if (subdomain === 'www' || currentHost === baseDomain) {
      return NextResponse.next();
    }
  } else {
    const parts = currentHost.split('.');
    if (parts.length > 1 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      const subdomain = parts[0];
      const response = NextResponse.next();
      response.headers.set('x-tenant-subdomain', subdomain);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/health|_next/static|_next/image|favicon.ico).*)',
  ],
};