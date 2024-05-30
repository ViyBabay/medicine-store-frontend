import { CustomersTable } from '@/modules/customers/components/CustomersTable/CustomersTable';
import { Filter } from '@/shared/components/Filter/Filter';

const CustomersPage = () => {
    return (
        <div className="w-full pt-10">
            <div className="px-5 md:px-8 desk:px-10">
                <Filter placeholder="User Name" />
            </div>
            <CustomersTable />
        </div>
    );
};

export default CustomersPage;
