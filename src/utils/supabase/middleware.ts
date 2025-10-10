import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Extract tenant subdomain for multi-tenant support FIRST
  const hostname = request.headers.get('host') || ''
  const currentHost = hostname.replace(':3000', '').replace(':3001', '')
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'deployai.studio'
  const isProduction = process.env.NODE_ENV === 'production'

  let subdomain: string | null = null

  if (isProduction) {
    subdomain = currentHost.replace(`.${baseDomain}`, '')
    if (subdomain === currentHost || subdomain === 'www') {
      subdomain = null
    }
  } else {
    const parts = currentHost.split('.')
    if (parts.length > 1 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      subdomain = parts[0]
    }
  }

  // Clone the request headers and add tenant subdomain for API routes
  const requestHeaders = new Headers(request.headers)
  if (subdomain) {
    requestHeaders.set('x-tenant-subdomain', subdomain)
  }

  let supabaseResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Add tenant subdomain to response headers as well
  if (subdomain) {
    supabaseResponse.headers.set('x-tenant-subdomain', subdomain)
  }

  // Protected routes check - only for tenant admin routes
  const pathname = request.nextUrl.pathname
  const pathMatch = pathname.match(/^\/([^\/]+)\/admin/)
  const isLoginPage = pathname.match(/^\/[^\/]+\/admin\/login/)
  const isAdminRoute = pathMatch && !isLoginPage

  if (isAdminRoute && !user) {
    const tenant = pathMatch[1]
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = `/${tenant}/admin/login`
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}