import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { z } from 'zod';

export const useCompanyDetailsSchema = () => {
  const validations = useMemo(
    () =>
      z.object({
        companyName: z.string().min(1, { message: 'First Name should not be empty' }),
        email: z.string().min(1, { message: 'Email should not be empty' }).email(),
        phone: z.string().min(1, { message: 'Phone number should not be empty' }),
        country: z.string().min(1, { message: 'Country should not be empty' }),
        city: z.string().min(1, { message: 'City should not be empty' }),
        zip: z.number().min(1, { message: 'Zip should not be empty' }),
      }),
    []
  );

  return zodResolver(validations);
};
