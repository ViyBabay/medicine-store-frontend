import { Field } from 'formik';
import { Select, SelectItem } from '@nextui-org/react';
import optionsSelectSuppliers from '../../../modules/suppliers/components/FormSuppliers/SelectOption.json';
import optionsSelectProducts from '@/modules/allProducts/components/optionsSelectProducts.json';
import { FC } from 'react';

interface SelectOptionProps {
  name: string;
  mode: string;
  currentOption: string;
}
export const SelectField: FC<SelectOptionProps> = ({
  name,
  mode,
  currentOption,
}) => {
  return (
    <Field name={name}>
      {({ field: { ...field } }) => (
        <Select
          {...field}
          aria-label={name}
          items={
            name === 'status' ? optionsSelectSuppliers : optionsSelectProducts
          }
          placeholder={name}
          showScrollIndicators
          isRequired
          defaultSelectedKeys={mode === 'edit' ? [currentOption] : []}
          className="w-full rounded-full border-1 border-border-grey md:w-[224px] "
          radius="full"
          scrollShadowProps={{ isEnabled: true }}
          classNames={{
            base: 'h-[44px] flex items-center justify-center ',
            value: ' text-xs/[18px] font-normal text-light-grey',
            label: 'group-data-[filled=true]:-translate-y-5',
            trigger:
              ' w-full h-[44px] !bg-transparent !text-xs/[18px] font-normal ',
            listboxWrapper:
              'max-h-[140px] scrollbar-thin scrollbar-thumb-scroll-white scrollbar-track-light-green',
          }}
          listboxProps={{
            itemClasses: {
              base: [
                'rounded-md',
                'text-option-white',
                'transition-opacity',
                'data-[hover=true]:!text-natural-white',
                'data-[hover=true]:!bg-transparent',
                'dark:data-[hover=true]:!bg-transparent',
                'data-[selectable=true]:focus:!bg-transparent',
                'data-[selectable=true]:focus:!text-natural-white',
                'data-[pressed=true]:opacity-70',
                'data-[focus-visible=true]:ring-default-500',
              ],
            },
          }}
          popoverProps={{
            classNames: {
              base: 'before:bg-light-green',
              content:
                'p-0 border-small overflow-hidden rounded-[15px] border-divider bg-light-green',
            },
          }}
          renderValue={items =>
            items.map(item => (
              <div
                key={item.data ? item.data.value : 'fallback-key'}
                className="flex items-center"
              >
                <p className="flex flex-col text-light-black">
                  <span className="!text-xs/[18px] font-normal">
                    {item.data ? item.data.value : 'Fallback Label'}
                  </span>
                </p>
              </div>
            ))
          }
        >
          {item => (
            <SelectItem key={item.value} textValue={item.value}>
              <p className="flex items-center gap-2">{item.value}</p>
            </SelectItem>
          )}
        </Select>
      )}
    </Field>
  );
};
