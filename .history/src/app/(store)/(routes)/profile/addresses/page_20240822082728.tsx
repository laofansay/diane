'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { UserCombobox } from '../components/switcher'
import type { AddressColumn } from './components/table'
import { AddressTable } from './components/table'
import { useAppDispatch, useAppSelector } from '@/store'
import { getEntities } from '@/app/shared/reducers/entities/address.reducer'

export default function AddressesPage() {
   const pathname = usePathname()
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


   if (loading) {
      return <div>Loading...</div>;
   }

   return (
      <div className="flex-col">
         <div className="flex-1 ">
            <div className="flex items-center justify-between">
               <UserCombobox initialValue={pathname} />
               <Link href="/profile/addresses/new">
                  <Button>
                     <PlusIcon className="mr-2 h-4" /> Add New
                  </Button>
               </Link>
            </div>
            {addressList ? (
               <AddressTable data={addressList} />
            ) : (
               <Card className="my-2">
                  <CardContent>
                     <div className="h-[20vh]">
                        <div className="h-full my-4 flex items-center justify-center">
                           <Loader />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            )}
         </div>
      </div>
   )
}

