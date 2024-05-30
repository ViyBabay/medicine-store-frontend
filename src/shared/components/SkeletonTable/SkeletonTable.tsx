import React, { FC } from 'react';
import { Skeleton } from '@nextui-org/react';

interface Column {
    name: string;
    uid: string;
}
interface SkeletonTableProps {
    columns: Column[];
    image?: string;
    photo?: string;
}

export const SkeletonTable: FC<SkeletonTableProps> = ({
    columns,
    image,
    photo,
}) => {
    return (
        <div className="flex h-[70px] gap-5 pt-2">
            {columns.map(({ name }, colIndex) => (
                <div key={name} className="flex w-full items-center gap-3">
                    {(colIndex === 0 && image) || (colIndex === 0 && photo) ? (
                        <>
                            <div>
                                <Skeleton className="flex h-6 w-6 rounded-full md:h-11 md:w-11" />
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <Skeleton className="h-2 w-3/5 rounded-lg md:h-3" />
                                <Skeleton className="h-2 w-4/5 rounded-lg md:h-3" />
                            </div>
                        </>
                    ) : (
                        <div className="flex w-full flex-col gap-2">
                            <Skeleton className="h-2 w-3/5 rounded-lg md:h-3" />
                            <Skeleton className="h-2 w-4/5 rounded-lg md:h-3" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export const SkeletonIncomeExpenses = () => {
    const columns = Array.from({ length: 3 });

    return (
        <div className="flex h-[64px] gap-5">
            {columns.map((_, index) => (
                <div
                    key={index}
                    className=" flex w-full flex-col justify-center gap-2"
                >
                    <Skeleton className=" rounded-lg">
                        <div className="h-2 rounded-lg bg-default-200 md:h-3"></div>
                    </Skeleton>
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-2 w-3/5 rounded-lg bg-default-300 md:h-3"></div>
                    </Skeleton>
                </div>
            ))}
        </div>
    );
};
