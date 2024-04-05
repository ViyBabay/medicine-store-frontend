import Logo from '@/shared/icon/loginLogo.svg';

export const LoginLogo = () => {
    return (
        <div className="mb-[148px] flex items-center gap-[14px] md:mb-[204px] desk:mb-[226px]">
            <img src={Logo} alt="logo" width={44} height={44} />
            <h2 className="title text-xl">E-Pharmacy</h2>
        </div>
    );
};
