import prisma from '@/lib/prisma'

import { AddressForm } from './components/address-form'
import { useAppDispatch, useAppSelector } from '@/store';
import { useLocation } from 'react-router';
import { getEntities } from '@/app/shared/reducers/entities/address.reducer';
import { useEffect } from 'react';


export default async function AddressPage({
   params,
}: {
   params: { addressId: string }
}) {

   const dispatch = useAppDispatch();
   const addressList = useAppSelector(state => state.address.entities);
   const loading = useAppSelector(state => state.address.loading);

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



   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 p-8 pt-6">
            {loading ?
               <AddressForm initialData={addressList} />
               :
               <div>loading</div>
            }

         </div>
      </div>
   )
}
