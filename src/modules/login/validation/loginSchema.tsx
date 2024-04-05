import * as yup from 'yup';
import {
    emailValidator,
    passwordValidator,
} from '../../../shared/constants/regexp';

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .matches(emailValidator, '*Please enter a valid email address')
        .required('*required field'),

    password: yup
        .string()
        .required('*required field')
        .min(6, '*Password must contain at least 6 characters')
        .max(12, 'maximum 12 characters possible')
        .matches(
            passwordValidator,
            '*Minimum 1 uppercase letter, 1 lowercase letter and 1 number',
        ),
});
