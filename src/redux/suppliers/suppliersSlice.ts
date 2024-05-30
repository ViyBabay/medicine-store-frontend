import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { SuppliersState } from '@/shared/utils/difinitions';
import { pending, rejected } from '../helpers/stateFunctions';
import {
    fetchAddSuppliersThunk,
    fetchAllSuppliersThunk,
    fetchCurrentSupplierThunk,
    fetchEditSupplierThunk,
} from './suppliersOperations';

const initialState: SuppliersState = {
    suppliers: null,
    currentSupplier: null,
    filter: '',
    isLoading: false,
    error: undefined,
};

const suppliersSlice = createSlice({
    name: 'suppliers',
    initialState,
    reducers: {
        setFilterSuppliers: (
            state: SuppliersState,
            action: PayloadAction<string>,
        ) => {
            state.filter = action.payload;
        },
        setCurrentSupplier: (state, action) => {
            state.currentSupplier = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllSuppliersThunk.fulfilled, (state, action) => {
                state.suppliers = action.payload;
                state.suppliers.total = action.payload.total;
                state.isLoading = false;
            })
            .addCase(fetchAddSuppliersThunk.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(fetchEditSupplierThunk.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(fetchCurrentSupplierThunk.fulfilled, (state, action) => {
                state.currentSupplier = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCurrentSupplierThunk.rejected, (state, action) => {
                state.currentSupplier = null;
                state.error = action.error;
                state.isLoading = false;
            })
            .addCase(fetchCurrentSupplierThunk.pending, state => {
                state.isLoading = true;
            })
            .addMatcher(
                isAnyOf(
                    fetchAllSuppliersThunk.pending,
                    fetchAddSuppliersThunk.pending,
                    fetchEditSupplierThunk.pending,
                ),
                pending,
            )
            .addMatcher(
                isAnyOf(
                    fetchAllSuppliersThunk.rejected,
                    fetchAddSuppliersThunk.rejected,
                    fetchEditSupplierThunk.rejected,
                ),
                rejected,
            );
    },
});

export const { setFilterSuppliers, setCurrentSupplier } =
    suppliersSlice.actions;

export const suppliersReducer = suppliersSlice.reducer;
