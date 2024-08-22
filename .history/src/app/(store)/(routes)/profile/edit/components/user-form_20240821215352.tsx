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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'
import * as Avatar from '@radix-ui/react-avatar'
import * as Dialog from '@radix-ui/react-dialog'

const formSchema = z.object({
   name: z.string().min(1),
   email: z.string().min(1),
   phone: z.string().min(1),
   imageUrl: z.string().min(1),
})

type UserFormValues = z.infer<typeof formSchema>

interface UserFormProps {
   initialData: UserWithIncludes | null
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
   const params = useParams()
   const router = useRouter()

   const [loading, setLoading] = useState(false)

   const [avatarUrl, setAvatarUrl] = useState < string | null > (initialData?.imageUrl || null)
   const [isDialogOpen, setIsDialogOpen] = useState(false)



   const toastMessage = 'User updated.'
   const action = 'Save changes'

   const defaultValues = initialData
      ? {
         ...initialData,
      }
      : {
         username: '---',
         phone: '---',
         email: '---',
      }

   const form = useForm < UserFormValues > ({
      resolver: zodResolver(formSchema),
      defaultValues,
   })

   const onSubmit = async (data: UserFormValues) => {
      try {
         setLoading(true)

         // if (initialData) {
         //    await fetch(`/api/products/${params.productId}`, {
         //       method: 'PATCH',
         //       body: JSON.stringify({ data }),
         //       cache: 'no-store',
         //    })
         // } else {
         //    await fetch(`/api/products`, {
         //       method: 'POST',
         //       body: JSON.stringify({ data }),
         //       cache: 'no-store',
         //    })
         // }

         router.refresh()
         router.push(`/products`)
         toast.success(toastMessage)
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
               <Avatar.Root className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
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
                     <Button type="button" variant="outline">
                        Change Avatar
                     </Button>
                  </Dialog.Trigger>
                  <Dialog.Content className="fixed inset-0 bg-white p-6 shadow-lg rounded-lg max-w-sm mx-auto mt-20">
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
               </Dialog.Root>
            </div>

            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                        <Input
                           disabled={loading}
                           placeholder="Full Name"
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
                        <Input
                           disabled={loading}
                           placeholder="Email"
                           {...field}
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
                     <FormLabel>Phone</FormLabel>
                     <FormControl>
                        <Input
                           disabled={loading}
                           placeholder="Phone"
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
      </Form>
   )
}
