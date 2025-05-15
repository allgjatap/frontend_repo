import { PASSWORD_REGEX } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { z } from 'zod';

export const useRegisterMemberSchema = () => {
  const validations = useMemo(() => {
    return z
      .object({
        code: z.string(),
        username: z.string().min(1, { message: 'Username should not be empty.' }),
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
      });
  }, []);

  return zodResolver(validations);
};
