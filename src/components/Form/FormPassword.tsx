import { useFormError } from '@/hooks/useFormError';
import { Input, InputProps } from '@nextui-org/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useState } from 'react';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';

export type FormPasswordProps = Omit<InputProps, 'type'> & { name: string; registerOptions?: RegisterOptions };

export const FormPassword = ({ name, registerOptions, ...props }: FormPasswordProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { register } = useFormContext();
  const { isError, errorMessage } = useFormError(name);
  const value = useWatch({ name });

  return (
    <Input
      {...register(name, registerOptions)}
      value={value}
      isInvalid={isError}
      errorMessage={errorMessage}
      endContent={
        <button className='focus:outline-none' type='button' onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? (
            <Eye className='pointer-events-none text-2xl text-default-400' />
          ) : (
            <EyeSlash className='pointer-events-none text-2xl text-default-400' />
          )}
        </button>
      }
      type={isVisible ? 'text' : 'password'}
      {...props}
    />
  );
};
