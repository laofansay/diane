'use client'

import { Button } from '@/components/ui/button'
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
import type { UserWithIncludes } from '@/types/prisma'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'
import * as Avatar from '@radix-ui/react-avatar'
import * as Dialog from '@radix-ui/react-dialog'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { saveAccountSettings, reset } from '@/app/shared/reducers/account/settings.reducer';
import { useAppDispatch, useAppSelector } from '@/store'



const formSchema = z.object({
   login: z.string().optional(),
   firstName: z.string().min(1, { message: 'nick name is required.' }),
   email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email address.' }),
   imageUrl: z.string().min(1),
})

type UserFormValues = z.infer<typeof formSchema>

interface UserFormProps {
   initialData: UserWithIncludes | null
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {

   const [loading, setLoading] = useState(false)

   const [avatarUrl, setAvatarUrl] = useState < string | null > (initialData?.imageUrl || null)
   const [isDialogOpen, setIsDialogOpen] = useState(false)


   const dispatch = useAppDispatch();
   const successMessage = useAppSelector(state => state.settings.successMessage);


   const toastMessage = 'User updated.'
   const action = 'Save changes'

   useEffect(() => {
      if (successMessage) {
         toast.success(toastMessage)
      }
   }, [successMessage]);


   const defaultValues = initialData
      ? {
         ...initialData,
      }
      : {
         firstname: '---',
         phone: '---',
         email: '---',
      }

   const form = useForm < UserFormValues > ({
      resolver: zodResolver(formSchema),
      defaultValues,
   })

   const onSubmit = async (data: UserFormValues) => {
      try {
         console.log("@@" + JSON.stringify(initialData))

         setLoading(true)
         dispatch(
            saveAccountSettings({
               ...data
            }),
         );

      } catch (error: any) {
         toast.error('Something went wrong.')
      } finally {
         setLoading(false)
      }
   }

   const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
         const reader = new FileReader()
         reader.onloadend = () => {
            setAvatarUrl(reader.result as string)
            setIsDialogOpen(false)
         }
         reader.readAsDataURL(file)
      }
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-full"
         >
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
               <Avatar.Root className="w-48 h-48 rounded-full overflow-hidden bg-gray-200">
                  <Avatar.Image
                     src={avatarUrl || '/default-avatar.png'}
                     alt="User Avatar"
                     className="object-cover w-full h-full"
                  />
                  <Avatar.Fallback className="bg-gray-500 text-white flex items-center justify-center">
                     {initialData?.name?.charAt(0) || 'U'}
                  </Avatar.Fallback>
               </Avatar.Root>
               <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <Dialog.Trigger asChild>
                     <Button type="button" variant="outline" className="p-2">
                        <Pencil2Icon className="h-5 w-5" />
                     </Button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                     <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                     <Dialog.Content
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg w-[90%] max-w-md h-auto"
                     >
                        <Dialog.Title className="text-lg font-medium">Change Avatar</Dialog.Title>
                        <Dialog.Description className="mt-2 text-sm text-gray-600">
                           Upload a new avatar image.
                        </Dialog.Description>
                        <input
                           type="file"
                           accept="image/*"
                           onChange={handleAvatarUpload}
                           className="mt-4"
                        />
                        <Dialog.Close asChild>
                           <Button className="mt-4" onClick={() => setIsDialogOpen(false)}>
                              Close
                           </Button>
                        </Dialog.Close>
                     </Dialog.Content>
                  </Dialog.Portal>
               </Dialog.Root>
            </div>

            <FormField
               control={form.control}
               name="login"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>登录名</FormLabel>
                     <FormControl>
                        <Input readOnly={true}
                           placeholder="登录名"
                           {...field}
                        />
                     </FormControl>
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="firstName"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>昵称</FormLabel>
                     <FormControl>
                        <Input className="bg-while"
                           disabled={loading}
                           placeholder="昵称"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input className="bg-while"
                           disabled={loading}
                           placeholder="Email"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button disabled={loading} className="ml-auto" type="submit">
               {action}
            </Button>
         </form>
      </Form >
   )
}
