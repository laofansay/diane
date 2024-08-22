'use client'

import {
   getEntity,
   reset,
} from '@/app/shared/reducers/entities/address.reducer'
import { useAppDispatch, useAppSelector } from '@/store'
import { useEffect } from 'react'

import { AddressForm } from './components/address-form'

export default async function AddressPage({
   params,
}: {
   params: { addressId: string }
}) {
   const dispatch = useAppDispatch()

   const address = useAppSelector((state) => state.address.entity)

   const isEditing = params.addressId !== 'new'
   console.log('@@@' + JSON.stringify(params))
   useEffect(() => {
      if (isEditing) {
         dispatch(getEntity(params.addressId))
      } else {
         dispatch(reset())
      }
   }, [])
   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 p-8 pt-6">
            <AddressForm address={address} isEditing={isEditing} />
         </div>
      </div>
   )
}
