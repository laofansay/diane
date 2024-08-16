import { NextResponse } from 'next/server'

export async function GET(
   req: Request,
   { params }: { params: { orderId: string } }
) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      if (!params.orderId) {
         return new NextResponse('orderId is required', { status: 400 })
      }

      const order = {}

      return NextResponse.json(order)
   } catch (error) {
      console.error('[ORDER_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
