import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchAllCustomersThunk } from './customersOperations';
import { CustomersState } from '@/shared/utils/difinitions';
import { pending, rejected } from '../helpers/stateFunctions';

const initialState: CustomersState = {
    customers: null,
    filter: '',
    isLoading: false,
    error: undefined,
};

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setFilterCustomers: (
            state: CustomersState,
            action: PayloadAction<string>,
        ) => {
            state.filter = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllCustomersThunk.fulfilled, (state, action) => {
                state.customers = action.payload;
                state.customers.total = action.payload.total;
                state.isLoading = false;
            })
            .addMatcher(isAnyOf(fetchAllCustomersThunk.pending), pending)
            .addMatcher(isAnyOf(fetchAllCustomersThunk.rejected), rejected);
    },
});

export const { setFilterCustomers } = customersSlice.actions;

export const customersReducer = customersSlice.reducer;
