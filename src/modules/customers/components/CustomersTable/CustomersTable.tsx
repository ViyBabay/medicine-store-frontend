import React, { useEffect, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    PaginationItemType,
} from '@nextui-org/react';

import { TitleTablet } from '@/shared/components/TitleTable/TitleTablet';
import { CustomPagination } from '../../../../shared/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

import {
    filterValueCustomers,
    selectAllCustomers,
} from '@/redux/customers/customersSelectors';
import { Customer } from '@/shared/utils/difinitions';
import { SkeletonTable } from '@/shared/components/SkeletonTable/SkeletonTable';
import dataCustomer from '@/shared/utils/data/customers.json';
import { fetchAllCustomersThunk } from '@/redux/customers/customersOperations';
import defaultImage from '@/shared/assets/image/istockphoto-1073173288-170667a.jpg';

const dataCustomerSlice = dataCustomer.slice(0, 6);

const columns = [
    { name: 'User Info', uid: 'name' },
    { name: 'Email', uid: 'email' },
    { name: 'Address', uid: 'address' },
    { name: 'Phone', uid: 'phone' },
    { name: 'Register date', uid: 'register_date' },
];

export const CustomersTable = () => {
    const customersData = useAppSelector(selectAllCustomers);

    const [pageCustomers, setPageCustomers] = useState<number>(1);

    const dispatch = useAppDispatch();
    const filterQuery = useAppSelector(filterValueCustomers);

    const allCustomersPages = customersData?.pages;

    useEffect(() => {
        const fetchCustumers = () => {
            dispatch(
                fetchAllCustomersThunk({ filterQuery, page: pageCustomers }),
            );
        };
        fetchCustumers();
    }, [filterQuery, pageCustomers]);

    const renderCell = React.useCallback(
        (customer: Customer, columnKey: React.Key) => {
            const cellValue = customer[columnKey as keyof Customer];

            switch (columnKey) {
                case 'name':
                    return (
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <img
                                src={customer.image || defaultImage}
                                alt={customer.name}
                                width={24}
                                className="h-6 rounded-full md:h-9 md:w-9"
                            />
                            <p>{customer.name}</p>
                        </div>
                    );
                case 'email':
                    return (
                        <p className="max-sm:w-[123px] max-sm:truncate max-sm:hover:absolute max-sm:hover:top-[42%] max-sm:hover:z-10 max-sm:hover:w-auto max-sm:hover:text-clip max-sm:hover:bg-black max-sm:hover:text-white">
                            {customer.email}
                        </p>
                    );
                case 'address':
                    return (
                        <p className="max-sm:w-[123px] max-sm:truncate max-sm:hover:absolute max-sm:hover:top-[42%] max-sm:hover:z-10 max-sm:hover:w-auto max-sm:hover:text-clip max-sm:hover:bg-black max-sm:hover:text-white">
                            {customer.address}
                        </p>
                    );
                case 'phone':
                    return (
                        <p className="max-sm:w-[123px] max-sm:truncate max-sm:hover:absolute max-sm:hover:top-[42%] max-sm:hover:z-10 max-sm:hover:w-auto max-sm:hover:text-clip max-sm:hover:bg-black max-sm:hover:text-white">
                            {customer.phone}
                        </p>
                    );
                case 'register_date':
                    return (
                        <p className="max-sm:w-[123px] max-sm:truncate max-sm:hover:absolute max-sm:hover:top-[42%] max-sm:hover:z-10 max-sm:hover:w-auto max-sm:hover:text-clip max-sm:hover:bg-black max-sm:hover:text-white">
                            {customer.register_date}
                        </p>
                    );

                default:
                    return cellValue;
            }
        },
        [],
    );

    return (
        <section className="my-5 scroll-px-[50px] overflow-x-auto border-x-scroll-white px-5 pb-10 scrollbar-thin scrollbar-track-[#F1F1F1] scrollbar-thumb-medium-grey md:px-8 desk:px-10">
            <div className="w-[700px] md:w-[1000px] xl:w-full">
                <TitleTablet text="Customers Data" />
                {customersData ? (
                    <>
                        {' '}
                        <Table
                            removeWrapper
                            classNames={{
                                th: 'border-b border-r bg-natural-white p-[14px] text-xs/[14px] font-medium text-light-grey first:pl-0 last:border-r-0 md:p-5 md:px-5 md:text-sm/[18px]',
                                td: 'border-r p-[14px] py-[20px] text-left text-xs/[14px] font-medium text-main-black first:pl-0 last:border-r-0 last:pr-0 md:p-5 md:text-base/[18px]',
                            }}
                            aria-label="Customers Data"
                            className="rounded-b-lg border-x border-b border-border-grey bg-white px-[14px] md:px-5 xl:pb-[15px]"
                        >
                            <TableHeader columns={columns}>
                                {column => (
                                    <TableColumn key={column.uid}>
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>

                            <TableBody items={customersData?.data}>
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
                        <CustomPagination
                            pageActive={pageCustomers}
                            pages={allCustomersPages}
                            setPage={setPageCustomers}
                        />
                    </>
                ) : (
                    <div className="h-[457px] rounded-b-lg border-x border-b border-border-grey bg-white px-[14px] pt-3 md:px-5 xl:pb-[15px]">
                        {dataCustomerSlice.map(({ image, photo }, index) => (
                            <SkeletonTable
                                key={index}
                                columns={columns}
                                image={image}
                                photo={photo}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
