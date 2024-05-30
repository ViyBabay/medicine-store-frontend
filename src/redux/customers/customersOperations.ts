import {
    CustomersData,
    DefaultThunkApiConfig,
    QueryParams,
} from './../../shared/utils/difinitions';
import { getCustomers } from '@/services/api/api';
import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllCustomersThunk = createAsyncThunk<
    CustomersData,
    QueryParams | undefined,
    DefaultThunkApiConfig
>('customers/fetchAllCustomers', async (params, { rejectWithValue }) => {
    try {
        const data: CustomersData = await getCustomers(params);
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
