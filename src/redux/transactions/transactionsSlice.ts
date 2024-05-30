import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { TransactionsState } from '@/shared/utils/difinitions';
import { pending, rejected } from '../helpers/stateFunctions';
import { fetchAllTransactionsThunk } from './transactionsOperations';

const initialState: TransactionsState = {
    transactions: null,
    filter: '',
    isLoading: false,
    error: undefined,
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setFilter: (
            state: TransactionsState,
            action: PayloadAction<string>,
        ) => {
            state.filter = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllTransactionsThunk.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.transactions.total = action.payload.total;
                state.isLoading = false;
            })
            .addMatcher(isAnyOf(fetchAllTransactionsThunk.pending), pending)
            .addMatcher(isAnyOf(fetchAllTransactionsThunk.rejected), rejected);
    },
});

export const { setFilter } = transactionsSlice.actions;

export const transactionsReducer = transactionsSlice.reducer;
