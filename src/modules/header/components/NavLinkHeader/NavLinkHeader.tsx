import { NavLink } from 'react-router-dom';
import icon from '@/shared/icon/sprite.svg';

export const NavLinkHeader = () => {
    const navLinks = [
        { path: '/', iconId: 'icon-dashboard' },
        { path: '/orders', iconId: 'icon-shopping-cart' },
        { path: '/products', iconId: 'icon-flask' },
        { path: '/suppliers', iconId: 'icon-mdi_local-pharmacy' },
        { path: '/customers', iconId: 'icon-mdi_users' },
    ];

    return (
        <div className="mt-[92px] flex flex-col gap-[14px] desk:mt-0">
            {navLinks.map(link => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className="group flex size-[38px] cursor-pointer items-center justify-center rounded-full !bg-white hover:border hover:border-light-green/40 md:size-11 "
                >
                    <svg
                        width={16}
                        height={16}
                        className="fill-icon-grey stroke-icon-grey group-hover:fill-light-green/65 group-hover:stroke-light-green/65"
                    >
                        <use href={`${icon}#${link.iconId}`}></use>
                    </svg>
                </NavLink>
            ))}
        </div>
    );
};
