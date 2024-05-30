import { LoginForm } from '../../modules/login/components/LoginForm/LoginForm';
import { TitleLogin } from '../../modules/login/components/TitleLogin/TitleLogin';
import { LoginLogo } from '../../modules/login/components/LoginLogo/LoginLogo';

const LoginPage = () => {
    return (
        <div className="h-[812px] w-full bg-semi-white bg-[url('/src/shared/icon/background_mobile.svg')] bg-right-bottom bg-no-repeat px-5 pt-6 md:h-[1024px] md:bg-[url('/src/shared/icon/background_td.svg')] md:px-8 desk:h-[800px] desk:px-[100px] desk:pt-7">
            <LoginLogo />
            <div className="desk:flex desk:gap-[150px]">
                <TitleLogin />
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
