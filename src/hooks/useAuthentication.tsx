

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch, useAppSelector } from '@/store/index';
import { useEffect } from 'react';
import { getSession } from '@/app/shared/reducers/authentication';

export function useAuthenticated(): boolean {
   const dispatch = useAppDispatch();

   const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
   //const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
   const account = useAppSelector(state => state.authentication.account);


   useEffect(() => {
      dispatch(getSession());
   }, []);


   return isAuthenticated;
}

export function useAuthenticatedAccount() {
   const authenticationState = useSelector((state: RootState) => state.authentication);
   return authenticationState.account;
}