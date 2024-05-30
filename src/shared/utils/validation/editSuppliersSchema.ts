import { validDecimalNumber } from '@/shared/constants/regexp';
import * as yup from 'yup';

export const editSuppliersSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    address: yup.string().required('Address is required'),
    suppliers: yup.string().required('Suppliers is required'),
    date: yup.string().required('Date is required'),
    amount: yup
        .string()
        .matches(
            validDecimalNumber,
            '*Amount field should be: positive number, max 2 decimals',
        )
        .required('Amount is required'),
    status: yup.string().required('Status is required'),
});
