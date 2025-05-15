import { Envelope } from '@phosphor-icons/react';
import { OnboardingHeader } from './components/OnboardingHeader';
import { Divider } from '@nextui-org/react';
import { useOnboardingQuestions, useOnboardingSteps, useSubmitOnboarding } from '@/services/Onboarding';
import { useState } from 'react';
import { OnboardingForm } from './components/OnboardingForm';
import { FieldValues } from 'react-hook-form';
import { SubmitOnboarding } from '@/services/Onboarding/type';
import { useGetMe } from '@/services/Auth';
import { Navigate } from 'react-router-dom';

export const Onboarding = () => {
  const { data: user } = useGetMe();
  const { data: stepsRes } = useOnboardingSteps();
  const { data: questionsRes } = useOnboardingQuestions();
  const { mutate: submitOnboarding } = useSubmitOnboarding();
  const { data: steps = [] } = stepsRes || {};
  const { data: questions = [] } = questionsRes || {};

  const [currentStep, setCurrentStep] = useState(steps[0].id);

  const handleFormSubmit = (values: FieldValues) => {
    const body: SubmitOnboarding = Object.entries(values).map(([key, value]) => {
      return {
        questionId: key.split('question_')[1],
        answer: value,
      };
    });

    submitOnboarding(body);
  };

  if (!!user.hasCompletedOnboarding) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex h-screen w-screen flex-col'>
      <OnboardingHeader currentStep={currentStep} steps={steps} />
      <Divider />

      <OnboardingForm questions={questions} onChangeStep={setCurrentStep} onSubmit={handleFormSubmit} />

      <div className='absolute bottom-10 right-10 flex gap-3'>
        <div className='flex h-full max-h-6 w-full max-w-6 items-center justify-center rounded-[50%] bg-purple-300 p-1'>
          <Envelope size={'14px'} color='#6b21a8' />
        </div>
        <p className='text-sm font-medium'>Need help? Contact Email------</p>
      </div>
    </div>
  );
};
