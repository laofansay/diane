'use client'

import { IProduct } from '@/app/shared/model/product.model'
import { getEntities as getAddressEntities } from '@/app/shared/reducers/entities/address.reducer'
import { getEntities } from '@/app/shared/reducers/entities/cart-item.reducer'
import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerPortal,
   DrawerTitle,
   DrawerTrigger,
} from '@/components/ui/drawer'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import { useAppDispatch, useAppSelector } from '@/store'
import { Bookmark, Minus, MinusIcon, PlusIcon, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { AddressForm } from './components/address-form'
import Price from './components/price'
import { Receipt } from './components/receipt'

export default function CheckoutPage() {
   const dispatch = useAppDispatch()

   const addressList = useAppSelector((state) => state.address.entities)
   const loading = useAppSelector((state) => state.address.loading)
   const cartList = useAppSelector((state) => state.cartItem.entities)

   useEffect(() => {
      dispatch(
         getAddressEntities({
            sort: `id,desc`,
         })
      )
      dispatch(
         getEntities({
            sort: `id,desc`,
         })
      )
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
            <CardContent className=" flex flex-2 gap-2">
               <Select>
                  <SelectTrigger className="w-[280px]">
                     <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                     {addressList.map((addr) => (
                        <SelectItem key={addr.id} value={addr.id}>
                           <span className="flex flex-row content-between w-auto">
                              <h3 className="items-start">
                                 {addr.city + '  ' + addr.address}
                              </h3>
                              {addr.master ? (
                                 <Bookmark
                                    size={18}
                                    color="red"
                                    fill="red"
                                    className="items-end"
                                 />
                              ) : (
                                 <h3 className="items-end">-</h3>
                              )}
                           </span>
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>

               <Drawer>
                  <DrawerTrigger asChild>
                     <Button disabled={loading}>add new Address</Button>
                  </DrawerTrigger>
                  <DrawerContent className="right-0 left-auto h-full w-96">
                     {/* 设置Drawer从左侧滑出 */}
                     <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                           <DrawerTitle>Move Goal</DrawerTitle>
                           <DrawerDescription>
                              Set your daily activity goal.
                           </DrawerDescription>
                        </DrawerHeader>
                        <AddressForm />
                        <DrawerFooter>
                           <DrawerClose asChild>
                              <Button variant="outline">Cancel</Button>
                           </DrawerClose>
                        </DrawerFooter>
                     </div>
                  </DrawerContent>
               </Drawer>
            </CardContent>
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
                           <Price product={cartItem.product} />
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
