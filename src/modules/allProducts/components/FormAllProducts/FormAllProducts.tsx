import { FC } from 'react';
import { Formik, Field, Form } from 'formik';
import { productSchema } from '@/shared/utils/validation/productSchema';
import { InputForm } from '@/shared/components/InputForm/InputForm';
import inputs from '../modalInput.json';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
    fetchAddProductsThunk,
    fetchEditProductThunk,
} from '@/redux/products/productsOperations';
import { InitialValueProduct } from '@/shared/utils/difinitions';

import { selectCurrentProduct } from '@/redux/products/productsSelectors';
import { SelectField } from '@/shared/components/SelectField/SelectField';
import { SkeletonFormProduct } from '../../../../shared/components/SkeletonForm/SkeletonForm';

interface ModalAllProductsProps {
    mode: string;
    onClose: () => void;
}

export const FormAllProducts: FC<ModalAllProductsProps> = ({
    mode,
    onClose,
}) => {
    const dispatch = useAppDispatch();
    const currentProduct = useAppSelector(selectCurrentProduct);

    const initialValues: InitialValueProduct = {
        name: currentProduct?.name ?? '',
        category: currentProduct?.category ?? '',
        stock: currentProduct?.stock ?? '',
        suppliers: currentProduct?.suppliers ?? '',
        price: currentProduct?.price ?? '',
    };

    const handleSubmit = (value: InitialValueProduct) => {
        if (mode === 'edit' && currentProduct) {
            dispatch(
                fetchEditProductThunk({
                    id: currentProduct._id,
                    product: value,
                }),
            );
        } else {
            dispatch(fetchAddProductsThunk(value));
        }
        onClose();
    };

    return (
        <>
            <h2 className="mb-5 text-xl font-semibold md:mb-10 md:text-2xl">
                {mode === 'edit' ? 'Edit Product' : 'Add Product'}
            </h2>
            <Formik
                initialValues={initialValues}
                validationSchema={productSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isValid, dirty, isSubmitting }) => (
                    <Form>
                        {mode === 'edit' && !currentProduct ? (
                            <SkeletonFormProduct />
                        ) : (
                            <div className="flex flex-col flex-wrap gap-[14px] md:flex-row md:gap-x-2">
                                {inputs.map(input =>
                                    input.name === 'category' ? (
                                        <SelectField
                                            key={input.name}
                                            name="category"
                                            mode={mode}
                                            currentOption={
                                                initialValues.category
                                            }
                                        />
                                    ) : (
                                        <Field
                                            key={input.name}
                                            component={InputForm}
                                            type="text"
                                            name={input.name}
                                            placeholder={input.placeholder}
                                        />
                                    ),
                                )}
                            </div>
                        )}
                        <div className="mt-10 flex gap-2">
                            <button
                                type="submit"
                                className={`btn w-[143px] p-[13px] text-sm leading-[18px] md:w-[133px] ${
                                    !isValid || !dirty || isSubmitting
                                        ? 'cursor-not-allowed opacity-50 hover:transform-none'
                                        : ''
                                }`}
                                disabled={!isValid || !dirty || isSubmitting}
                            >
                                {mode === 'edit' ? 'Update' : 'Add'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn w-[143px] !bg-cancel-white p-[13px] text-sm leading-[18px] !text-light-grey md:w-[133px]"
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};
