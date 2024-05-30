import {
    DefaultThunkApiConfig,
    InitialValueSuppliers,
    QueryParams,
    Supplier,
    SuppliersData,
} from '../../shared/utils/difinitions';
import {
    addSuppliers,
    editSuppliersId,
    getSuppliers,
    getSuppliersId,
} from '@/services/api/api';
import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllSuppliersThunk = createAsyncThunk<
    SuppliersData,
    QueryParams | undefined,
    DefaultThunkApiConfig
>('suppliers/fetchAllSuppliers', async (params, { rejectWithValue }) => {
    try {
        const data: SuppliersData = await getSuppliers(params);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serializedError: SerializedError = {
                message: error?.response?.data.message,
            };

            return rejectWithValue(serializedError);
        }

        return rejectWithValue({
            message: 'An unknown error has occurred',
        } as SerializedError);
    }
});

export const fetchAddSuppliersThunk = createAsyncThunk<
    Supplier,
    InitialValueSuppliers,
    DefaultThunkApiConfig
>(
    'suppliers/fetchAddSuppliers',
    async (supplier, { rejectWithValue, dispatch }) => {
        try {
            const data: Supplier = await addSuppliers(supplier);
            dispatch(fetchAllSuppliersThunk());
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serializedError: SerializedError = {
                    message: error?.response?.data.message,
                };
                return rejectWithValue(serializedError);
            }
            return rejectWithValue({
                message: 'An unknown error has occurred',
            } as SerializedError);
        }
    },
);

export const fetchCurrentSupplierThunk = createAsyncThunk<
    Supplier,
    string,
    DefaultThunkApiConfig
>('suppliers/fetchCurrentSupplier', async (supplier, { rejectWithValue }) => {
    try {
        const data: Supplier = await getSuppliersId(supplier);

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serializedError: SerializedError = {
                message: error?.response?.data.message,
            };
            return rejectWithValue(serializedError);
        }
        return rejectWithValue({
            message: 'An unknown error has occurred',
        } as SerializedError);
    }
});

export const fetchEditSupplierThunk = createAsyncThunk<
    Supplier,
    { id: string; supplier: InitialValueSuppliers },
    DefaultThunkApiConfig
>(
    'suppliers/fetchEditSupplier',
    async ({ id, supplier }, { rejectWithValue, dispatch }) => {
        try {
            const data = await editSuppliersId({ id, supplier });
            dispatch(fetchAllSuppliersThunk());
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serializedError: SerializedError = {
                    message: error?.response?.data.message,
                };
                return rejectWithValue(serializedError);
            }
            return rejectWithValue({
                message: 'An unknown error has occurred',
            } as SerializedError);
        }
    },
);
