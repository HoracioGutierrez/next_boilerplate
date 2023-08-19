import { NextResponse } from 'next/server'
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = req.cookies.get('next-auth.session-token')
    const url = new URL(req.url)
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    } else if (url.pathname === '/login' || url.pathname === '/signup') {
      return NextResponse.redirect(new URL('/profile', req.url))
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: async (params) => {
        const token = params.req.cookies.get('next-auth.session-token')
        if (token) {
          return true
        } else {
          return false
        }
      },
    },
    pages : {
      signIn: '/login',
    }
  }
)

export const config = {
  matcher: [
    '/profile',
    '/login',
  ],
}