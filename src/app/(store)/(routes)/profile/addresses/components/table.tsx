'use client'

import { IAddress } from '@/app/shared/model/address.model'
import { partialUpdateEntity } from '@/app/shared/reducers/entities/address.reducer'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { useAppDispatch, useAppSelector } from '@/store'
import { Tooltip } from '@nextui-org/react'
import { ColumnDef } from '@tanstack/react-table'
import { EditIcon } from 'lucide-react'
import { Bookmark } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export const AddressTable: React.FC<IAddress[]> = ({ data }) => {
   const dispatch = useAppDispatch()
   const updateSuccess = useAppSelector((state) => state.address.updateSuccess)

   useEffect(() => {
      if (updateSuccess) {
         toast.success('success')
      }
   }, [updateSuccess])

   // 假设这个函数用于更新默认地址
   const updateDefaultAddress = async (addressId: number) => {
      const entity = {
         id: addressId,
         master: true,
      }
      dispatch(partialUpdateEntity(entity))
   }

   const columns: ColumnDef<IAddress>[] = [
      {
         header: '默认',
         id: 'actions',
         cell: ({ row }) => {
            const [isHovered, setIsHovered] = useState(false)
            return row.original.master ? (
               <div className="w-10 h-10  text-center justify-center">
                  <Button size="icon" variant="outline">
                     <Bookmark size={18} color="red" fill="red" />
                  </Button>
               </div>
            ) : (
               <div
                  className="w-10 h-10  text-center  justify-center"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
               >
                  {isHovered && (
                     <Tooltip
                        content="设置默认"
                        className="bg-gray-200 border rounded-md shadow-md text-sm text-yellow-700"
                     >
                        <Button
                           size="icon"
                           variant="outline"
                           onClick={() => updateDefaultAddress(row.original.id)}
                        >
                           <Bookmark color="red" size={18} />
                        </Button>
                     </Tooltip>
                  )}
               </div>
            )
         },
      },
      {
         accessorKey: 'id',
         header: '标签',
      },
      {
         accessorKey: 'city',
         header: 'City',
      },
      {
         accessorKey: 'address',
         header: 'Address',
      },
      {
         accessorKey: 'phone',
         header: 'Phone Number',
      },
      {
         accessorKey: 'postalCode',
         header: 'Postal Code',
      },
      {
         id: 'actions',
         header: '操作',
         cell: ({ row }) => (
            <Link href={`/profile/addresses/${row.original.id}`}>
               <Button size="icon" variant="outline">
                  <EditIcon className="h-4" />
               </Button>
            </Link>
         ),
      },
   ]

   return <DataTable searchKey="products" columns={columns} data={data} />
}
