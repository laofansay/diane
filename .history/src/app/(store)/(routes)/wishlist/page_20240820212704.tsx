'use client'

import { CartGrid } from '@/app/(store)/()/cart/components/grid'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { isVariableValid, validateBoolean } from '@/lib/utils'
import { useUserContext } from '@/state/User'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function User({ }) {
   const authenticated = useAuthenticated()
   const { user, loading } = useUserContext()

   const [items, setItems] = useState(null)
   const router = useRouter()



   return (
      <>
         <div>
            ses
         </div>
      </>
   )
}
