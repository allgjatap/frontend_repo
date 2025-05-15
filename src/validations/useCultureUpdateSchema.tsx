import { CultureCardView } from '@/pages/Culture/components/CultureCard';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { z } from 'zod';

export const useCultureUpdateSchema = () => {
  const validations: any = useMemo(() => {
    const schema: any = z.object({
      id: z.string().uuid(),
      questions: z.array(z.object({ id: z.string().uuid(), answer: z.number().min(0).max(10).default(0) })).length(3),
      questionSuggestion: z.string().optional(),
      callRequest: z.boolean().optional(),
    });

    schema.refine(
      ({ questions, questionSuggestion, callRequest }: any) => {
        const answered = questions.filter((question: any) => question.answer > 0).length;

        switch (answered) {
          case 0:
          case 1:
            return !!questionSuggestion || !!callRequest;
          case 2:
            return !!questionSuggestion;
          case 3:
            return true;
        }
      },
      ({ questions }: any) => {
        const answered = questions.filter((question: any) => question.answer > 0).length;
        let message = null;

        switch (answered) {
          case 0:
          case 1:
            message = [CultureCardView.PRACTICES, CultureCardView.REQUEST];
            break;
          case 2:
            message = [CultureCardView.PRACTICES];
            break;
        }

        return { message };
      }
    );

    return z.array(schema);
  }, []);

  return zodResolver(validations);
};
