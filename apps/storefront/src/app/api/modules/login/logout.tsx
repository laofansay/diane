import React, { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { logout } from '@/app/api/shared/reducers/authentication';

export const Logout = () => {
  const authentication = useAppSelector(state => state.authentication);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(logout());
    if (authentication.logoutUrl) {
      window.location.href = authentication.logoutUrl;
    } else if (!authentication.isAuthenticated) {
      window.location.href = '/';
    }
  });

  return (
    <div className="p-5">
      <h4>Logged out successfully!</h4>
    </div>
  );
};

export default Logout;
