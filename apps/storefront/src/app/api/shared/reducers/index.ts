import { ReducersMapObject } from '@reduxjs/toolkit';

import administration from '@/app/api/modules/administration/administration.reducer';
import userManagement from '@/app/api/modules/administration/user-management/user-management.reducer';
import register from '@/app/api/modules/account/register/register.reducer';
import activate from '@/app/api/modules/account/activate/activate.reducer';
import password from '@/app/api/modules/account/password/password.reducer';
import settings from '@/app/api/modules/account/settings/settings.reducer';
import passwordReset from '@/app/api/modules/account/password-reset/password-reset.reducer';
import entitiesReducers from '@/app/api/modules/entities/reducers';
import applicationProfile from './application-profile';
import authentication from './authentication';
import locale from './locale';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const rootReducer: ReducersMapObject = {
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  ...entitiesReducers,
};

export default rootReducer;
