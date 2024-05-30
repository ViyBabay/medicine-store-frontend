import { Field } from 'formik';
import { DatePicker } from '@nextui-org/react';
export const DataPickerField = () => {
  return (
    <Field name="date" key="date" className="!bg-natural-white">
      {({ field: { ...field } }) => (
        <DatePicker
          {...field}
          defaultValue={field.value}
          onChange={date => {
            field.onChange({
              target: { name: field.name, value: date },
            });
          }}
          label="Delivery date"
          radius="full"
          variant="bordered"
          classNames={{
            base: ' h-[44px] rounded-full border-1 border-border-grey w-full  md:w-[224px] ',
            selectorButton: '',
            selectorIcon: 'text-light-green ',
            popoverContent: '',
            calendar: 'bg-light-green ',
            calendarContent: '  ',
            timeInputLabel: '',
            timeInput: '',
          }}
          isRequired
        />
      )}
    </Field>
  );
};
