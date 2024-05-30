import Logo from '@/shared/icon/logo.svg';
import { Link } from 'react-router-dom';

export const LogoHeader = () => {
    return (
        <Link to="/">
            <img src={Logo} alt="logo" width={40} height={40} />
        </Link>
    );
};
