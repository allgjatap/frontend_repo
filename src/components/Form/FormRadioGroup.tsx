import { useFormError } from '@/hooks/useFormError';
import { RadioGroup, RadioGroupProps } from '@nextui-org/react';
import { useFormContext, useWatch } from 'react-hook-form';

export type FormRadioGroupProps = { name: string } & RadioGroupProps;

export const FormRadioGroup = ({ name, ...props }: FormRadioGroupProps) => {
  const { setValue } = useFormContext();
  const { isError, errorMessage } = useFormError(name);
  const value = useWatch({ name });

  return (
    <RadioGroup
      color='secondary'
      isInvalid={isError}
      errorMessage={errorMessage}
      value={value}
      onValueChange={(value) => {
        setValue(name, value);
      }}
      {...props}
    >
      {props.children}
    </RadioGroup>
  );
};
