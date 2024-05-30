import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { ProductsState } from '@/shared/utils/difinitions';
import { pending, rejected } from '../helpers/stateFunctions';
import {
    fetchAddProductsThunk,
    fetchAllProductsThunk,
    fetchCurrentProductThunk,
    fetchDeleteProductThunk,
    fetchEditProductThunk,
} from './productsOperations';

const initialState: ProductsState = {
    products: null,
    currentProduct: null,
    filter: '',
    isLoading: false,
    error: undefined,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilterProducts: (
            state: ProductsState,
            action: PayloadAction<string>,
        ) => {
            state.filter = action.payload;
        },
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
                state.products = action.payload;
                state.products.total = action.payload.total;
                state.isLoading = false;
            })
            .addCase(fetchAddProductsThunk.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(fetchEditProductThunk.fulfilled, state => {
                state.isLoading = false;
            });
        builder
            .addCase(fetchCurrentProductThunk.fulfilled, (state, action) => {
                state.currentProduct = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCurrentProductThunk.rejected, (state, action) => {
                state.currentProduct = null;
                state.error = action.error;
                state.isLoading = false;
            })
            .addCase(fetchCurrentProductThunk.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchDeleteProductThunk.fulfilled, state => {
                state.isLoading = false;
            })
            .addMatcher(
                isAnyOf(
                    fetchAllProductsThunk.pending,
                    fetchAddProductsThunk.pending,
                    fetchEditProductThunk.pending,
                    fetchDeleteProductThunk.pending,
                ),
                pending,
            )
            .addMatcher(
                isAnyOf(
                    fetchAllProductsThunk.rejected,
                    fetchAddProductsThunk.rejected,
                    fetchEditProductThunk.rejected,
                    fetchDeleteProductThunk.rejected,
                ),
                rejected,
            );
    },
});

export const { setFilterProducts, setCurrentProduct } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
