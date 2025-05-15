import { IGetAllResponse } from '@/types/Generic';
import { ApiService } from '../ApiService';
import { Question, Step, SubmitOnboarding } from './type';

export const getOnboardingQuestions = (): Promise<IGetAllResponse<Question>> => {
  return ApiService.get('onboarding/questions');
};

export const getOnboardingSteps = (): Promise<IGetAllResponse<Step>> => {
  return ApiService.get('onboarding/steps');
};

export const submitOnboarding = (body: SubmitOnboarding): Promise<IGetAllResponse<any>> => {
  return ApiService.post('onboarding', { questions: body });
};
