'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn, isVariableValid } from '@/lib/utils'
import { isEmailValid, isIranianPhoneNumberValid } from '@persepolis/regex'
import { Loader, MailIcon, SmartphoneIcon } from 'lucide-react'
import * as React from 'react'


import { useAppDispatch, useAppSelector } from '@/app/redux';
import { login } from '@/app/api/shared/reducers/authentication';


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
   const [isLoading, setIsLoading] = React.useState<boolean>(false)
   const [fetchedOTP, setFetchedOTP] = React.useState<boolean>(false)

   
   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   }
   async function onSubmitEmail() {
     
   }
   
   const dispatch = useAppDispatch();
   const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
   const loginError = useAppSelector(state => state.authentication.loginError);
   const showModalLogin = useAppSelector(state => state.authentication.showModalLogin);
   const [showModal, setShowModal] = useState(showModalLogin);
   const navigate = useNavigate();
   const pageLocation = useLocation();
   const handleLogin = (username, password, rememberMe = false) => dispatch(login(username, password, rememberMe));


   return (
      <>
         <div className="grid gap-1">
            <Label
               className="text-sm font-light text-foreground/60"
               htmlFor="email"
            >
               Email
            </Label>
            <Input
               id="email"
               placeholder="name@example.com"
               type="email"
               autoCapitalize="none"
               autoComplete="email"
               autoCorrect="off"
               disabled={isLoading}
               onChange={handleEmailChange}
               required
            />
         </div>
         <div className="grid gap-1">
            <Label
               className="text-sm font-light text-foreground/60"
               htmlFor="email"
            >
               Password
            </Label>
           
             <Input
               id="password"
               placeholder="you password"
               type="password"
               autoCapitalize="none"
               autoComplete="password"
               autoCorrect="off"
               disabled={isLoading}
               required
            />
         </div>
         <div className="grid gap-1">
            <Label
               className="text-sm font-light text-foreground/60"
               htmlFor="email"
            >
               member me
            </Label>
             <Input
               id="rememberMe"
               placeholder="rember Me"
               type="checkbox"
               autoCapitalize="none"
               autoComplete="rememberMe"
               autoCorrect="off"
               disabled={isLoading}
               onChange={handleEmailChange}
               required
            />
         </div>
         <Button
            onClick={onSubmitEmail}
            disabled={isLoading}
         >
            {isLoading && <Loader className="mr-2 h-4 animate-spin" />}
            登  录
         </Button>
      </>
   )
}
