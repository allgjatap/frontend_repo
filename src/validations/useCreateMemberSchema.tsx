import { CompanyRole } from '@/services/Company/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { z } from 'zod';

export const useCreateMemberSchema = () => {
  const validations = useMemo(() => {
    return z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email(),
      role: z.nativeEnum(CompanyRole, { message: 'Select one of the values.' }),
    });
  }, []);

  return zodResolver(validations);
};
