import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../../modules/header/components/Header/Header';
import { NavLinkHeader } from '../../../modules/header/components/NavLinkHeader/NavLinkHeader';

export const SharedLayout = (): JSX.Element => {
    return (
        <>
            <Header />
            <main className="flex bg-semi-white">
                <div className="hidden desk:block desk:min-h-screen desk:border-r desk:border-solid desk:border-border-grey desk:bg-semi-white desk:p-[18px] ">
                    <NavLinkHeader />
                </div>
                <Suspense>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
};
