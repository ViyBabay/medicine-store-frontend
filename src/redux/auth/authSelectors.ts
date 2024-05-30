import { RootState } from '../store';

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
