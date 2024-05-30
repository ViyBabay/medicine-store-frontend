import { getTransactions } from './../../services/api/api';
import {
    DefaultThunkApiConfig,
    QueryParams,
    TransactionsData,
} from '../../shared/utils/difinitions';

import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllTransactionsThunk = createAsyncThunk<
    TransactionsData,
    QueryParams | undefined,
    DefaultThunkApiConfig
>('customers/fetchAllTransactions', async (params, { rejectWithValue }) => {
    try {
        const data: TransactionsData = await getTransactions(params);
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
