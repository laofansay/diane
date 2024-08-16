import config from '@/config/site'
import Mail from '@/emails/order_notification_owner'
import { sendMail } from '@persepolis/mail'
import { render } from '@react-email/render'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const orders = []

      return NextResponse.json(orders)
   } catch (error) {
      console.error('[ORDERS_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { addressId, discountCode } = await req.json()

      if (discountCode) {
        
      }

      const cart = {}

      const { tax, total, discount, payable } = calculateCosts({ cart })

      const order ={} 

      const owners = []

      const notifications = {}

      for (const owner of owners) {
         await sendMail({
            name: config.name,
            to: owner.email,
            subject: 'An order was created.',
            html: render(
               Mail({
                  id: order.id,
                  payable: payable.toFixed(2),
                  orderNum: order.number.toString(),
               })
            ),
         })
      }

      return NextResponse.json(order)
   } catch (error) {
      console.error('[ORDER_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

function calculateCosts({ cart }) {
   let total = 0,
      discount = 0

   for (const item of cart?.items) {
      total += item?.count * item?.product?.price
      discount += item?.count * item?.product?.discount
   }

   const afterDiscount = total - discount
   const tax = afterDiscount * 0.09
   const payable = afterDiscount + tax

   return {
      total: parseFloat(total.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      afterDiscount: parseFloat(afterDiscount.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      payable: parseFloat(payable.toFixed(2)),
   }
}
