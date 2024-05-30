import icon from '@/shared/icon/sprite.svg';
import { LogoutBtn } from '../LogoutBtn/LogoutBtn';
import { NavLinkHeader } from '../NavLinkHeader/NavLinkHeader';

interface NavMenuProps {
    close: () => void;
}

export const NavMenu: React.FC<NavMenuProps> = ({ close }) => {
    const handleBackdropClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        if (event.target === event.currentTarget) {
            close();
        }
    };
    return (
        <>
            <div className="absolute left-0 top-0 z-20 min-h-screen w-[78px] border-r border-solid border-border-grey bg-semi-white p-5 desk:hidden">
                <div className="absolute left-8 top-5 desk:hidden">
                    <svg
                        width={32}
                        height={32}
                        className="fill-main-black stroke-main-black"
                        onClick={close}
                    >
                        <use href={icon + '#icon-close'}></use>
                    </svg>
                </div>
                <NavLinkHeader />
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 desk:hidden">
                    <LogoutBtn close={close} />
                </div>
            </div>
            <div
                className="fixed left-0 top-0 z-10 h-screen w-screen overflow-auto bg-modal-grey desk:hidden"
                onClick={handleBackdropClick}
            ></div>
        </>
    );
};
