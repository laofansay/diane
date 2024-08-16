import { NextResponse } from 'next/server'

export async function GET(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const user = {}

      return NextResponse.json({
         phone: user.phone,
         email: user.email,
         name: user.name,
         birthday: user.birthday,
         addresses: user.addresses,
         wishlist: user.wishlist,
         cart: user.cart,
      })
   } catch (error) {
      console.error('[PROFILE_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
