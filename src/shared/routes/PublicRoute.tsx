import { selectLoggedIn } from '@/redux/auth/authSelectors';
import { useAppSelector } from '@/redux/hook';
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RouteProps {
    component: React.ComponentType;
    redirectTo?: string;
}

export const PublicRoute: FC<RouteProps> = ({
    component: Component,
    redirectTo = '/',
}) => {
    const location = useLocation();
    const isLoggedIn = useAppSelector(selectLoggedIn);

    return isLoggedIn ? (
        <Navigate to={location?.state?.from || redirectTo} />
    ) : (
        <Component />
    );
};
