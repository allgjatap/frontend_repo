import { IGetOneResponse } from '@/types/Generic';
import { UseMutationHookOptions } from '@/types/useMutationTypes';
import { useMutation } from '@tanstack/react-query';
import { updateProfile } from './function';
import { UpdateProfileParams } from './type';
import { toast } from 'sonner';
import queryClient from '../QueryClient';

export const useUpdateProfile = (
  options?: UseMutationHookOptions<IGetOneResponse<{ message: string }>, Error, UpdateProfileParams>
) => {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['authMe'] });
      toast('Your profile has been updated!');
    },
    ...options,
  });
};
