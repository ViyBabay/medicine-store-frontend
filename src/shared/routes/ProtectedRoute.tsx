import { selectLoggedIn, selectIsRefreshing } from '@/redux/auth/authSelectors';
import { useAppSelector } from '@/redux/hook';
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RouteProps {
    component: React.ComponentType;
    redirectTo?: string;
}

export const ProtectedRoute: FC<RouteProps> = ({
    component: Component,
    redirectTo = '/login',
}) => {
    const location = useLocation();
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const isRefreshing = useAppSelector(selectIsRefreshing);
    const shouldRedirect = !isLoggedIn && !isRefreshing;

    return shouldRedirect ? (
        <Navigate to={redirectTo} state={{ from: location }} />
    ) : (
        <Component />
    );
};
