import { IGetOneResponse } from '@/types/Generic';
import { ApiService } from '../ApiService';
import { UpdateProfileParams } from './type';

export const updateProfile = (body: UpdateProfileParams): Promise<IGetOneResponse<{ message: string }>> => {
  return ApiService.patch('user/current', body);
};
