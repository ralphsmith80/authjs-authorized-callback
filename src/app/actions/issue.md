I've identified the issue. I've noted that it will work by adjusting the code in one of two ways. Either by adjusting the middleware or by not overriding the `authorized` callback.

## Breaking test case

```middleware.ts
export { auth as middleware } from '@/auth'

// Optionally, don't invoke Middleware on some paths
export const config = {
  /*
   * Match all routes except for the following:
   * - api/* (API routes)
   * - _next/static/* (static files)
   * - _next/image* (image optimization files)
   * - favicon.ico
   * - robots.txt
   * - home page (root route)
   */
  matcher: [
    '/((?!api|_next/static|_next/image|images|fonts|favicon.ico|robots.txt|$).*)',
  ],
}
```

```auth.ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { type Provider } from 'next-auth/providers'

const providers: Provider[] = [
  Credentials({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'smith' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const users = [
        {
          id: '1',
          email: 'test@test.com',
          name: 'test',
          password: 'pass',
        },
      ]
      const user = users.find(
        (user) =>
          user.email === credentials?.email &&
          user.password === credentials?.password
      )
      return user ? { id: user.id, email: user.email, name: user.name } : null
    },
  }),
]

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 5, // 5 seconds for testing
  },
  providers,
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page based on the middleware matcher
      return !!auth
    },
  },
})
```

## Working with middleware matcher adjustment

This is less ideal because it require the page to not be protected by middleware, but I'm showing it for completeness. The change is to modify the matcher to include the previously protected page `dashboard`. This results in the server action being invoked which contains the necessary protection and redirect.

```middleware.ts
export { auth as middleware } from '@/auth'

// Optionally, don't invoke Middleware on some paths
export const config = {
  /*
   * Match all routes except for the following:
   * - api/* (API routes)
   * - _next/static/* (static files)
   * - _next/image* (image optimization files)
   * - favicon.ico
   * - robots.txt
   * - home page (root route)
   */
  matcher: [
    '/((?!api|_next/static|_next/image|images|fonts|favicon.ico|robots.txt|dashboard$).*)',
  ],
}
```

## Working without the `authorized` callback override

This is more ideal since it allows the page to be protected by middleware. I've removed the `authorized` callback in the `auth.ts` file. The down side is that this will not work if you need to override the `authorized` callback.

```auth.ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { type Provider } from 'next-auth/providers'

const providers: Provider[] = [
  Credentials({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'smith' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const users = [
        {
          id: '1',
          email: 'test@test.com',
          name: 'test',
          password: 'pass',
        },
      ]
      const user = users.find(
        (user) =>
          user.email === credentials?.email &&
          user.password === credentials?.password
      )
      return user ? { id: user.id, email: user.email, name: user.name } : null
    },
  }),
]

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 5, // 5 seconds for testing
  },
  providers,
  callbacks: {
  },
})

```

## Working with middleware matcher and `authorized` callback

This is the solution if you want your matcher protect that page and you want to override the `authorized` callback.

This does not work. How can we make this work?

```auth.ts
import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { type Provider } from 'next-auth/providers'

const providers: Provider[] = [
  Credentials({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'smith' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const users = [
        {
          id: '1',
          email: 'test@test.com',
          name: 'test',
          password: 'pass',
        },
      ]
      const user = users.find(
        (user) =>
          user.email === credentials?.email &&
          user.password === credentials?.password
      )
      return user ? { id: user.id, email: user.email, name: user.name } : null
    },
  }),
]

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 5, // 5 seconds for testing
  },
  providers,
  callbacks: {
    authorized: async ({ auth, request }) => {
      // Logged in users are authenticated, otherwise redirect to login page based on the middleware matcher
      if (!auth) {
        const url = `${new URL(request.nextUrl.origin)}api/auth/signin`
        console.log('####not authorized', url)
        // return NextResponse.json('Invalid auth token', { status: 401 })
        return NextResponse.redirect(url)
        // return Response.redirect(url)
        // return false
      }

      return true
    },
  },
})
```
