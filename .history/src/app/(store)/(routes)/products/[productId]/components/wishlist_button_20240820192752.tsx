'use client'

import { Spinner } from '@/components/native/icons'
import { Button } from '@/components/ui/button'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { HeartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

//收藏
export default function WishlistButton({ product }) {

   const authenticated = useAuthenticated()

   const [wishlist, setWishlist] = useState(null)
   const [fetchingWishlist, setFetchingWishlist] = useState(true)

   useEffect(() => {
      async function getWishlist() {
         try {
         } catch (error) {
            console.error({ error })
         }
      }

      if (authenticated) getWishlist()
   }, [authenticated])

   function isProductInWishlist() {

   }

   async function onAddToWishlist() {
      try {
         setFetchingWishlist(true)
         setFetchingWishlist(false)
      } catch (error) {
         console.error({ error })
      }
   }

   async function onRemoveFromWishlist() {
      try {
         setFetchingWishlist(true)

         const response = await fetch(`/api/wishlist`, {
            method: 'DELETE',
            body: JSON.stringify({ productId: product.id, connect: false }),
            cache: 'no-store',
            headers: {
               'Content-Type': 'application/json-string',
            },
         })

         const json = await response.json()

         setWishlist(json)
         setFetchingWishlist(false)
      } catch (error) {
         console.error({ error })
      }
   }

   if (!authenticated) {
      return
   }

   if (fetchingWishlist)
      return (
         <Button disabled>
            <Spinner />
         </Button>
      )

   if (!isProductInWishlist()) {
      return (
         <Button className="flex gap-2" onClick={onAddToWishlist}>
            <HeartIcon className="h-4" /> Wishlist
         </Button>
      )
   }

   if (isProductInWishlist()) {
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
