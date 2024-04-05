import Logo from '@/shared/icon/logo.svg';

export const LogoHeader = () => {
    return (
        <img src={Logo} alt="logo" width={32} height={32} className="md:mr-8" />
    );
};
