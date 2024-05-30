import {
    OrdersData,
    DefaultThunkApiConfig,
    QueryParams,
} from './../../shared/utils/difinitions';
import { getOrders } from '@/services/api/api';
import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllOrdersThunk = createAsyncThunk<
    OrdersData,
    QueryParams | undefined,
    DefaultThunkApiConfig
>('orders/fetchAllOrders', async (params, { rejectWithValue }) => {
    try {
        const data: OrdersData = await getOrders(params);

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
