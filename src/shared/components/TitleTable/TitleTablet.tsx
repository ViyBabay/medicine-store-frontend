import { FC } from 'react';

interface TitleTabletProps {
    text: string;
    className?: string;
}

export const TitleTablet: FC<TitleTabletProps> = ({ text }) => {
    return (
        <h3
            className={`rounded-t-lg bg-mint-green p-[14px] text-base/5 font-semibold text-main-black md:p-5 md:text-lg/6 desk:w-full`}
        >
            {text}
        </h3>
    );
};
