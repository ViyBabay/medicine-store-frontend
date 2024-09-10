import icon from '@/shared/icon/sprite.svg';

export const Filter = () => {
    return (
        <div className="flex gap-2">
            <input
                className="shadow-input h-[44px] w-[215px] flex-shrink-0 rounded-full border border-solid border-gray-200 bg-white pl-[18px]"
                type="text"
                placeholder="Product Name"
            />
            <button className="px-30 py-13 inline-flex h-[44px] w-[112px] items-center justify-center gap-2 rounded-full bg-light-green">
                <svg width={14} height={14}>
                    <use
                        href={icon + '#icon-filter'}
                        className="bg-light-green stroke-white"
                    ></use>
                </svg>
                <span className="text-sm text-white">Filter</span>
            </button>
        </div>
    );
};
