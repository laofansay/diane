'use client'

import { IAddress } from '@/app/shared/model/address.model'
import {
   createEntity,
   updateEntity,
} from '@/app/shared/reducers/entities/address.reducer'
import { convertDateTimeToServer } from '@/app/shared/util/date-utils'
import { AlertModal } from '@/components/modals/alert-modal'
import { Heading } from '@/components/native/heading'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useAppDispatch, useAppSelector } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

const formSchema = z.object({
   tag: z.string().min(1, '请输入一个的标签'),
   master: z.boolean().optional(),
   name: z.string().min(1, '请输入收货人姓名'),
   phone: z.string().min(11, '请输入收货人11位手机号'),
   city: z.string().min(1, '请输入省/市'),
   address: z.string().min(1, '请输入街道小区楼幢'),
   postalCode: z.string().min(1, '请输入名称邮编'),
})

interface AddressFormProps {
   address: IAddress
   isEditing: boolean
}
export const AddressForm: React.FC<AddressFormProps> = ({
   address,
   isEditing,
}) => {
   const params = useParams()
   const router = useRouter()

   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const dispatch = useAppDispatch()
   const addressEntity = useAppSelector((state) => state.address.entity)
   const updating = useAppSelector((state) => state.address.updating)
   const updateSuccess = useAppSelector((state) => state.address.updateSuccess)

   const title = isEditing ? 'Edit address' : 'Create address'
   const description = isEditing ? 'Edit a address.' : 'Add a new address'
   const toastMessage = isEditing ? 'Address updated.' : 'Address created.'
   const action = isEditing ? 'Save changes' : 'Create'

   const form = useForm<IAddress>({
      resolver: zodResolver(formSchema),
      defaultValues: address || {
         phone: '',
         name: '',
         tag: '',
         master: false,
         city: '',
         address: '',
         postalCode: '',
      },
   })

   const onSubmit = (values) => {
      if (values.id !== undefined && typeof values.id !== 'number') {
         values.id = Number(values.id)
      }
      const entity = {
         ...addressEntity,
         ...values,
         country: 'china',
      }
      if (isEditing) {
         dispatch(updateEntity(entity))
      } else {
         dispatch(createEntity(entity))
      }
   }
   useEffect(() => {
      if (updateSuccess) {
         setLoading(true)
         router.push(`/profile/addresses`)
         toast.success(toastMessage)
         setLoading(false)
      }
   }, [updateSuccess])

   const onDelete = async () => {
      try {
         setLoading(true)

         await fetch(`/api/address/${params.addressId}`, {
            method: 'DELETE',
            cache: 'no-store',
         })

         router.refresh()
         router.push(`/addresses`)
         toast.success('Address deleted.')
      } catch (error: any) {
         toast.error(
            'Make sure you removed all categories using this address first.'
         )
      } finally {
         setLoading(false)
         setOpen(false)
      }
   }

   return (
      <>
         <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
         />
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {isEditing && (
               <Button
                  disabled={loading}
                  variant="destructive"
                  size="sm"
                  onClick={() => setOpen(true)}
               >
                  <Trash className="h-4" />
               </Button>
            )}
         </div>
         <Separator />
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-8 w-full"
            >
               <div className="md:grid md:grid-cols-3 gap-8">
                  <FormField
                     control={form.control}
                     name="tag"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>标签</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 {...field}
                                 placeholder="please input a tag"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>联系人</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 {...field}
                                 placeholder="please input content person"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="phone"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>联系电话</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 {...field}
                                 placeholder="please content mobile"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="city"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>省市</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="please input  Province & city"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="postalCode"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>邮编</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="1234567890"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="master"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>是否为默认收货地址</FormLabel>
                           <FormControl>
                              <div className="space-y-1 leading-none">
                                 <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                 />
                              </div>
                           </FormControl>
                        </FormItem>
                     )}
                  />

                  <div className="col-span-2">
                     <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>街道小区</FormLabel>
                              <FormControl>
                                 <Textarea
                                    disabled={loading}
                                    placeholder="Street - Building Number"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
               <Button disabled={updating} className="ml-auto" type="submit">
                  {action}
               </Button>
            </form>
         </Form>
      </>
   )
}
