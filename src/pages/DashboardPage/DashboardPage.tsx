import { IncomeExpenses } from '@/modules/dashboard/components/IncomeExpenses/IncomeExpenses';
import { RecentCustomers } from '../../modules/dashboard/components/RecentCustomers/RecentCustomers';
import { Statistics } from '../../modules/dashboard/components/Statistics/Statistics';
import { useAppDispatch } from '@/redux/hook';
import { useEffect } from 'react';
import { fetchAllCustomersThunk } from '@/redux/customers/customersOperations';
import { fetchAllProductsThunk } from '@/redux/products/productsOperations';
import { fetchAllSuppliersThunk } from '@/redux/suppliers/suppliersOperations';
import { fetchAllTransactionsThunk } from '@/redux/transactions/transactionsOperations';

const DashboardPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllCustomersThunk());
        dispatch(fetchAllProductsThunk());
        dispatch(fetchAllSuppliersThunk());
        dispatch(fetchAllTransactionsThunk());
    }, [dispatch]);

    return (
        <div className="w-full px-5 md:px-8 desk:px-10">
            <Statistics />
            <div className="mb-10 flex flex-col gap-5 xl:flex-row">
                <RecentCustomers />
                <IncomeExpenses />
            </div>
        </div>
    );
};

export default DashboardPage;
