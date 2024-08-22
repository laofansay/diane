'use client'

import { IAddress } from '@/app/shared/model/address.model'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { EditIcon } from 'lucide-react'
import Link from 'next/link'


export const columns: ColumnDef<IAddress>[] = [
   {
      accessorKey: 'master',
      header: 'master',
   },
   {
      accessorKey: 'tag',
      header: 'tag',
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
      accessorKey: 'postal',
      header: 'Postal Code',
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <Link href={`/profile/addresses/${row.original.id}`}>
            <Button size="icon" variant="outline">
               <EditIcon className="h-4" />
            </Button>
         </Link>
      ),
   },
]

export const AddressTable: React.FC<IAddress[]> = ({ data }) => {
   return <DataTable searchKey="products" columns={columns} data={data} />
}
