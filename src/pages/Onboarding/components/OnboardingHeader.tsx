import { Chip, cn } from '@nextui-org/react';
import { Step } from '@/services/Onboarding/type';
import { useMemo } from 'react';

interface OnboardingHeaderProps {
  steps: Step[];
  currentStep: string;
}

export const OnboardingHeader = ({ currentStep, steps }: OnboardingHeaderProps) => {
  const currentIndex = useMemo(() => steps.findIndex((step) => step.id === currentStep), [currentStep]);

  return (
    <div className='flex w-full px-20 py-16'>
      {steps.map((step, index) => {
        const checked = index <= currentIndex;

        return (
          <div key={step.id} className='flex w-full items-center'>
            <Chip className='aspect-square max-h-12 min-h-12' color={checked ? 'secondary' : 'default'}>
              <p className='text-center text-xl font-bold text-white'>{index + 1}</p>
            </Chip>
            <span className={cn('ml-2', checked ? 'text-purple-600' : 'text-gray-600')}>{step.name}</span>
            {index < steps.length - 1 && (
              <div className={cn('mx-2 h-px flex-grow', index < currentIndex ? 'bg-purple-600' : 'bg-gray-300')}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
