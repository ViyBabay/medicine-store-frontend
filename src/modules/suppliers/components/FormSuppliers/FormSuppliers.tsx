import { CalendarDate } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { selectCurrentSupplier } from '@/redux/suppliers/suppliersSelectors';
import { extractNumber } from '@/shared/utils/extractNumber';
import { DataPickerField } from '../DataPickerField/DataPickerField';
import { useFormattedDate } from '@/shared/hooks/useFormattedDate';
import { SkeletonFormProduct } from '@/shared/components/SkeletonForm/SkeletonForm';
import {
  fetchAddSuppliersThunk,
  fetchEditSupplierThunk,
} from '@/redux/suppliers/suppliersOperations';
import { InputForm } from '@/shared/components/InputForm/InputForm';
import { Field, Form, Formik } from 'formik';
import input from './inputeSuppliers.json';
import { InitialValueSuppliers } from '@/shared/utils/difinitions';
import { editSuppliersSchema } from '../../../../shared/utils/validation/editSuppliersSchema';
import { SelectField } from '../../../../shared/components/SelectField/SelectField';
import { FC } from 'react';

interface FormSuppliersProps {
  mode: string;
  onClose: () => void;
}

export const FormSuppliers: FC<FormSuppliersProps> = ({ mode, onClose }) => {
  const dispatch = useAppDispatch();

  const currentSupplier = useAppSelector(selectCurrentSupplier);

  const { dateForForm, formattedDate } = useFormattedDate(
    currentSupplier?.date as CalendarDate | undefined,
    mode
  );

  const initialValues = {
    name: currentSupplier?.name ?? '',
    address: currentSupplier?.address ?? '',
    suppliers: currentSupplier?.suppliers ?? '',
    date: dateForForm,
    amount: extractNumber(currentSupplier?.amount ?? ''),
    status: currentSupplier?.status ?? '',
  };

  const handleSubmit = (values: InitialValueSuppliers) => {
    const updatedValues = {
      ...values,
      date: formattedDate,
    };

    if (mode === 'edit' && currentSupplier) {
      dispatch(
        fetchEditSupplierThunk({
          id: currentSupplier._id,
          supplier: updatedValues,
        })
      );
    } else {
      dispatch(fetchAddSuppliersThunk(updatedValues));
    }
    onClose();
  };

  return (
    <>
      <h3 className="title mb-5 text-xl/[24px] md:mb-10 md:text-2xl/[28px] ">
        {mode === 'edit' ? 'Edit suppliers' : 'Add a new suppliers'}
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={editSuppliersSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form>
            {mode === 'edit' && !currentSupplier ? (
              <SkeletonFormProduct />
            ) : (
              <div className="flex w-full flex-col gap-[14px] md:flex-row md:flex-wrap md:gap-x-2 md:gap-y-[14px]">
                {input.map(({ type, name, placeholder }) =>
                  name !== 'date' ? (
                    <Field
                      key={name}
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      component={InputForm}
                    />
                  ) : (
                    <DataPickerField key={name} />
                  )
                )}
                <SelectField
                  name="status"
                  mode={mode}
                  currentOption={initialValues.status}
                />
                <div className="mt-10 flex w-full items-center justify-center gap-2 md:justify-start">
                  <button
                    type="submit"
                    className={`btn  w-[143px] p-[13px] text-sm leading-[18px] md:w-[133px] ${
                      !isValid || !dirty || isSubmitting
                        ? 'cursor-not-allowed opacity-50 hover:transform-none'
                        : ''
                    }`}
                    disabled={!isValid || !dirty || isSubmitting}
                  >
                    {mode === 'edit' ? 'Save' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn w-[143px] !bg-cancel-white  p-[13px] text-sm leading-[18px] !text-light-grey md:w-[133px]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
