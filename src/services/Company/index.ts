import { IGetAllResponse, IGetOneResponse } from '@/types/Generic';
import { UseQueryHookOptions } from '@/types/useQueryTypes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createMember, getCompanyMembers, getCompanyRole, getCurrentCompany, updateCompany } from './function';
import { Company, CompanyMember, CreateMemberParams } from './type';
import { UseMutationHookOptions } from '@/types/useMutationTypes';
import queryClient from '../QueryClient';
import { useGetMe } from '../Auth';
import { UserRole } from '../User/type';

export const useCurrentCompany = (options?: UseQueryHookOptions<IGetOneResponse<Company>, Error>) => {
  return useQuery({
    queryKey: ['company', 'current'],
    queryFn: getCurrentCompany,
    staleTime: Infinity,
    ...options,
  });
};

export const useCompanyRole = (options?: UseQueryHookOptions<IGetOneResponse<CompanyMember>, Error>) => {
  const { data: me } = useGetMe();

  return useQuery({
    queryKey: ['company', 'role'],
    queryFn: getCompanyRole,
    staleTime: Infinity,
    enabled: me.role === UserRole.COMPANY,
    ...options,
  });
};

export const useCompanyMembers = (options?: UseQueryHookOptions<IGetAllResponse<CompanyMember>, Error>) => {
  return useQuery({
    queryKey: ['company', 'member'],
    queryFn: getCompanyMembers,
    ...options,
  });
};

export const useUpdateCompany = (options?: UseMutationHookOptions<IGetOneResponse<any>, Error, Partial<Company>>) => {
  return useMutation({
    mutationFn: updateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company', 'current'] });
    },
    ...options,
  });
};

export const useCreateMember = (
  options?: UseMutationHookOptions<IGetOneResponse<CompanyMember>, Error, CreateMemberParams>
) => {
  return useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company', 'member'] });
    },
    ...options,
  });
};
