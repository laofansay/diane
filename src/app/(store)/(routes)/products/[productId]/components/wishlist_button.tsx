'use client'

import { IProduct } from '@/app/shared/model/product.model'
import { createEntity, getEntities } from '@/app/shared/reducers/entities/wishlist.reducer'
import { Spinner } from '@/components/native/icons'
import { Button } from '@/components/ui/button'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { useAppDispatch, useAppSelector } from '@/store'
import { HeartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'



//收藏
export default function WishlistButton({ product }) {
   const dispatch = useAppDispatch()
   const authenticated = useAuthenticated()

   useEffect(() => {
      if (authenticated) dispatch(getEntities({ query: `bizCode=${product.id}` }))
   }, [authenticated, product])

   const wishlistList = useAppSelector((state) => state.wishlist.entity)
   const updateSuccess = useAppSelector((state) => state.address.updateSuccess)

   async function onAddToWishlist() {
      try {

         const entity = {
            bizCode: product.id,
            bizDesc: '',
            bizTitle: product.title,
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

   if (wishlistList) {
      return (
         <Button className="flex gap-2" onClick={onAddToWishlist}>
            <HeartIcon className="h-4" /> Wishlist
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
            <HeartIcon className="h-4" /> Remove from Wishlist
         </Button>
      )
   }
}
