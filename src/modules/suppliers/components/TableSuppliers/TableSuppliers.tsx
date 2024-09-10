import React, { FC, useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  filterValuesuppliers,
  selectAllSuppliers,
} from '@/redux/suppliers/suppliersSelectors';
import { Supplier } from '@/shared/utils/difinitions';
import { TitleTablet } from '@/shared/components/TitleTable/TitleTablet';
import sprite from '@/shared/icon/sprite.svg';
import {
  fetchAllSuppliersThunk,
  fetchCurrentSupplierThunk,
} from '@/redux/suppliers/suppliersOperations';
import { CustomPagination } from '@/shared/components/Pagination/Pagination';
import { extractNumber } from '@/shared/utils/extractNumber';
import { SkeletonTable } from '@/shared/components/SkeletonTable/SkeletonTable';
import dataSuppliers from '@/shared/utils/data/suppliers.json';

const dataSuppliersSlice = dataSuppliers.slice(0, 6);

interface StatusColorMap {
  [key: string]: string;
}

const statusColorMap: StatusColorMap = {
  Deactive: 'bg-light-red text-main-red',
  Active: 'bg-l-green text-light-green',
};

const columns = [
  { name: 'Suppliers Info', uid: 'suppliersInfo' },
  { name: 'Address', uid: 'address' },
  { name: 'Company', uid: 'company' },
  { name: 'Delivery date', uid: 'deliveryDate' },
  { name: 'Ammount', uid: 'ammount' },
  { name: 'Status', uid: 'status' },
  { name: 'Action', uid: 'action' },
];

interface TableSuppliersProps {
  openModal: (type: string) => void;
}
export const TableSuppliers: FC<TableSuppliersProps> = ({ openModal }) => {
  const dispatch = useAppDispatch();
  const suppliers = useAppSelector(selectAllSuppliers);
  const data = suppliers?.data;

  const [pageSuppliers, setPageSuppliers] = useState<number>(1);

  const filterQuery = useAppSelector(filterValuesuppliers);

  const allSuppliersPages = suppliers?.pages;

  useEffect(() => {
    const fetchCustumers = () => {
      dispatch(fetchAllSuppliersThunk({ filterQuery, page: pageSuppliers }));
    };
    fetchCustumers();
  }, [filterQuery, pageSuppliers]);

  const handleEditClick = async (supplierId: string) => {
    dispatch(fetchCurrentSupplierThunk(supplierId));

    openModal('edit');
  };

  const renderCell = React.useCallback(
    (item: Supplier, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof Supplier];

      switch (columnKey) {
        case 'suppliersInfo':
          return <p>{item.name}</p>;
        case 'address':
          return <p>{item.address}</p>;
        case 'company':
          return <p>{item.suppliers}</p>;
        case 'deliveryDate':
          return <p>{item.date.toString()}</p>;
        case 'ammount':
          return <p>{extractNumber(item.amount)}</p>;
        case 'status':
          return (
            <p
              className={`${statusColorMap[item.status]} flex w-20 items-center justify-center rounded-[40px] p-1 text-xs -tracking-[0.6px] md:text-sm md:-tracking-[0.7px]`}
            >
              {item.status}
            </p>
          );
        case 'action':
          return (
            <button
              type="button"
              onClick={() => handleEditClick(item._id)}
              className="btnGreen flex gap-1 !rounded-[30px] px-[17px] py-2"
            >
              <svg
                width={14}
                height={14}
                className="fill-none stroke-light-green"
              >
                <use href={sprite + `#icon-edit`} />
              </svg>
              <p className="text-light-green">Edit</p>
            </button>
          );
        default:
          return <>{cellValue}</>;
      }
    },
    [handleEditClick]
  );

  return (
    <section className="my-5 scroll-px-[50px] overflow-x-auto border-x-scroll-white px-5 pb-10 scrollbar-thin scrollbar-track-[#F1F1F1] scrollbar-thumb-medium-grey md:px-8 desk:px-10">
      <div className="w-[700px] md:w-[1000px] xl:w-full">
        <TitleTablet text="All suppliers" />
        {data ? (
          <>
            <Table
              removeWrapper
              classNames={{
                th: 'border-b border-r bg-natural-white p-[14px] text-xs/[14px] font-medium text-light-grey first:pl-0 last:border-r-0 md:p-5 md:px-5 md:text-sm/[18px]',
                td: 'border-r p-[14px] py-[20px] text-left text-xs/[14px] font-medium text-main-black first:pl-0 last:border-r-0 last:pr-0 md:p-5 md:text-base/[18px]',
              }}
              aria-label="Recent Customers"
              className="rounded-b-lg border-x border-b border-border-grey bg-natural-white px-[14px] md:px-5 xl:pb-[15px]"
            >
              <TableHeader columns={columns}>
                {column => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={data}>
                {item => (
                  <TableRow
                    key={item._id}
                    className="border-b last:border-none"
                  >
                    {columnKey => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <CustomPagination
              pageActive={pageSuppliers}
              pages={allSuppliersPages}
              setPage={setPageSuppliers}
            />
          </>
        ) : (
          <div className="h-[455px] rounded-b-lg border-x border-b border-border-grey bg-white px-[14px] pt-3 md:px-5 xl:pb-[20px]">
            {dataSuppliersSlice.map((_, index) => (
              <SkeletonTable key={index} columns={columns} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
