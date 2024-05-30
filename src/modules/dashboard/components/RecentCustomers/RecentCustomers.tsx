import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/react';

import { TitleTablet } from '@/shared/components/TitleTable/TitleTablet';

import { useAppSelector } from '@/redux/hook';
import { selectAllCustomers } from '@/redux/customers/customersSelectors';
import { Customer } from '@/shared/utils/difinitions';
import dataCustomer from '@/shared/utils/data/customers.json';
import defoltImage from '@/shared/assets/image/istockphoto-1073173288-170667a.jpg';
import { SkeletonTable } from '@/shared/components/SkeletonTable/SkeletonTable';

const dataCustomerSlice = dataCustomer.slice(0, 6);

const columns = [
    { name: 'Name', uid: 'name' },
    { name: 'Email', uid: 'email' },
    { name: 'Spent', uid: 'spent' },
];

export const RecentCustomers = () => {
    const customers = useAppSelector(selectAllCustomers);
    const data = customers?.data;

    const renderCell = React.useCallback(
        (user: Customer, columnKey: React.Key) => {
            const cellValue = user[columnKey as keyof Customer];

            switch (columnKey) {
                case 'name':
                    return (
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <img
                                src={user.image || defoltImage}
                                alt={user.name}
                                width={24}
                                className="md:w-9"
                            />
                            <p>{user.name}</p>
                        </div>
                    );
                case 'email':
                    return (
                        <p className="max-sm:w-[123px] max-sm:truncate max-sm:hover:absolute max-sm:hover:top-[42%] max-sm:hover:z-10 max-sm:hover:w-auto max-sm:hover:text-clip max-sm:hover:bg-black max-sm:hover:text-white">
                            {user.email}
                        </p>
                    );
                case 'spent':
                    return <p>{user.spent}</p>;

                default:
                    return cellValue;
            }
        },
        [],
    );

    return (
        <section className="w-full ">
            <TitleTablet text="Recent Customers" />
            {data ? (
                <Table
                    removeWrapper
                    classNames={{
                        th: 'border-b border-r bg-natural-white p-[14px] text-xs/[14px] font-medium text-light-grey first:pl-0 last:border-r-0 md:p-5 md:px-5 md:text-sm/[18px]',
                        td: 'border-r p-[14px] text-xs/[14px] font-medium text-main-black first:pl-0 last:border-r-0 last:pr-0 md:p-5 md:text-base/[18px]',
                    }}
                    aria-label="Recent Customers"
                    className="rounded-b-lg border-x border-b border-border-grey bg-natural-white px-[14px] md:px-5 xl:pb-[21px]"
                >
                    <TableHeader columns={columns}>
                        {column => (
                            <TableColumn key={column.uid}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={data}>
                        {item => (
                            <TableRow
                                key={item._id}
                                className="border-b last:border-none"
                            >
                                {columnKey => (
                                    <TableCell>
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            ) : (
                <div className="h-[470px] rounded-b-lg border-x border-b border-border-grey bg-white px-[14px] pt-3 md:px-5 xl:pb-[20px]">
                    {dataCustomerSlice.map(({ image, photo }, index) => (
                        <SkeletonTable
                            key={index}
                            image={image}
                            photo={photo}
                            columns={columns}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
