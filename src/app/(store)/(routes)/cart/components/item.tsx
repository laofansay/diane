'use client'

import { createEntity } from '@/app/shared/reducers/entities/cart-item.reducer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useAppDispatch, useAppSelector } from '@/store'
import { MinusIcon, PlusIcon, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const Item = ({ cartItem }) => {
   const { product } = cartItem
   const dispatch = useAppDispatch()
   //current product cart count;
   const updateSuccess = useAppSelector((state) => state.cartItem.updateSuccess)
   const cartItemEntity = useAppSelector((state) => state.cartItem.entity)

   useEffect(() => {
      if (updateSuccess) {
         //setItem(cartItemEntity);
      }
   }, [updateSuccess])

   async function onAddToCart(count: number) {
      try {
         const entity = {
            ...cartItem,
            prodId: product.id,
            cid: cartItem.cid,
            count: count,
         }
         dispatch(createEntity(entity))
      } catch (error) {
         console.error({ error })
      }
   }

   async function onRemoveFromCart(count: number) {
      try {
         const entity = {
            ...cartItem,
            prodId: product.id,
            cid: cartItem.cid,
            count: count,
         }
         dispatch(createEntity(entity))
      } catch (error) {
         console.error({ error })
      }
   }

   function CartButton({ count }) {
      if (count === 0) {
         return <Button onClick={() => onAddToCart(1)}>🛒 Add to Cart</Button>
      }

      if (count > 0) {
         return (
            <>
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onRemoveFromCart(count - 1)}
               >
                  {count === 1 ? (
                     <X className="h-4" />
                  ) : (
                     <MinusIcon className="h-4" />
                  )}
               </Button>
               <Button disabled variant="ghost" size="icon">
                  {count}
               </Button>
               <Button
                  disabled={product.id == ''}
                  variant="outline"
                  size="icon"
                  onClick={() => onAddToCart(count + 1)}
               >
                  <PlusIcon className="h-4" />
               </Button>
            </>
         )
      }
   }

   function Price() {
      if (product?.discount > 0) {
         const price = (product?.price * product?.discount) / 100
         return (
            <div className="flex gap-2 items-center">
               <Badge className="flex gap-4" variant="destructive">
                  <div className="line-through">${product?.price}</div>
                  <div>{product?.discount}%</div>
               </Badge>
               <h2 className="">${price.toFixed(2)}</h2>
            </div>
         )
      }

      return <h2>${product?.price}</h2>
   }
   return (
      <Card>
         <CardHeader className="p-0 md:hidden">
            <div className="relative h-32 w-full">
               <Link href={`/products/${product?.id}`}>
                  <Image
                     className="rounded-t-lg"
                     src={product?.images[0]}
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
               <Link href={`/products/${product?.id}`}>
                  <Image
                     className="rounded-lg"
                     src={product?.images[0]}
                     alt="item image"
                     fill
                     style={{ objectFit: 'cover' }}
                  />
               </Link>
            </div>
            <div className="col-span-4 block space-y-2">
               <Link href={`/products/${product?.id}`}>
                  <h2>{product?.title}</h2>
               </Link>
               <p className="text-xs text-muted-foreground text-justify">
                  {product?.description}
               </p>
               <Price />
               <CartButton count={cartItem.count} />
            </div>
         </CardContent>
      </Card>
   )
}
