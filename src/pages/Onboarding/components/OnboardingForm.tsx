import { FormRadioGroup } from '@/components/Form/FormRadioGroup';
import { Button, Radio } from '@nextui-org/react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { FormTextfield } from '@/components/Form/FormTextfield';
import { useOnboardingFormSchema } from '@/validations/useOnboardingFormSchema';
import { InputType, Question } from '@/services/Onboarding/type';
import { useEffect, useMemo, useState } from 'react';
import { FormInput } from '@/components/Form/FormInput';

type OnboardingFormProps = {
  questions: Question[];
  onChangeStep?: (value: string) => void;
  onSubmit: (values: FieldValues) => void;
};

const booleanValues = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

const getFormattedQuestions = (answers: FieldValues, questions: Question[]) => {
  return questions.filter((question) => {
    const { parentQuestionId, parentValue } = question;

    if (!!parentQuestionId) {
      const questionName = `question_${parentQuestionId}`;
      return parentValue === answers[questionName];
    }

    return true;
  });
};

export const OnboardingForm = ({ questions, onChangeStep, onSubmit }: OnboardingFormProps) => {
  const [page, setPage] = useState(0);
  const resolver = useOnboardingFormSchema(questions);
  const methods = useForm({ resolver });

  const formattedQuestions = useMemo(() => {
    const answers = methods.getValues();

    return getFormattedQuestions(answers, questions);
  }, [page]);

  useEffect(() => {
    onChangeStep?.(formattedQuestions[page].stepId);
  }, [page]);

  const currentQuestion = formattedQuestions[page];
  const field = `question_${currentQuestion?.id}`;
  const hasPreviousPage = page > 0;
  const questionsCount = formattedQuestions.length;

  const renderQuestion = (question: Question) => {
    const { type } = question;

    const sharedProps = { key: field, name: field };

    switch (type) {
      case InputType.BOOLEAN:
        return (
          <FormRadioGroup {...sharedProps}>
            {booleanValues.map((option) => (
              <Radio value={option.value as any}>{option.label}</Radio>
            ))}
          </FormRadioGroup>
        );
      case InputType.SELECT:
        return (
          <FormRadioGroup {...sharedProps}>
            {question.values?.map((option) => <Radio value={option}>{option}</Radio>)}
          </FormRadioGroup>
        );
      case InputType.NUMBER:
        return (
          <FormInput
            type='number'
            variant='bordered'
            placeholder='Enter number'
            registerOptions={{
              setValueAs: (v) => {
                return Number(v);
              },
            }}
            {...sharedProps}
          />
        );
      case InputType.INPUT:
        return <FormInput variant='bordered' placeholder='Your answer' {...sharedProps} />;
      case InputType.TEXTAREA:
        return <FormTextfield placeholder='Your answer' {...sharedProps} />;
      default:
        return null;
    }
  };

  const handleSubmit = (values: FieldValues) => {
    const newPage = page + 1;
    if (newPage < questionsCount - 1) {
      return setPage(newPage);
    }

    const pages = getFormattedQuestions(values, questions).length;

    if (newPage < pages) {
      return setPage(newPage);
    }

    onSubmit(values);
  };

  const handleError = (error: any) => {
    const isError = !!error[field];

    if (!isError) {
      methods.clearErrors();
      handleSubmit(methods.getValues());
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='flex flex-1 items-center justify-center'>
        <form className='flex max-w-[600px] flex-col gap-10' onSubmit={methods.handleSubmit(handleSubmit, handleError)}>
          <label className='text-3xl font-semibold'>{currentQuestion.title}</label>

          {renderQuestion(currentQuestion)}

          <div className='flex gap-5'>
            <Button variant='bordered' radius='sm' disabled={!hasPreviousPage} onClick={() => setPage(page - 1)}>
              Back
            </Button>
            {page < questionsCount - 1 ? (
              <Button type='submit' color='secondary' radius='sm' className='px-[94px] py-3'>
                Next
              </Button>
            ) : (
              <Button type='submit' color='secondary' radius='sm' className='px-[94px] py-3'>
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
