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
import { fetchAllOrdersThunk } from '@/redux/orders/ordersOperations';
import {
    filterValueOrders,
    selectAllOrders,
} from '@/redux/orders/ordersSelectors';
import { Order } from '@/shared/utils/difinitions';
import { SkeletonTable } from '@/shared/components/SkeletonTable/SkeletonTable';
import dataOrders from '@/shared/utils/data/orders.json';

import defaultImage from '@/shared/assets/image/istockphoto-1073173288-170667a.jpg';

const dataOrdersSlice = dataOrders.slice(0, 6);

const columns = [
    { name: 'User Info', uid: 'user_info' },
    { name: 'Address', uid: 'address' },
    { name: 'Products', uid: 'products' },
    { name: 'Order date', uid: 'order_date' },
    { name: 'Price', uid: 'price' },
    { name: 'Status', uid: 'status' },
];

interface StatusColorMap {
    [key: string]: string;
}
const statusColorMap: StatusColorMap = {
    Completed: 'text-light-green bg-l-green',
    Confirmed: 'text-purple bg-light-purple',
    Pending: 'text-orange bg-light-orange',
    Cancelled: 'text-main-red bg-light-red',
    Processing: 'text-blue bg-light-blue',
    Delivered: 'text-klein-blue bg-light-aqua',
    Shipped: 'text-violet-eggplant bg-light-thistle',
};

export const AllOrdersTable = () => {
    const ordersData = useAppSelector(selectAllOrders);
    const [pageOrders, setPageOrders] = useState<number>(1);

    const dispatch = useAppDispatch();
    const filterQuery = useAppSelector(filterValueOrders);

    const allOrdersPages = ordersData?.pages;

    useEffect(() => {
        const fetchOrders = () => {
            dispatch(fetchAllOrdersThunk({ filterQuery, page: pageOrders }));
        };
        fetchOrders();
    }, [filterQuery, pageOrders]);

    const renderCell = React.useCallback(
        (order: Order, columnKey: React.Key) => {
            const cellValue = order[columnKey as keyof Order];

            switch (columnKey) {
                case 'user_info':
                    return (
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <img
                                src={order.photo || defaultImage}
                                alt={order.name}
                                width={24}
                                className="h-6 rounded-full md:h-9 md:w-9"
                            />
                            <p>{order.name}</p>
                        </div>
                    );
                case 'address':
                    return (
                        <p className="max-sm:w-[123px] max-sm:truncate max-sm:hover:absolute max-sm:hover:top-[42%] max-sm:hover:z-10 max-sm:hover:w-auto max-sm:hover:text-clip max-sm:hover:bg-black max-sm:hover:text-white">
                            {order.address}
                        </p>
                    );
                case 'products':
                    return <p>{order.products}</p>;
                case 'order_date':
                    return (
                        <p className="md:min-w-[110px]">{order.order_date}</p>
                    );
                case 'price':
                    return <p>{order.price}</p>;
                case 'status':
                    return (
                        <div
                            className={`${statusColorMap[order.status]} flex h-auto w-4/5 items-center justify-center rounded-2xl border border-inherit px-3 py-1`}
                        >
                            <p>{order.status}</p>
                        </div>
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
                <TitleTablet text="All orders" />
                {ordersData ? (
                    <>
                        {' '}
                        <Table
                            removeWrapper
                            classNames={{
                                th: 'border-b border-r bg-natural-white p-[14px] text-xs/[14px] font-medium text-light-grey first:pl-0 last:border-r-0 md:p-5 md:px-5 md:text-sm/[18px]',
                                td: 'border-r p-[14px] py-[20px] text-left text-xs/[14px] font-medium text-main-black first:pl-0 last:border-r-0 last:pr-0 md:p-5 md:text-base/[18px]',
                            }}
                            aria-label="All orders"
                            className="rounded-b-lg border-x border-b border-border-grey bg-white px-[14px] md:px-5 xl:pb-[15px]"
                        >
                            <TableHeader columns={columns}>
                                {column => (
                                    <TableColumn key={column.uid}>
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody items={ordersData?.data}>
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
                            pageActive={pageOrders}
                            pages={allOrdersPages}
                            setPage={setPageOrders}
                        />
                    </>
                ) : (
                    <div className="h-[457px] rounded-b-lg border-x border-b border-border-grey bg-white px-[14px] pt-3 md:px-5 xl:pb-[20px]">
                        {dataOrdersSlice.map(({ photo }, index) => (
                            <SkeletonTable
                                key={index}
                                columns={columns}
                                photo={photo}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
