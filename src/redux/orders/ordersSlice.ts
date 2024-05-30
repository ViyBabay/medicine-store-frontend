import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchAllOrdersThunk } from './ordersOperations';
import { OrdersState } from '@/shared/utils/difinitions';
import { pending, rejected } from '../helpers/stateFunctions';

const initialState: OrdersState = {
    orders: null,
    filter: '',
    isLoading: false,
    error: undefined,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setFilterOrders: (
            state: OrdersState,
            action: PayloadAction<string>,
        ) => {
            state.filter = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllOrdersThunk.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.orders.total = action.payload.total;
                state.isLoading = false;
            })
            .addMatcher(isAnyOf(fetchAllOrdersThunk.pending), pending)
            .addMatcher(isAnyOf(fetchAllOrdersThunk.rejected), rejected);
    },
});

export const { setFilterOrders } = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
