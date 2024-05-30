import React, { FC, useEffect, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import icon from '@/shared/icon/sprite.svg';
import { TitleTablet } from '@/shared/components/TitleTable/TitleTablet';
import { CustomPagination } from '@/shared/components/Pagination/Pagination';
import { PaginationItemType } from '@nextui-org/react';
import { Product } from '@/shared/utils/difinitions';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
    filterValueProducts,
    selectAllProducts,
    selectIsLoading,
} from '@/redux/products/productsSelectors';
import {
    fetchAllProductsThunk,
    fetchCurrentProductThunk,
    fetchDeleteProductThunk,
} from '@/redux/products/productsOperations';
import { SkeletonTable } from '@/shared/components/SkeletonTable/SkeletonTable';
import products from '@/shared/utils/data/products.json';
interface TableAllProductsProps {
    openModal: (type: string) => void;
}

const columns = [
    { name: 'Product Info', uid: 'product_info' },
    { name: 'Category', uid: 'category' },
    { name: 'Stock', uid: 'stock' },
    { name: 'Suppliers', uid: 'suppliers' },
    { name: 'Price', uid: 'price' },
    { name: 'Action', uid: 'action' },
];
const dataProductsSlice = products.slice(0, 6);

export const TableAllProducts: FC<TableAllProductsProps> = ({ openModal }) => {
    const dispatch = useAppDispatch();
    const productsData = useAppSelector(selectAllProducts);
    const isLoading = useAppSelector(selectIsLoading);

    const [pageProducts, setPageProducts] = useState<number>(1);

    const filterQuery = useAppSelector(filterValueProducts);

    const allProductsPages = productsData?.pages;

    useEffect(() => {
        const fetchProducts = () => {
            dispatch(
                fetchAllProductsThunk({ filterQuery, page: pageProducts }),
            );
        };
        fetchProducts();
    }, [filterQuery, pageProducts]);

    const handleEdit = async (productId: string) => {
        dispatch(fetchCurrentProductThunk(productId));
        openModal('edit');
    };

    const handleDelete = (id: string) => {
        dispatch(fetchDeleteProductThunk(id));
    };

    const renderCell = React.useCallback(
        (product: Product, columnKey: React.Key) => {
            const cellValue = product[columnKey as keyof Product];
            switch (columnKey) {
                case 'product_info':
                    return <p>{product.name}</p>;
                case 'category':
                    return <p>{product.category}</p>;
                case 'stock':
                    return <p>{product.stock}</p>;
                case 'suppliers':
                    return <p>{product.suppliers}</p>;
                case 'price':
                    return <p>{product.price}</p>;
                case 'action':
                    return (
                        <div className="flex gap-2">
                            <button
                                className="btn border-border-green flex h-8  w-8 rounded-full border   !bg-transparent hover:!bg-green-50 "
                                onClick={() => handleEdit(product._id)}
                                disabled={isLoading}
                            >
                                <svg
                                    width={14}
                                    height={14}
                                    className="stroke-light-green "
                                    style={{ fill: 'none' }}
                                >
                                    <use href={icon + '#icon-edit'}></use>
                                </svg>
                            </button>
                            <button
                                className="btn border-border-red flex h-8  w-8 rounded-full border !bg-transparent  hover:!bg-red-50   "
                                onClick={() => handleDelete(product._id)}
                                disabled={isLoading}
                            >
                                <svg
                                    width={14}
                                    height={14}
                                    className="stroke-main-red "
                                    style={{ fill: 'none' }}
                                >
                                    <use href={icon + '#icon-trash'}></use>
                                </svg>
                            </button>
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
                <TitleTablet text="All products" />
                {productsData ? (
                    <>
                        {' '}
                        <Table
                            removeWrapper
                            classNames={{
                                th: 'border-b border-r bg-natural-white p-[14px] text-xs/[14px] font-medium text-light-grey first:pl-0 last:border-r-0 md:p-5 md:px-5 md:text-sm/[18px]',
                                td: 'border-r p-[14px] py-[20px] text-left text-xs/[14px] font-medium text-main-black first:pl-0 last:border-r-0 last:pr-0 md:p-5 md:text-base/[18px]',
                            }}
                            aria-label="All products"
                            className="rounded-b-lg border-x border-b border-border-grey bg-natural-white px-[14px] md:px-5 xl:pb-[15px]"
                        >
                            <TableHeader columns={columns}>
                                {column => (
                                    <TableColumn key={column.uid}>
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody items={productsData?.data}>
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
                            pageActive={pageProducts}
                            pages={allProductsPages}
                            setPage={setPageProducts}
                        />
                    </>
                ) : (
                    <div className="h-[437px] rounded-b-lg border-x border-b border-border-grey bg-white px-[14px] md:px-5 xl:pb-[20px]">
                        {dataProductsSlice.map((_, index) => (
                            <SkeletonTable key={index} columns={columns} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
