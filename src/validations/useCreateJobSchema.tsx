import { EmploymentType, JobDepartment, JobEducation, JobExperience, JobWorkplace } from '@/services/Job/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { z } from 'zod';

export const useCreateJobSchema = () => {
  const validation = useMemo(() => {
    return z.object({
      title: z.string().min(1, { message: 'Title should not be empty' }),
      department: z.nativeEnum(JobDepartment, { message: 'Select one of the values' }),
      workplace: z.nativeEnum(JobWorkplace, { message: 'Select one of the values' }),
      location: z.string().min(1, { message: 'Location should not be empty' }),
      employmentType: z.nativeEnum(EmploymentType, { message: 'Select one of the values' }),
      experience: z.nativeEnum(JobExperience, { message: 'Select one of the values' }),
      education: z.nativeEnum(JobEducation, { message: 'Education should not be empty' }),
      language: z.string().min(1, { message: 'Education should not be empty' }),
      from: z.number(),
      to: z.number(),
      currency: z.string().min(1, { message: 'Currency should not be empty' }),
      description: z.string().min(1, { message: 'Description should not be empty' }),
    });
  }, []);

  return zodResolver(validation);
};
