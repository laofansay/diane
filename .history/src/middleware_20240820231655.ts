import { verifyJWT } from '@/lib/jwt'
import { getErrorResponse } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
   if (req.nextUrl.pathname.startsWith('/api/auth')) return NextResponse.next()

   function isTargetingAPI() {
      return req.nextUrl.pathname.startsWith('/api')
   }








}

export const config = {
   matcher: ['/profile/:path*', '/api/:path*'],
}
