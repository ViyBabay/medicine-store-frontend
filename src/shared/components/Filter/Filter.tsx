import { FC, FormEvent, useEffect } from 'react';
import icon from '@/shared/icon/sprite.svg';
import { useAppDispatch } from '@/redux/hook';
import { setFilterCustomers } from '@/redux/customers/customersSlice';
import { useLocation } from 'react-router-dom';
import { setFilterOrders } from '@/redux/orders/ordersSlice';
import { setFilterProducts } from '@/redux/products/productsSlice';
import { setFilterSuppliers } from '@/redux/suppliers/suppliersSlice';

interface FilterProps {
    placeholder: string;
}

export const Filter: FC<FilterProps> = ({ placeholder }) => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        return () => {
            dispatch(setFilterSuppliers(''));
            dispatch(setFilterOrders(''));
            dispatch(setFilterProducts(''));
            dispatch(setFilterCustomers(''));
        };
    }, []);

    const handleFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements?.namedItem('filter') as HTMLInputElement;

        switch (pathname) {
            case '/orders':
                dispatch(setFilterOrders(input.value));
                break;
            case '/products':
                dispatch(setFilterProducts(input.value));
                break;
            case '/suppliers':
                dispatch(setFilterSuppliers(input.value));
                break;
            case '/customers':
                dispatch(setFilterCustomers(input.value));
                break;
            default:
                break;
        }
    };

    return (
        <section>
            <form onSubmit={handleFilterSubmit} className="flex gap-2 md:gap-3">
                <input
                    name="filter"
                    className="input h-11 w-[215px] px-[18px] py-[13px] text-xs/[18px] font-normal md:w-[224px]"
                    type="text"
                    placeholder={placeholder}
                />
                <button
                    type="submit"
                    className="btn h-11 w-28 gap-2 px-[30px] py-[13px] md:w-[116px] "
                >
                    <svg width={14} height={14}>
                        <use
                            href={icon + '#icon-filter'}
                            className="bg-light-green stroke-white"
                            style={{ fill: 'none' }}
                        ></use>
                    </svg>
                    <span className="text-xs leading-[18px] text-white md:text-sm">
                        Filter
                    </span>
                </button>
            </form>
        </section>
    );
};
