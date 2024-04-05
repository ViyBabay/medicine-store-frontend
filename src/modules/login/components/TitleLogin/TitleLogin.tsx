import Pill from '@/shared/icon/white round pill.svg';

export const TitleLogin = () => {
    return (
        <div className="relative mb-10 md:mb-[50px] md:w-[614px]">
            <h1 className="title text-[28px] leading-[34px] md:text-[54px] md:leading-[60px]">
                Your medication, delivered Say goodbye to all{' '}
                <span className="text-light-green">your healthcare</span>{' '}
                worries with us
            </h1>
            <img
                src={Pill}
                alt="white round pill"
                width={95}
                height={93}
                className="absolute -top-[56px] right-[20px] md:-top-[104px] md:right-[19px] md:h-[175px] md:w-[179px]"
            />
        </div>
    );
};
