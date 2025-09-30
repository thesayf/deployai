
I'll help you find the most current and opinionated patterns for Supabase OAuth in Next.js. Let me search for the latest best practices and conventions.Based on the latest Supabase documentation and patterns from 2024-2025, here are the **opinionated and must-follow patterns** for implementing Supabase OAuth in Next.js:

## 🚨 **Critical Requirements (Non-Negotiable)**

### 1. **Use `@supabase/ssr` Package (Not the deprecated auth-helpers)**
```bash
npm install @supabase/supabase-js @supabase/ssr
```
**❌ DO NOT USE:** `@supabase/auth-helpers-nextjs` (deprecated)

### 2. **Mandatory File Structure**
```
utils/supabase/
├── client.ts      # Browser client
├── server.ts      # Server client  
├── middleware.ts  # Session refresh logic
middleware.ts      # Root middleware (MUST be in project root)
```

### 3. **Required Client Implementations**

**utils/supabase/client.ts** (Browser):
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**utils/supabase/server.ts** (Server):
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

**utils/supabase/middleware.ts**:
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
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
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
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

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object instead of the supabaseResponse object

  return supabaseResponse
}
```

**middleware.ts** (Project Root):
```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

## 🔐 **OAuth Implementation Patterns**

### 4. **OAuth Login Action (Server Action)**
```typescript
// actions/auth.ts
'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signInWithProvider(provider: 'google' | 'github') {
  const origin = headers().get('origin')
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })
  
  if (error) {
    console.error('OAuth error:', error)
    redirect('/login?error=oauth_error')
  }
  
  if (data.url) {
    redirect(data.url) // This is REQUIRED for server-side OAuth
  }
}
```

### 5. **Mandatory OAuth Callback Handler**
**app/auth/callback/route.ts**:
```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
```

### 6. **Login Page Implementation**
```typescript
// app/login/page.tsx
import { signInWithProvider } from '@/actions/auth'

export default function LoginPage() {
  return (
    <form>
      <button
        formAction={async () => {
          'use server'
          await signInWithProvider('google')
        }}
      >
        Sign in with Google
      </button>
    </form>
  )
}
```

## ⚠️ **Critical Security Rules**

### 7. **Always Use `getUser()` Never `getSession()`**
```typescript
// ✅ CORRECT - Server Components
const { data: { user } } = await supabase.auth.getUser()

// ❌ WRONG - Can be spoofed
const { data: { session } } = await supabase.auth.getSession()
```

### 8. **PKCE Flow is Mandatory**
- The `@supabase/ssr` package enforces PKCE flow by default
- **Never** use implicit flow for SSR applications

## 🚀 **Environment Variables**
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🐛 **Common Issues & Fixes**

1. **OAuth not redirecting properly**: Ensure you're calling `redirect(data.url)` in your server action
2. **Session not persisting**: Check your middleware matcher and ensure it's not excluding auth routes
3. **CORS errors**: Verify your redirect URLs in Supabase dashboard match exactly

## 📚 **Additional Resources**

- [Official Supabase Next.js SSR Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Troubleshooting Guide](https://supabase.com/docs/guides/troubleshooting/how-do-you-troubleshoot-nextjs---supabase-auth-issues-riMCZV)

These patterns are **non-negotiable** for production applications. The Supabase team has moved to this approach as the official recommendation, and deviating from these patterns will likely cause authentication issues.

Would you like me to help debug any specific issues you're encountering with your current OAuth implementation?