import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../../modules/header/components/Header/Header';

export const SharedLayout = () => {
    return (
        <div className="container min-h-screen max-w-screen-desk">
            <Header />
            <main className="">
                <Suspense>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
};
