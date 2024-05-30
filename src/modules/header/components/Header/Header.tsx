import { BurgerBtn } from '../BurgerMenu/BurgerMenu';
import { LogoutBtn } from '../LogoutBtn/LogoutBtn';
import { HeaderTitle } from '../HeaderTitle/HeaderTitle';
import { LogoHeader } from '../LogoHeader/Logo';
import { SubTitle } from '../SubTitle/SubTitle';
import { useState } from 'react';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        const body = document.body;
        const newOverflow =
            body.style.overflow === 'hidden' ? 'auto' : 'hidden';

        body.style.overflow = newOverflow;
        setIsOpen(prevIsOpen => !prevIsOpen);
    };
    return (
        <header className="flex gap-6 border-b border-solid border-border-grey bg-semi-white px-5 py-4 shadow-md md:gap-8 md:px-8 desk:gap-[60px] desk:pl-5 desk:pr-10">
            <BurgerBtn isOpen={isOpen} close={toggleMenu} />
            <LogoHeader />
            <div>
                <HeaderTitle />
                <SubTitle />
            </div>
            <div className="hidden desk:ml-auto desk:block">
                <LogoutBtn close={toggleMenu} />
            </div>
        </header>
    );
};
