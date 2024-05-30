import { FC } from 'react';
import { NavMenu } from '../NavMenu/NavMenu';
import icon from '@/shared/icon/sprite.svg';

interface BurgerBtnProps {
    close: () => void;
    isOpen: boolean;
}

export const BurgerBtn: FC<BurgerBtnProps> = ({ isOpen, close }) => {
    return (
        <>
            <button type="button" onClick={close} className="desk:hidden">
                <svg width={32} height={32} className="stroke-black">
                    <use href={icon + '#icon-burger'}></use>
                </svg>
            </button>
            {isOpen && <NavMenu close={close} />}
        </>
    );
};
