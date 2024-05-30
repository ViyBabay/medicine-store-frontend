import statistics from '../Statistics/statistics.json';
import sprite from '@/shared/icon/sprite.svg';

import { Card, Skeleton } from '@nextui-org/react';

import { useAppSelector } from '@/redux/hook';

import { getTotalCustomers } from '@/redux/customers/customersSelectors';
import { getTotalProducts } from '@/redux/products/productsSelectors';
import { getTotalSuppliers } from '@/redux/suppliers/suppliersSelectors';

export const Statistics = () => {
    const customers = useAppSelector(getTotalCustomers);
    const products = useAppSelector(getTotalProducts);
    const suppliers = useAppSelector(getTotalSuppliers);

    return (
        <>
            {products && suppliers && customers ? (
                <section className="mb-5 mt-5 flex flex-wrap gap-5 md:mb-10">
                    {statistics.map(({ svg, title }) => (
                        <div
                            key={title}
                            className={`basis-[47%] rounded-lg border bg-white ${title === 'All products' ? 'border-light-green' : 'border-border-grey'} p-[14px] md:basis-[31.4%] md:px-[18px] xl:basis-[17.5%]`}
                        >
                            <div className="mb-8 flex items-start gap-2 md:mb-7">
                                <svg
                                    width={18}
                                    height={18}
                                    className="fill-none stroke-main-black md:h-5 md:w-5"
                                >
                                    <use href={sprite + `${svg}`} />
                                </svg>
                                <h3 className="text-xs leading-[14px] text-light-grey md:leading-[18px]">
                                    {title}
                                </h3>
                            </div>
                            {products && suppliers && customers ? (
                                <p className="text-base font-semibold leading-[20px] text-main-black md:text-[24px] md:leading-[32px]">
                                    {title === 'All products'
                                        ? products
                                        : title === 'All suppliers'
                                          ? suppliers
                                          : customers}
                                </p>
                            ) : (
                                <span className="text-base font-semibold leading-[20px] text-main-black md:text-[24px] md:leading-[32px]">
                                    ..........
                                </span>
                            )}
                        </div>
                    ))}
                </section>
            ) : (
                <section className="mb-5 mt-5 flex flex-wrap gap-5 md:mb-10">
                    {statistics.map(({ title }) => (
                        <Card
                            key={title}
                            className={`h-[98px] basis-[47%] gap-3 rounded-lg border p-[14px] md:h-[108px] md:basis-[31.4%] md:px-[18px] desk:basis-[17.5%]`}
                            radius="lg"
                        >
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-2.5 w-4/5 rounded-lg bg-default-200 md:h-3"></div>
                            </Skeleton>
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-2.5 w-3/5 rounded-lg bg-default-200 md:h-3"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="h-2.5 w-2/5 rounded-lg bg-default-300 md:h-3"></div>
                            </Skeleton>
                        </Card>
                    ))}
                </section>
            )}
        </>
    );
};
