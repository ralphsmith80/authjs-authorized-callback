// import { NextResponse } from 'next/server'
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
    // authorized: async ({ auth, request }) => {
    //   // Logged in users are authenticated, otherwise redirect to login page based on the middleware matcher
    //   if (!auth) {
    //     const url = `${new URL(request.nextUrl.origin)}api/auth/signin`
    //     console.log('####not authorized', url)
    //     // return NextResponse.json('Invalid auth token', { status: 401 })
    //     return NextResponse.redirect(url)
    //     // return Response.redirect(url)
    //     // return false
    //   }
    //   return true
    // },
  },
})
