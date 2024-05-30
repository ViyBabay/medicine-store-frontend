import {
    CustomersState,
    AuthState,
    ProductsState,
    SuppliersState,
    TransactionsState,
    OrdersState,
} from '@/shared/utils/difinitions';
import { PayloadAction, SerializedError } from '@reduxjs/toolkit';

export const pending = (
    state:
        | AuthState
        | CustomersState
        | ProductsState
        | SuppliersState
        | TransactionsState
        | OrdersState,
) => {
    state.isLoading = true;
    state.error = undefined;
};

export const rejected = (
    state:
        | AuthState
        | CustomersState
        | ProductsState
        | SuppliersState
        | TransactionsState
        | OrdersState,
    action: PayloadAction<SerializedError | undefined>,
) => {
    state.isLoading = false;
    state.error = action.payload;
};
