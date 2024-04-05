import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { loginSchema } from '../../validation/loginSchema';
import { InputForm } from '../InputForm/InputForm';
import input from '../input.json';
import { VisibilityPassword } from '../VisibilityPassword/VisibilityPassword';

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const initialValues = { email: '', password: '' };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = () => {};
    return (
        <div className="desk:pt-3">
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors }) => (
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
                                Object.keys(errors).length > 0 ||
                                Object.values(values).some(
                                    value => value === '',
                                )
                                    ? 'cursor-not-allowed opacity-50 hover:transform-none'
                                    : ''
                            } btn py-[13px] text-sm leading-[18px]`}
                            disabled={
                                Object.keys(errors).length > 0 ||
                                Object.values(values).some(
                                    value => value === '',
                                )
                            }
                        >
                            Log in
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
