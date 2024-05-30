import {
    getCurrentUser,
    setAuthToken,
    signin,
    signout,
} from '@/services/api/api';
import {
    CurrentUser,
    DefaultThunkApiConfig,
    SignInData,
    SignOutData,
    User,
} from '@/shared/utils/difinitions';
import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const CurrentUserThunk = createAsyncThunk<
    CurrentUser,
    void,
    DefaultThunkApiConfig
>('auth/currentUser', async (_, { rejectWithValue }) => {
    try {
        const data: CurrentUser = await getCurrentUser();

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

export const loginThunk = createAsyncThunk<
    SignInData,
    User,
    DefaultThunkApiConfig
>('auth/signin', async (credentials: User, { rejectWithValue, dispatch }) => {
    try {
        const data: SignInData = await signin(credentials);
        dispatch(CurrentUserThunk());
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

export const logoutThunk = createAsyncThunk<
    SignOutData,
    void,
    DefaultThunkApiConfig
>('auth/signout', async (_, { rejectWithValue }) => {
    try {
        const data: SignOutData = await signout();
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

export const refreshUserThunk = createAsyncThunk<
    CurrentUser | undefined,
    void,
    DefaultThunkApiConfig
>('auth/refresh', async (_, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return rejectWithValue({
            message: 'Token is not found!',
        } as SerializedError);
    } else {
        setAuthToken(token);
    }

    try {
        dispatch(CurrentUserThunk());
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
