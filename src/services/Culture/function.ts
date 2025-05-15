import { IGetAllResponse, IGetOneResponse } from '@/types/Generic';
import { ApiService } from '../ApiService';
import { CultureSection, UpdateCultureParams } from './type';

export const getCulture = (): Promise<IGetAllResponse<CultureSection>> => {
  return ApiService.get('culture');
};

export const updateCulture = (body: UpdateCultureParams): Promise<IGetOneResponse<{ message: string }>> => {
  return ApiService.post('culture', { culture: body });
};
