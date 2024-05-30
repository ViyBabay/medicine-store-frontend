import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';

import LoginPage from './pages/LoginPage/LoginPage';

import { SharedLayout } from './shared/components/SharedLayout/SharedLayout';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { refreshUserThunk } from './redux/auth/authOperations';
import { selectIsRefreshing } from './redux/auth/authSelectors';
import { PublicRoute } from './shared/routes/PublicRoute';
import { ProtectedRoute } from './shared/routes/ProtectedRoute';
import Logo from '@/shared/icon/logo.svg';

const OrdersPage = lazy(() => import('./pages/OrdersPage/OrdersPage'));
const AllProductsPage = lazy(
    () => import('./pages/AllProductsPage/AllProductsPage'),
);
const SuppliersPage = lazy(() => import('./pages/SuppliersPage/SuppliersPage'));
const CustomersPage = lazy(() => import('./pages/CustomersPage/CustomersPage'));

export const App = () => {
    const dispatch = useAppDispatch();
    const isRefreshing = useAppSelector(selectIsRefreshing);
    useEffect(() => {
        dispatch(refreshUserThunk());
    }, [dispatch]);

    return isRefreshing ? (
        <img
            src={Logo}
            alt="logo"
            width={150}
            height={150}
            className="absolute inset-0 m-auto opacity-75"
        />
    ) : (
        <Routes>
            <Route
                path="/login"
                element={<PublicRoute component={LoginPage} redirectTo="/" />}
            />
            <Route path="/" element={<SharedLayout />}>
                <Route
                    index
                    element={
                        <ProtectedRoute
                            component={DashboardPage}
                            redirectTo="/login"
                        />
                    }
                />

                <Route
                    path="orders"
                    element={
                        <ProtectedRoute
                            component={OrdersPage}
                            redirectTo="/login"
                        />
                    }
                />
                <Route
                    path="products"
                    element={
                        <ProtectedRoute
                            component={AllProductsPage}
                            redirectTo="/login"
                        />
                    }
                />
                <Route
                    path="suppliers"
                    element={
                        <ProtectedRoute
                            component={SuppliersPage}
                            redirectTo="/login"
                        />
                    }
                />
                <Route
                    path="customers"
                    element={
                        <ProtectedRoute
                            component={CustomersPage}
                            redirectTo="/login"
                        />
                    }
                />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
