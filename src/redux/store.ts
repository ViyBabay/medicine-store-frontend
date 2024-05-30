import { transactionsReducer } from './transactions/transactionsSlice';
import { configureStore } from '@reduxjs/toolkit';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/authSlice';
import { customersReducer } from './customers/customersSlice';
import { productsReducer } from './products/productsSlice';
import { suppliersReducer } from './suppliers/suppliersSlice';
import { ordersReducer } from './orders/ordersSlice';

const persistConfig = {
    key: 'auth',
    version: 1,
    storage,
    whitelist: ['token', 'refreshToken'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        customers: customersReducer,
        products: productsReducer,
        suppliers: suppliersReducer,
        orders: ordersReducer,
        transactions: transactionsReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),

    devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
