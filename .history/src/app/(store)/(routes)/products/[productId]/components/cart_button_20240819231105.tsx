'use client'

import { createEntity } from '@/app/shared/reducers/entities/cart-item.reducer'
import { Spinner } from '@/components/native/icons'
import { Button } from '@/components/ui/button'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { getCountInCart, getLocalCart } from '@/lib/cart'
import { CartContextProvider, useCartContext } from '@/state/Cart'
import { useAppDispatch, useAppSelector } from '@/store'
import { MinusIcon, PlusIcon, ShoppingBasketIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function CartButton({ product }) {
   return (
      <CartContextProvider>
         <ButtonComponent product={product} />
      </CartContextProvider>
   )
}

export function ButtonComponent({ product }) {

   const dispatch = useAppDispatch();

   //current product cart count;
   const [count, setCount] = useState(0);


   const authenticated = useAuthenticated()
   const { cart, refreshCart, dispatchCart } = useCartContext()

   const loading = useAppSelector(state => state.cartItem.loading);
   const updating = useAppSelector(state => state.cartItem.updating);
   const updateSuccess = useAppSelector(state => state.cartItem.updateSuccess);

   const cartItemEntity = useAppSelector(state => state.cartItem.entity);


   const [fetchingCart, setFetchingCart] = useState(false)

   useEffect(() => {
      if (updateSuccess) {
         setCount(cartItemEntity.count);
      }
   }, [updateSuccess]);

   async function onAddToCart() {
      try {
         const entity = {
            ...cartItemEntity,
            prodId: product.id,
            cid: 0,
            count: count + 1
         };
         dispatch(createEntity(entity));
      } catch (error) {
         console.error({ error })
      }
   }

   async function onRemoveFromCart() {

      try {
         const entity = {
            ...cartItemEntity,
            prodId: product.id,
            cid: 0,
            count: count - 1
         };
         dispatch(createEntity(entity));

      } catch (error) {
         console.error({ error })
      }
   }

   if (loading)
      return (
         <Button disabled>
            <Spinner />
         </Button>
      )


   if (count === 0) {
      return (
         <Button className="flex gap-2" onClick={onAddToCart}>
            <ShoppingBasketIcon className="h-4" /> Add to Cart
         </Button>
      )
   }

   if (count > 0) {
      return (
         <>
            <Button variant="outline" size="icon" onClick={onRemoveFromCart}>
               {count == 1 ? (
                  <X className="h-4 w-4" />
               ) : (
                  <MinusIcon className="h-4 w-4" />
               )}
            </Button>

            <Button disabled variant="outline" size="icon">
               {count}
            </Button>
            <Button variant="outline" size="icon" onClick={onAddToCart}>
               <PlusIcon className="h-4 w-4" />
            </Button>
         </>
      )
   }
}
