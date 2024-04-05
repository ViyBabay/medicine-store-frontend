// import { useState } from 'react';
import icon from '@/shared/icon/sprite.svg';

export const BurgerBtn = () => {
    // const [isOpen, setOpen] = useState(false);

    // const open = () => {
    //     setOpen(true);
    //     document.body.style.overflow = 'hidden';
    // };
    // const close = () => {
    //     setOpen(false);
    //     document.body.style.overflow = 'auto';
    // };

    return (
        <button className="md:mr-4 desk:hidden">
            <svg width={32} height={32} className="stroke-black">
                <use href={icon + '#icon-burger'}></use>
            </svg>
        </button>
    );
};
