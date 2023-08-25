import { NextResponse } from 'next/server'
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token')
    const url = new URL(req.url)
    if (token) {
      if (url.pathname === '/login' || url.pathname === '/signup') {
        return NextResponse.redirect(new URL('/profile', req.url))
      }
      return NextResponse.next()
    }

    if (!token) {
      if (url.pathname === '/signup' || url.pathname === '/login') {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/login', req.url))
    }
  },
  {
    callbacks: {
      authorized: async () => {
        return true
      }
    }
  }
)

export const config = {
  matcher: [
    '/profile',
    '/login',
    '/signup',
  ],
}