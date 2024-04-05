import { BurgerBtn } from '../BurgerMenu/BurgerMenu';
import { LogoutBtn } from '../LogoutBtn/LogoutBtn';
import { HeaderTitle } from '../HeaderTitle/HeaderTitle';
import { LogoHeader } from '../LogoHeader/Logo';
import { SubTitle } from '../SubTitle/SubTitle';

export const Header = () => {
    return (
        <header className="flex h-20 content-center gap-5 border-b border-solid border-border-grey px-5 py-[17px] shadow-md md:gap-0 desk:gap-[60px] desk:pr-10">
            <BurgerBtn />
            <LogoHeader />
            <div>
                <HeaderTitle />
                <SubTitle />
            </div>
            <div className="hidden desk:ml-auto desk:block">
                <LogoutBtn />
            </div>
        </header>
    );
};
