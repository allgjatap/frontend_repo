import { Chip, cn } from '@nextui-org/react';

interface OnboardingHeaderProps {
  steps: string[];
  currentStep: number;
}

export const JobStepsView = ({ currentStep, steps }: OnboardingHeaderProps) => {
  return (
    <div className='flex h-full max-h-[390px] w-full max-w-[260px] flex-col rounded-xl border bg-white p-4'>
      {steps.map((step, index) => {
        const checked = index <= currentStep;

        return (
          <div key={index} className={`flex w-full flex-col ${index === steps.length - 1 ? '' : 'h-full'}`}>
            <div className='flex items-center'>
              <Chip className='aspect-square max-h-12 min-h-12' color={checked ? 'secondary' : 'default'}>
                <p className='text-center text-xl font-bold text-white'>{index + 1}</p>
              </Chip>
              <span className={cn('ml-2', checked ? 'text-purple-600' : 'text-gray-600')}>{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'my-2 ml-6 h-full w-[2px] flex-grow',
                  index < currentStep ? 'bg-purple-600' : 'bg-gray-300'
                )}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
