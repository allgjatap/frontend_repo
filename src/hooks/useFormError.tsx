import _ from 'lodash';
import { useFormContext, useFormState } from 'react-hook-form';

export const useFormError = (name: string) => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control, name });
  const errorMessage: any = !!_.get(errors, name)?.message
    ? _.get(errors, name)?.message
    : '';

  const isError = !!errorMessage;

  return { isError, errorMessage };
};
