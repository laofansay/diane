'use client'

import { Card, CardContent } from '@/components/ui/card'
import { isVariableValid } from '@/lib/utils'

import { Item } from './item'
import { Receipt } from './receipt'
import { Skeleton } from './skeleton'
import { useAppDispatch, useAppSelector } from '@/store'
import { getEntities } from '@/app/shared/reducers/entities/cart-item.reducer'
import { useEffect } from 'react'



export const CartGrid = () => {

   const dispatch = useAppDispatch();

   const cartList = useAppSelector(state => state.cart.entities);
   const loading = useAppSelector(state => state.cart.loading);
   const getAllEntities = () => {
      dispatch(
         getEntities({
            sort: `id,desc`,
         }),
      );
   };

   useEffect(() => {
      getAllEntities();
   }, []);

   if (cartList?.length === 0) {
      return (
         <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
               <Card>
                  <CardContent className="p-4">
                     <p>Your Cart is empty...</p>
                  </CardContent>
               </Card>
            </div>
            <Receipt />
         </div>
      )
   }

   return (
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
         <div className="md:col-span-2">
            {isVariableValid(cartList)
               ? cartList.map((cartItem, index) => (
                  <Item cartItem={cartItem} key={index} />
               ))
               : [...Array(5)].map((cartItem, index) => (
                  <Skeleton key={index} />
               ))}
         </div>
         <Receipt />
      </div>
   )
}
