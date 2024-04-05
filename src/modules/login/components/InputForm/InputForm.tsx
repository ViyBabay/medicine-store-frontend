interface InputFormProps {
    field: {
        name: string;
        value: string;
    };
    form: {
        touched: { [key: string]: boolean };
        errors: { [key: string]: string };
    };
}

export const InputForm: React.FC<InputFormProps> = ({
    field,
    form,

    ...props
}) => {
    const hasTouched = form.touched[field.name];
    const errorMessage = hasTouched && form.errors[field.name];
    const errorBorderClass =
        errorMessage && hasTouched ? '!border-rose-500' : '';
    const successBorderClass =
        !errorMessage && hasTouched ? '!border-green-500' : '';

    return (
        <label className="relative">
            <input
                {...field}
                {...props}
                className={`input w-full px-[18px] py-[13px] ${errorBorderClass} ${successBorderClass}`}
                autoComplete="off"
            />

            {errorMessage && (
                <div className="absolute left-4 top-full mt-0 text-xs text-rose-500">
                    {errorMessage}
                </div>
            )}
        </label>
    );
};
