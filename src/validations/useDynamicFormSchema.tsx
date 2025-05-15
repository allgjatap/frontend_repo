import { FormDynamicInputProps } from '@/components/Form/FormDynamicInput';
import { InputType } from '@/services/Onboarding/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { ZodTypeAny, z } from 'zod';

export type DynamicFormProps = FormDynamicInputProps & {
  parentInput?: string;
  parentValue?: any;
  disabled?: boolean;
};

const getInputValidation = (input: DynamicFormProps) => {
  switch (input.type) {
    case InputType.INPUT:
      return z.string().min(1);
    case InputType.EMAIL:
      return z.string().email();
    case InputType.NUMBER:
      return z.number().default(0);
    case InputType.SELECT:
      return z
        .string({ message: 'Select one of the options' })
        .refine((value) => input.options?.some((option) => option.value === value), 'Select one of the options');
    case InputType.BOOLEAN:
      return z.union([z.boolean(), z.enum(['true', 'false'])]).transform((val) => {
        if (typeof val === 'string') {
          return val === 'true';
        }
        return val;
      });
    default:
      return z.any();
  }
};

export const useDynamicFormSchema = (form: DynamicFormProps[]) => {
  const validations = useMemo(() => {
    const baseSchema = form.reduce(
      (acc, input) => {
        acc[input.name] = getInputValidation(input);
        return acc;
      },
      {} as Record<string, ZodTypeAny>
    );

    const schema = z
      .object(baseSchema)
      .partial()
      .superRefine((data) => {
        form.forEach((input) => {
          if (input.parentInput && input.parentValue !== undefined) {
            if (data[input.parentInput] !== input.parentValue) {
              delete data[input.name]; // Remove the field if the parent condition is not met
            }
          }
        });
      });

    return schema;
  }, [form]);

  return zodResolver(validations);
};
