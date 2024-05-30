import { FC } from 'react';
import { LuEyeOff, LuEye } from 'react-icons/lu';

interface VisibilityPasswordProps {
    toggleShowPassword: () => void;
    showPassword: boolean;
}

export const VisibilityPassword: FC<VisibilityPasswordProps> = ({
    toggleShowPassword,
    showPassword,
}) => {
    return (
        <div
            className="absolute bottom-[3%] right-[20px] -translate-y-1/2 transform cursor-pointer"
            onClick={toggleShowPassword}
        >
            {showPassword ? (
                <LuEye size={20} className="stroke-light-grey" />
            ) : (
                <LuEyeOff size={20} className="stroke-light-grey" />
            )}
        </div>
    );
};
