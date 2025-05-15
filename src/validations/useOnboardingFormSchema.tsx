import { InputType, Question } from '@/services/Onboarding/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { z } from 'zod';

export const useOnboardingFormSchema = (questions: Question[]) => {
  const validations = useMemo(() => {
    const obj: { [key: string]: any } = {};

    for (const question of questions) {
      let res = null;

      switch (question.type) {
        case InputType.TEXTAREA:
        case InputType.INPUT:
          res = z.string().min(1);
          break;
        case InputType.NUMBER:
          res = z.number({ message: 'Please enter a value' });
          break;
        case InputType.BOOLEAN:
          res = z.boolean();
          break;
        case InputType.SELECT:
          res = z
            .string({ message: 'Select one of the options' })
            .refine((value) => question.values?.includes(value), 'Select one of the options');
          break;
        default:
          res = z.string().min(1);
          break;
      }

      const field = `question_${question.id}`;
      obj[field] = res;
    }

    return z.object(obj);
  }, [questions]);

  return zodResolver(validations);
};
