'use client'

import { IProduct } from '@/app/shared/model/product.model'
import { getEntities } from '@/app/shared/reducers/entities/cart-item.reducer'
import { Heading } from '@/components/native/heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import { CartContextProvider } from '@/state/Cart'
import { useAppDispatch, useAppSelector } from '@/store'
import { Label } from '@radix-ui/react-label'
import { MinusIcon, PlusIcon, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Price from './components/price'
import { Receipt } from './components/receipt'

export default function CheckoutPage() {
   const [paymentMethod, setPaymentMethod] = useState('credit-card')

   const orderItems = [
      { name: '商品 1', price: 99.99, quantity: 2 },
      { name: '商品 2', price: 49.99, quantity: 1 },
   ]

   const subtotal = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
   )
   const shipping = 10
   const total = subtotal + shipping

   const dispatch = useAppDispatch()

   const cartList = useAppSelector((state) => state.cartItem.entities)
   const getAllEntities = () => {
      dispatch(
         getEntities({
            sort: `id,desc`,
         })
      )
   }

   useEffect(() => {
      getAllEntities()
   }, [])

   function CartButton({ count }) {
      if (count === 0) {
         return <Button onClick={() => {}}>🛒 Add to Cart</Button>
      }

      if (count > 0) {
         return (
            <>
               <Button variant="outline" size="icon" onClick={() => {}}>
                  {count === 1 ? (
                     <X className="h-4" />
                  ) : (
                     <MinusIcon className="h-4" />
                  )}
               </Button>
               <Button disabled variant="ghost" size="icon">
                  {count}
               </Button>
               <Button variant="outline" size="icon" onClick={() => {}}>
                  <PlusIcon className="h-4" />
               </Button>
            </>
         )
      }
   }

   return (
      <div className="  space-y-3">
         <Card>
            <CardHeader>
               <h2>收货地址</h2>
            </CardHeader>
            <CardContent></CardContent>
         </Card>

         <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 space-y-0">
               {cartList.map((cartItem, index) => (
                  <Card>
                     <CardHeader className="p-0 md:hidden">
                        <div className="relative h-32 w-full">
                           <Link href={`/products/${cartItem.product?.id}`}>
                              <Image
                                 className="rounded-t-lg"
                                 src={cartItem.product?.images[0]}
                                 alt="product image"
                                 fill
                                 sizes="(min-width: 1000px) 30vw, 50vw"
                                 style={{ objectFit: 'cover' }}
                              />
                           </Link>
                        </div>
                     </CardHeader>
                     <CardContent className="grid grid-cols-6 gap-4 p-3">
                        <div className="relative w-full col-span-2 hidden md:inline-flex">
                           <Link href={`/products/${cartItem.product?.id}`}>
                              <Image
                                 className="rounded-lg"
                                 src={cartItem.product?.images[0]}
                                 alt="item image"
                                 fill
                                 style={{ objectFit: 'cover' }}
                              />
                           </Link>
                        </div>

                        <div className="col-span-4 block space-y-2">
                           <Link href={`/products/${cartItem.product?.id}`}>
                              <h2>{cartItem.product?.title}</h2>
                           </Link>
                           <p className="text-xs text-muted-foreground text-justify">
                              {cartItem.product?.description}
                           </p>
                           <Price product={cartItem.product}></Price>
                           <CartButton count={cartItem.count} />
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
            <div>
               <Receipt carts={cartList} />
            </div>
         </div>
      </div>
   )
}
