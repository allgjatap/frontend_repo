import { Switch, SwitchProps } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';

export type FormSwitchProps = SwitchProps & { name: string; label: string };

export const FormSwitch = ({ name, label, ...props }: FormSwitchProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Switch onChange={onChange} isSelected={value} {...props}>
          {label}
        </Switch>
      )}
    />
  );
};
