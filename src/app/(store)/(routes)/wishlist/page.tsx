'use client'

import { IWishlist } from '@/app/shared/model/wishlist.model'
import {
   deleteEntity,
   getEntities,
} from '@/app/shared/reducers/entities/wishlist.reducer'
import { AlertModal } from '@/components/modals/alert-modal'
import { CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { useAppDispatch, useAppSelector } from '@/store'
import { ColumnDef } from '@tanstack/react-table'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button, Card } from 'reactstrap'

export default function User({}) {
   const dispatch = useAppDispatch()

   const wishlistList = useAppSelector((state) => state.wishlist.entities)
   const loading = useAppSelector((state) => state.wishlist.loading)
   const [open, setOpen] = useState(false)
   const [selectId, setSelectId] = useState(null)
   const updateSuccess = useAppSelector((state) => state.wishlist.updateSuccess)

   useEffect(() => {
      dispatch(
         getEntities({
            sort: `id,desc`,
         })
      )
   }, [])

   useEffect(() => {
      if (updateSuccess) {
         toast.success('delete success..')
      }
   }, [updateSuccess])

   const onDelete = async () => {
      try {
         dispatch(deleteEntity(selectId))
         setSelectId(null)
      } catch (error: any) {
         toast.error(
            'Make sure you removed all categories using this banner first.'
         )
      } finally {
         setOpen(false)
         setSelectId(null)
      }
   }

   const selectDeleteOne = async (id: number) => {
      setOpen(true)
      setSelectId(id)
   }
   const columns: ColumnDef<IWishlist>[] = [
      {
         accessorKey: 'id',
         header: 'Id',
      },
      {
         accessorKey: 'bizTitle',
         header: 'bizTitle',
      },
      {
         accessorKey: 'bizDesc',
         header: 'Address',
      },
      {
         accessorKey: 'bizIcon',
         header: 'Phone Number',
      },
      {
         accessorKey: 'favCate',
         header: 'favCate',
      },

      {
         accessorKey: 'actions',
         id: 'actions',
         cell: ({ row }) => (
            <Button
               size="icon"
               variant="outline"
               onClick={() => selectDeleteOne(row.original.id)}
            >
               <Trash className="h-4" color="red" />
            </Button>
         ),
      },
   ]

   return (
      <>
         <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
         />
         <div className="flex-col">
            <div className="flex-1 ">
               <div className="flex items-center justify-between"></div>
               {wishlistList ? (
                  <DataTable
                     searchKey="products"
                     columns={columns}
                     data={wishlistList}
                  />
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
      </>
   )
}
