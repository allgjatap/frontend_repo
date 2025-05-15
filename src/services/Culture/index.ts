import { IGetAllResponse, IGetOneResponse } from '@/types/Generic';
import { UseQueryHookOptions } from '@/types/useQueryTypes';
import { CultureSection, UpdateCultureParams } from './type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCulture, updateCulture } from './function';
import { UseMutationHookOptions } from '@/types/useMutationTypes';
import { toast } from 'sonner';

export const useCulture = (options?: UseQueryHookOptions<IGetAllResponse<CultureSection>, Error>) => {
  return useQuery({
    queryKey: ['culture'],
    queryFn: getCulture,
    ...options,
  });
};

export const useUpdateCulture = (
  options?: UseMutationHookOptions<IGetOneResponse<{ message: string }>, Error, UpdateCultureParams>
) => {
  return useMutation({
    mutationFn: updateCulture,
    onSuccess: (data) => {
      toast(data.data.message);
    },
    ...options,
  });
};
