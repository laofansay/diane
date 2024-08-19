'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn, isVariableValid } from '@/lib/utils'
import { Loader, MailIcon, SmartphoneIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react';

import { RootState, useAppDispatch, useAppSelector } from '@/store/index';

import { login } from '@/app/shared/reducers/authentication';

import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Form } from 'reactstrap'
import { Main } from 'next/document'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type LoginFormInputs = {
   username: string;
   password: string;
   rememberMe: boolean;
};


export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

   const dispatch = useAppDispatch();
   const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
   const loginError = useAppSelector(state => state.authentication.loginError);
   const showModalLogin = useAppSelector(state => state.authentication.showModalLogin);

   const authenticationState = useSelector((state: RootState) => state.authentication);
   const router = useRouter();

   if (authenticationState.isAuthenticated) {
      return router.push("/");
   }

   const { register, handleSubmit, formState: { errors } } = useForm < LoginFormInputs > ();
   const onSubmit: SubmitHandler<LoginFormInputs> = data => {
      dispatch(login(data.username, data.password, data.rememberMe));
   };


   return (
      <main>
         <div className={cn('grid gap-6', className)} {...props}>
            <div>
               login error
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="grid gap-1">
                  <Label
                     className="text-sm font-light text-foreground/60"
                     htmlFor="email"
                  >
                     username
                  </Label>
                  <Input
                     {...register('username', { required: '用户名不能空!' })}
                     id="username"
                     placeholder="name@example.com"
                     type="text"
                     autoCapitalize="none"
                     autoCorrect="off"
                     disabled={isAuthenticated}
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

                     {...register('password', { required: '密码不能为空!' })}
                     id="password"
                     placeholder="password"
                     type="password"
                     autoCapitalize="none"
                     autoComplete="password"
                     autoCorrect="off"
                     disabled={isAuthenticated}
                     required
                  />
               </div>
               <div className="grid gap-1">
                  <Label
                     className="text-sm font-light text-foreground/60"
                     htmlFor="email"
                  >
                     Member me
                  </Label>
                  <Input
                     {...register('rememberMe')}
                     id="rememberMe"
                     placeholder="Member me"
                     type="checkBox"
                     autoCapitalize="none"
                     autoCorrect="off"
                     disabled={isAuthenticated}
                     required
                  />
               </div>
               <Button color="primary" type="submit" data-cy="submit">
                  {isAuthenticated && <Loader className="mr-2 h-4 animate-spin" />}
                  Login with Email
               </Button>
            </form>
            <div className="relative">
               <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
               </div>
               <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                     Or continue with
                  </span>
               </div>
            </div>
         </div>
      </main>
   )
}


