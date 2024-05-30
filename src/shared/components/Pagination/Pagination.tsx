import { Pagination } from '@nextui-org/react';
import { FC } from 'react';

interface PaginationItemsProps {
    pageActive: number;
    pages: number | undefined;
    setPage: (page: number) => void;
}

export const CustomPagination: FC<PaginationItemsProps> = ({
    pageActive,
    pages,
    setPage,
}) => {
    return (
        <Pagination
            total={pages ?? 1}
            page={pageActive}
            onChange={setPage}
            classNames={{
                base: 'flex justify-center mt-5 ',
                wrapper: ' h-4 ',
                item: ' rounded-full !h-[14px] !min-w-[14px] !w-[14px]  shrink-0 text-xs font-medium text-transparent bg-mint-green  [&_svg]:stroke-black',
                forwardIcon: '',
                ellipsis: ' ',
                chevronNext: '',
                cursor: '',
            }}
        />
    );
};
