import { useFormError } from '@/hooks/useFormError';
import { DatePicker, DatePickerProps } from '@nextui-org/react';
import { format } from 'date-fns';
import { Controller, useFormContext } from 'react-hook-form';

export type FormDatePickerProps = DatePickerProps & { name: string; dateFormat?: string };

export const FormDatePicker = ({ name, dateFormat = 'yyyy-MM-dd', ...props }: FormDatePickerProps) => {
  const { control } = useFormContext();
  const { isError, errorMessage } = useFormError(name);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <DatePicker
            onChange={(date) => {
              if (!date) {
                return field.onChange(null);
              }
              const { year, month, day } = date;
              const dateParse = new Date(year, month - 1, day);
              const formattedDate = format(new Date(dateParse), dateFormat);

              field.onChange(formattedDate);
            }}
            isInvalid={isError}
            errorMessage={errorMessage}
            {...props}
          />
        );
      }}
    />
  );
};
