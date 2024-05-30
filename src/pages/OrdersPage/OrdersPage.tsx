import { AllOrdersTable } from '@/modules/orders/components/AllOrdersTable/AllOrdersTable';

import { Filter } from '@/shared/components/Filter/Filter';

const OrdersPage = () => {
    return (
        <div className="w-full pt-10">
            <div className="px-5 md:px-8 desk:px-10">
                <Filter placeholder="User Name" />
            </div>

            <AllOrdersTable />
        </div>
    );
};

export default OrdersPage;
