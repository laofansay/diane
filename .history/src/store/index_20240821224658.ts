import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { authReducer } from "@/store/authSlice";



import authentication from '@/app/shared/reducers/authentication';
import cart from '@/app/shared/reducers/entities/cart.reducer';

import cartItem from '@/app/shared/reducers/entities/cart-item.reducer';
import brand from '@/app/shared/reducers/entities/brand.reducer';
import product from '@/app/shared/reducers/entities/product.reducer';
import category from '@/app/shared/reducers/entities/category.reducer';
import babySpec from '@/app/shared/reducers/entities/baby-spec.reducer';
import babyLabel from '@/app/shared/reducers/entities/baby-label.reducer';
import order from '@/app/shared/reducers/entities/order.reducer';
import orderItem from '@/app/shared/reducers/entities/order-item.reducer';
import address from '@/app/shared/reducers/entities/address.reducer';
import notification from '@/app/shared/reducers/entities/notification.reducer';
import discountCode from '@/app/shared/reducers/entities/discount-code.reducer';
import refund from '@/app/shared/reducers/entities/refund.reducer';
import payment from '@/app/shared/reducers/entities/payment.reducer';
import paymentProvider from '@/app/shared/reducers/entities/payment-provider.reducer';
import banner from '@/app/shared/reducers/entities/banner.reducer';


import banner from '@/app/shared/reducers/entities/account/settings.reducer';

import banner from '@/app/shared/reducers/entities/banner.reducer';



import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import { UnknownAction, ThunkAction } from '@reduxjs/toolkit';
import exp from "constants";


const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: number) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const authPersistConfig = {
    key: "auth",
    storage: storage,
    whitelist: ["authState"],
};

const persistedReducer = persistReducer(authPersistConfig, authReducer);

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

});



export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>;

export default store
