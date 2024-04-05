import icon from '@/shared/icon/sprite.svg';

export const LogoutBtn = () => {
    return (
        <button
            type="button"
            className="h-11 w-11 rounded-full bg-light-green p-[14px] "
        >
            <svg width={16} height={16} className="fill-white stroke-white">
                <use href={icon + '#icon-logout'}></use>
            </svg>
        </button>
    );
};
