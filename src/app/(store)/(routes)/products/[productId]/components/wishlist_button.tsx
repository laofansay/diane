'use client'

import { getEntities } from '@/app/shared/reducers/entities/wishlist.reducer'
import { Spinner } from '@/components/native/icons'
import { Button } from '@/components/ui/button'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { useAppDispatch, useAppSelector } from '@/store'
import { HeartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

//收藏
export default function WishlistButton({ id }) {
   const dispatch = useAppDispatch()
   const authenticated = useAuthenticated()

   useEffect(() => {
      if (authenticated) dispatch(getEntities({ query: 'bizCode=1' }))
   }, [authenticated])

   const wishlistList = useAppSelector((state) => state.wishlist.entity)
   const loadModal = useAppSelector((state) => state.wishlist.loading)

   async function onAddToWishlist() {
      try {
      } catch (error) {
         console.error({ error })
      }
   }

   async function onRemoveFromWishlist() {
      try {
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
