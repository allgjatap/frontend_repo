import { IGetAllResponse } from '@/types/Generic';
import { UseQueryHookOptions } from '@/types/useQueryTypes';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Question, Step, SubmitOnboarding } from './type';
import { getOnboardingQuestions, getOnboardingSteps, submitOnboarding } from './function';
import { UseMutationHookOptions } from '@/types/useMutationTypes';
import queryClient from '../QueryClient';
import { useNavigate } from 'react-router-dom';

export const useOnboardingQuestions = (options?: UseQueryHookOptions<IGetAllResponse<Question>, Error>) => {
  return useSuspenseQuery({
    retry: 0,
    queryKey: ['onboarding', 'question'],
    queryFn: getOnboardingQuestions,
    staleTime: Infinity,
    ...options,
  });
};

export const useOnboardingSteps = (options?: UseQueryHookOptions<IGetAllResponse<Step>, Error>) => {
  return useSuspenseQuery({
    retry: 0,
    queryKey: ['onboarding', 'step'],
    queryFn: getOnboardingSteps,
    staleTime: Infinity,
    ...options,
  });
};

export const useSubmitOnboarding = (
  options?: UseMutationHookOptions<IGetAllResponse<any>, Error, SubmitOnboarding>
) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: submitOnboarding,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['authMe'] });
      queryClient.invalidateQueries({ queryKey: ['onboarding', 'question'] });
      navigate('/');
    },
    ...options,
  });
};
