import password from '@/app/shared/reducers/account/password.reducer'
import register from '@/app/shared/reducers/account/register.reducer'
import settings from '@/app/shared/reducers/account/settings.reducer'
import authentication from '@/app/shared/reducers/authentication'
import address from '@/app/shared/reducers/entities/address.reducer'
import babyLabel from '@/app/shared/reducers/entities/baby-label.reducer'
import babySpec from '@/app/shared/reducers/entities/baby-spec.reducer'
import banner from '@/app/shared/reducers/entities/banner.reducer'
import brand from '@/app/shared/reducers/entities/brand.reducer'
import cartItem from '@/app/shared/reducers/entities/cart-item.reducer'
import cart from '@/app/shared/reducers/entities/cart.reducer'
import category from '@/app/shared/reducers/entities/category.reducer'
import discountCode from '@/app/shared/reducers/entities/discount-code.reducer'
import notification from '@/app/shared/reducers/entities/notification.reducer'
import orderItem from '@/app/shared/reducers/entities/order-item.reducer'
import order from '@/app/shared/reducers/entities/order.reducer'
import paymentProvider from '@/app/shared/reducers/entities/payment-provider.reducer'
import payment from '@/app/shared/reducers/entities/payment.reducer'
import product from '@/app/shared/reducers/entities/product.reducer'
import refund from '@/app/shared/reducers/entities/refund.reducer'
import wishlist from '@/app/shared/reducers/entities/wishlist.reducer'
import { authReducer } from '@/store/authSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import exp from 'constants'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import authMiddleware from './authMiddleware'

const createNoopStorage = () => {
   return {
      getItem() {
         return Promise.resolve(null)
      },
      setItem(_key: string, value: number) {
         return Promise.resolve(value)
      },
      removeItem() {
         return Promise.resolve()
      },
   }
}

const storage =
   typeof window !== 'undefined'
      ? createWebStorage('local')
      : createNoopStorage()

const authPersistConfig = {
   key: 'auth',
   storage: storage,
   whitelist: ['authState'],
}

const persistedReducer = persistReducer(authPersistConfig, authReducer)

const rootReducer = combineReducers({
   auth: persistedReducer,
   authentication,
   cart,
   cartItem,
   brand,
   product,
   category,
   babySpec,
   babyLabel,
   order,
   orderItem,
   address,
   notification,
   discountCode,
   refund,
   payment,
   paymentProvider,
   banner,
   password,
   settings,
   register,
   wishlist,
})

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(authMiddleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   UnknownAction
>

export default store
