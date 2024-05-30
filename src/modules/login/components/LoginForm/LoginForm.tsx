import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { loginSchema } from '../../../../shared/utils/validation/loginSchema';

import input from '../input.json';
import { VisibilityPassword } from '../VisibilityPassword/VisibilityPassword';
import { useAppDispatch } from '@/redux/hook';
import { loginThunk } from '@/redux/auth/authOperations';
import { User } from '@/shared/utils/difinitions';
import { InputForm } from '@/shared/components/InputForm/InputForm';

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const initialValues = { email: '', password: '' };

    const dispatch = useAppDispatch();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (value: User) => {
        const { email, password } = value;
        dispatch(
            loginThunk({ email: email.trim(), password: password.trim() }),
        );
    };
    return (
        <div className="desk:pt-3">
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {({ isValid, dirty, isSubmitting }) => (
                    <Form className="flex flex-col gap-10 md:w-[323px]">
                        <div className="relative flex flex-col gap-[14px]">
                            {input.map(({ type, name, placeholder }) => {
                                return (
                                    <Field
                                        key={name}
                                        type={showPassword ? 'text' : type}
                                        name={name}
                                        placeholder={placeholder}
                                        component={InputForm}
                                    />
                                );
                            })}
                            <VisibilityPassword
                                toggleShowPassword={toggleShowPassword}
                                showPassword={showPassword}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`${
                                !isValid || !dirty || isSubmitting
                                    ? 'cursor-not-allowed opacity-50 hover:transform-none'
                                    : ''
                            } btn py-[13px] text-sm leading-[18px]`}
                            disabled={!isValid || !dirty || isSubmitting}
                        >
                            Log in
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
