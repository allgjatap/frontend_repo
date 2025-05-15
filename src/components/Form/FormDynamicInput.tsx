import { InputType } from '@/services/Onboarding/type';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { SelectItem } from '@nextui-org/react';
import { FormTextfield } from './FormTextfield';

export type FormDynamicInputProps = {
  label: string;
  name: string;
  type: InputType;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  options?: { label: string; value: any }[];
};

export const FormDynamicInput = ({ type, ...props }: FormDynamicInputProps) => {
  const sharedProps: any = { ...props, errorMessage: '' };

  switch (type) {
    case InputType.INPUT:
    case InputType.EMAIL:
      return <FormInput {...sharedProps} />;
    case InputType.NUMBER:
      return (
        <FormInput
          {...sharedProps}
          type='number'
          registerOptions={{
            setValueAs: (v) => {
              return Number(v);
            },
          }}
        />
      );
    case InputType.SELECT:
      return (
        <FormSelect {...sharedProps} items={props?.options}>
          {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
        </FormSelect>
      );
    case InputType.BOOLEAN:
      return (
        <FormSelect {...sharedProps}>
          <SelectItem key='true'>Yes</SelectItem>
          <SelectItem key='false'>No</SelectItem>
        </FormSelect>
      );
    case InputType.TEXTAREA:
      return <FormTextfield {...sharedProps} />;
    default:
      return <></>;
  }
};
