import * as yup from 'yup';
import { emailValidator } from '../../constants/regexp';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailValidator, '*Please enter a valid email address')
    .required('*required field'),

  password: yup
    .string()
    .required('*required field')
    .min(1, '*Password must contain at least 6 characters')
    .max(6, 'maximum 12 characters possible'),
  // .matches(
  //     passwordValidator,
  //     '*Minimum 1 uppercase letter, 1 lowercase letter and 1 number',
  // ),
});
