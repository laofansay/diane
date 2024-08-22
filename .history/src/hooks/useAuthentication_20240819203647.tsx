
import { validateBoolean } from '@/lib/utils'
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/index';

export function useAuthenticated(): boolean {
   const authenticationState = useSelector((state: RootState) => state.authentication);
   return authenticationState.isAuthenticated;
}

export function useAuthenticatedAccount() {
   const authenticationState = useSelector((state: RootState) => state.authentication);
   return authenticationState.account;
}