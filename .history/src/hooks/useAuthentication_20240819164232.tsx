
import { validateBoolean } from '@/lib/utils'
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/index';

export function useAuthenticated(): boolean {
   const authenticationState = useSelector((state: RootState) => state.authentication);
   console.log('Authentication account:', authenticationState.account); // 调试信息
   console.log('Authentication islogin:', authenticationState.isAuthenticated); // 调试信息
   return authenticationState.isAuthenticated;
}