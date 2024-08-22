import { useAuthenticated, useAuthenticatedAccount } from '@/hooks/useAuthentication'
import { isVariableValid, validateBoolean } from '@/lib/utils'
import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext({
   user: null,
   loading: true,
   refreshUser: () => { },
})

export const useUserContext = () => {
   return useContext(UserContext)
}

export const UserContextProvider = ({ children }) => {

   const authenticated = useAuthenticated()

   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)

   const refreshUser = async () => {
      try {
         if (authenticated) {
            setLoading(true)
            setUser(useAuthenticatedAccount)
            setLoading(false)
         }
      } catch (error) {
         console.error({ error })
      }
   }
   return (
      <UserContext.Provider value={{ user, loading, refreshUser }}>
         {children}
      </UserContext.Provider>
   )
}
