import { verifyJWT } from '@/lib/jwt'
import { getErrorResponse } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
   if (req.nextUrl.pathname.startsWith('/api/auth')) return NextResponse.next()

   function isTargetingAPI() {
      return req.nextUrl.pathname.startsWith('/api')
   }

   function getToken() {
      let token: string | undefined

      if (req.cookies.has('token')) {
         token = req.cookies.get('token')?.value
      } else if (req.headers.get('Authorization')?.startsWith('Bearer ')) {
         token = req.headers.get('Authorization')?.substring(7)
      }

      return token
   }

   const token = getToken()

   if (!token) {
      if (isTargetingAPI()) return getErrorResponse(401, 'INVALID TOKEN')

      return NextResponse.redirect(new URL('/login', req.url))
   }

   const response = NextResponse.next()



   return response
}

export const config = {
   matcher: ['/profile/:path*', '/api/:path*'],
}
