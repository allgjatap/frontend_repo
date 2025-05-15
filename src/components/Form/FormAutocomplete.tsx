import { useFormError } from '@/hooks/useFormError';
import { Autocomplete, AutocompleteProps } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

export type FormAutocompleteProps<T extends object> = AutocompleteProps<T> & {
  name: string;
  setValueProps?: Partial<{
    shouldValidate: boolean;
    shouldDirty: boolean;
    shouldTouch: boolean;
  }>;
};

export const FormAutocomplete = <T extends object>({ name, setValueProps, ...props }: FormAutocompleteProps<T>) => {
  const { setValue } = useFormContext();
  const { isError, errorMessage } = useFormError(name);

  const onSelectionChange = (value: string | number) => {
    setValue(name, value, setValueProps);
  };

  return (
    <Autocomplete<T>
      className='w-full rounded-xl'
      inputProps={{
        classNames: {
          inputWrapper: ['bg-white', 'border', 'border-gray-200'],
        },
      }}
      variant='flat'
      allowsCustomValue
      onSelectionChange={onSelectionChange}
      isInvalid={isError}
      errorMessage={errorMessage}
      {...props}
    />
  );
};
