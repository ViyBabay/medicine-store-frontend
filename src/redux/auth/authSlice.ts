import { AuthState } from '@/shared/utils/difinitions';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { CurrentUserThunk, loginThunk, logoutThunk } from './authOperations';
import { pending, rejected } from '../helpers/stateFunctions';

const initialState: AuthState = {
    user: {},
    isLoggedIn: false,
    isLoading: false,
    error: undefined,
    isRefreshing: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loginThunk.fulfilled, state => {
                state.isLoggedIn = true;
                state.isLoading = false;
            })
            .addCase(CurrentUserThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isRefreshing = false;
                state.isLoggedIn = true;
                state.isLoading = false;
            })
            .addCase(CurrentUserThunk.pending, state => {
                state.isRefreshing = true;
            })
            .addCase(CurrentUserThunk.rejected, state => {
                state.isRefreshing = false;
            })
            .addCase(logoutThunk.fulfilled, state => {
                state.user = { name: '', email: '' };
                state.isLoggedIn = false;
                state.isLoading = false;
            })
            .addMatcher(
                isAnyOf(loginThunk.pending, logoutThunk.pending),
                pending,
            )
            .addMatcher(
                isAnyOf(loginThunk.rejected, logoutThunk.rejected),
                rejected,
            );
    },
});

export const authReducer = authSlice.reducer;
