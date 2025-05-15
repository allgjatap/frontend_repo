import { PASSWORD_REGEX } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { z } from 'zod';

export const useSignUpSchema = () => {
  const validations = useMemo(
    () =>
      z
        .object({
          firstName: z.string().min(1, { message: 'First Name should not be empty' }),
          lastName: z.string().min(1, { message: 'Last Name should not be empty' }),
          username: z.string().min(1, { message: 'Username should not be empty' }),
          email: z.string().min(1, { message: 'Email should not be empty' }).email(),
          password: z
            .string()
            .refine(
              (value) => PASSWORD_REGEX.test(value),
              'Minimum eight characters, at least one number and one special character'
            ),
          confirmPassword: z.string().min(8),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords don't match",
          path: ['confirmPassword'],
        }),
    []
  );

  return zodResolver(validations);
};
