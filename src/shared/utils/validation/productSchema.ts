import { validDecimalNumber, validStock } from '@/shared/constants/regexp';
import * as yup from 'yup';

export const productSchema = yup.object().shape({
    name: yup
        .string()
        .max(50, 'maximum 50 characters possible')
        .required('Product is required'),
    category: yup.string().required('Category is required'),
    stock: yup
        .string()
        .matches(validStock, '*Field should be a positive integer')
        .required('Stock is required'),
    suppliers: yup
        .string()
        .max(50, 'maximum 50 characters possible')
        .required('Suppliers is required'),
    price: yup
        .string()
        .matches(
            validDecimalNumber,
            '*Price field should be: positive number, max 2 decimals',
        )
        .required('Price is required'),
});
