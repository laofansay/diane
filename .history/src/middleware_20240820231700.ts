import { verifyJWT } from '@/lib/jwt'
import { getErrorResponse } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {








}

export const config = {
   matcher: ['/profile/:path*', '/api/:path*'],
}
