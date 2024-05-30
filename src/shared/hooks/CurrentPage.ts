import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useCurrentPageName = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState('');

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setCurrentPage('Dashboard');
                break;
            case '/orders':
                setCurrentPage('All orders');
                break;
            case '/products':
                setCurrentPage('All products');
                break;
            case '/suppliers':
                setCurrentPage('All suppliers');
                break;
            case '/customers':
                setCurrentPage('All customers');
                break;
            default:
                setCurrentPage('');
        }
    }, [location.pathname]);

    return currentPage;
};
