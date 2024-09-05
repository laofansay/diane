'use client'

import { getEntities, createEntity } from '@/app/shared/reducers/entities/wishlist.reducer'
import { Button } from '@/components/ui/button'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { useAppDispatch, useAppSelector } from '@/store'
import { HeartIcon, MinusIcon, PlusIcon, ShoppingBasketIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Spinner } from '@/components/native/icons'
import { toast } from 'react-hot-toast'



export default function ProdFav({ product }) {
   const dispatch = useAppDispatch()
   const authenticated = useAuthenticated()

   useEffect(() => {
      if (authenticated) dispatch(getEntities({ query: `bizCode=${product.id}` }))
   }, [authenticated, product])

   const wishlistList = useAppSelector((state) => state.wishlist.entities)
   const updateSuccess = useAppSelector((state) => state.wishlist.updateSuccess)

   async function onAddToWishlist() {
      try {

         const entity = {
            bizCode: product.id,
            bizDesc: '',
            bizTitle: product.title,
            bizIcon: product.images[0],
            favCate: 'PROD',
         }
         dispatch(createEntity(entity))
      } catch (error) {
         console.error({ error })
      }
   }

   useEffect(() => {
      if (updateSuccess) {
         toast.success("已收藏")
      }
   }, [updateSuccess])


   async function onRemoveFromWishlist() {
      try {
         toast.success("取消收藏")
      } catch (error) {
         console.error({ error })
      }
   }

   if (!authenticated) {
      return
   }
   if (wishlistList.length == 0) {
      return (
         <Button className="flex gap-2" onClick={onAddToWishlist}>
            <HeartIcon className="h-4" /> Wishlist {product.id} @ {wishlistList.length}
            <Button disabled>
               <Spinner />
            </Button>
         </Button>
      )
   } else {
      return (
         <Button
            variant="outline"
            className="flex gap-2"
            onClick={onRemoveFromWishlist}
         >
            <HeartIcon className="h-4" /> Remove from Wishlist {product.id} @ {wishlistList.length}
         </Button>
      )
   }
}
