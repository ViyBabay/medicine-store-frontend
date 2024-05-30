import { TitleTablet } from '@/shared/components/TitleTable/TitleTablet';
import dataTransactions from '@/shared/utils/data/Income-Expenses.json';
import { useAppSelector } from '@/redux/hook';
import { selectAlltransactions } from '@/redux/transactions/transactionsSelectors';
import { SkeletonIncomeExpenses } from '@/shared/components/SkeletonTable/SkeletonTable';

const dataTransactionsSlice = dataTransactions.slice(0, 7);

interface StatusColorMap {
    [key: string]: string;
}
const statusColorMap: StatusColorMap = {
    Expense: 'bg-light-red text-main-red',
    Income: 'bg-l-green text-light-green',
    Error: 'bg-border-grey text-main-black',
};

export const IncomeExpenses = () => {
    const transactions = useAppSelector(selectAlltransactions);
    const dataSlice = transactions?.data.slice(0, 6);

    return (
        <section className="xl:min-w-[630px]">
            <TitleTablet text="Income/Expenses" />
            <div className="rounded-b-lg border-x border-b border-border-grey bg-white px-[14px] md:px-5">
                {dataSlice ? (
                    <>
                        <h4 className="border-b p-[14px] text-sm/[18px] font-medium text-light-grey first:pl-0 md:p-5 md:px-5 md:text-sm/[18px]">
                            Today
                        </h4>
                        <ul>
                            {dataSlice.map(({ _id, name, type, amount }) => (
                                <li
                                    key={_id}
                                    className="flex items-center justify-between border-b py-[14px] text-sm/[18px] font-medium text-main-black last:border-none md:py-5 md:text-base/[18px]"
                                >
                                    <div className="flex items-start gap-7 md:items-center">
                                        <div
                                            className={`${statusColorMap[type]} flex w-20 items-center justify-center rounded-[40px] p-1 text-xs -tracking-[0.6px] md:text-sm md:-tracking-[0.7px]`}
                                        >
                                            {type}
                                        </div>
                                        <p className="text-wrap max-sm:w-[115px]">
                                            {name}
                                        </p>
                                    </div>

                                    {type === 'Error' ? (
                                        <p
                                            className={`${statusColorMap[type]} bg-inherit line-through`}
                                        >
                                            {amount}
                                        </p>
                                    ) : (
                                        <p
                                            className={`${statusColorMap[type]} !bg-inherit`}
                                        >
                                            {amount}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <div className="h-[470px] pt-3">
                        {dataTransactionsSlice.map((_, index) => (
                            <SkeletonIncomeExpenses key={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
