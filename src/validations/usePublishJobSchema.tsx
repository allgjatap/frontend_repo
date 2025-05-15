import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { z } from 'zod';

export const usePublishJobSchema = () => {
  const validations = useMemo(() => {
    return z.object({
      technicalSkills: z.string().min(1, { message: 'Technical skills should not be empty' }),
      softSkills: z.string().min(1, { message: 'Soft skills should not be empty' }),
    });
  }, []);

  return zodResolver(validations);
};
