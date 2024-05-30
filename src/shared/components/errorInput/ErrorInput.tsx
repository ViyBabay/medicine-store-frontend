import { FC } from 'react';
import { ErrorMessage } from 'formik';

interface ErrorWrapperProps {
    name: string;
}

export const ErrorWrapper: FC<ErrorWrapperProps> = ({ name }) => {
    return (
        <div
            className="absolute text-[10px] text-red-600"
            style={{ top: '100%', left: '5%', padding: '1px 0' }}
        >
            <ErrorMessage name={name} />
        </div>
    );
};
