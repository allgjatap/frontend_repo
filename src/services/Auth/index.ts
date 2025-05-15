import { UseQueryHookOptions } from '@/types/useQueryTypes';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  authMe,
  googleAuthentication,
  login,
  registerCompany,
  registerMember,
  registerUser,
  verifyEmail,
} from './function';
import {
  AccessTokenResponse,
  AuthProvider,
  AuthData,
  GoogleAuthenticationResponse,
  Me,
  RegisterResponse,
  CompanyAuthData,
  LoginParams,
  RegisterMemberParams,
} from './type';
import { UseMutationHookOptions } from '@/types/useMutationTypes';
import { IGetOneResponse } from '@/types/Generic';
import queryClient from '../QueryClient';
import { redirect, useNavigate } from 'react-router-dom';
import { StorageKey, storage } from '@/utils/storage';

export const initialAuthData = {
  provider: AuthProvider.EMAIL,
  scope: null,
  email: '',
  firstName: '',
  lastName: '',
  isCompany: false,
};

export const useGetMe = (options?: UseQueryHookOptions<Me, Error>) => {
  return useSuspenseQuery({
    retry: 0,
    queryKey: ['authMe'],
    queryFn: authMe,
    staleTime: Infinity,
    ...options,
  });
};

export const useAuthData = (options?: UseQueryHookOptions<AuthData, Error>) => {
  return useQuery({
    initialData: initialAuthData,
    queryKey: ['auth', 'google'],
    staleTime: Infinity,
    ...options,
  });
};

export const useGoogleAuthentication = (
  options?: UseMutationHookOptions<IGetOneResponse<GoogleAuthenticationResponse>, Error, string>
) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: googleAuthentication,
    onSuccess: (res) => {
      const { data } = res as any;

      if (!!data.accessToken) {
        return storage.setItem(StorageKey.ACCESS_TOKEN, data.accessToken);
      }

      queryClient.setQueryData(['auth', 'google'], data);
      navigate('/signup/category');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
    ...options,
  });
};

export const useVerifyEmail = (
  options?: UseMutationHookOptions<IGetOneResponse<AccessTokenResponse>, Error, string>
) => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: ({ data: { accessToken } }) => {
      storage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    },
    ...options,
  });
};

export const useLogin = (
  options?: UseMutationHookOptions<IGetOneResponse<AccessTokenResponse>, Error, LoginParams>
) => {
  return useMutation({
    mutationFn: login,
    onSuccess: ({ data: { accessToken } }) => {
      storage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    },
    ...options,
  });
};

export const useRegister = (options?: UseMutationHookOptions<IGetOneResponse<RegisterResponse>, Error, AuthData>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: ({ data: { isVerified, accessToken } }) => {
      if (!isVerified) {
        return navigate('/confirm-account');
      }

      storage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    },
    ...options,
  });
};

export const useRegisterCompany = (
  options?: UseMutationHookOptions<IGetOneResponse<RegisterResponse>, Error, CompanyAuthData>
) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerCompany,
    onSuccess: ({ data: { isVerified, accessToken } }) => {
      if (!isVerified) {
        return navigate('/confirm-account');
      }

      storage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    },
    ...options,
  });
};

export const useRegisterMember = (
  options?: UseMutationHookOptions<IGetOneResponse<AccessTokenResponse>, Error, RegisterMemberParams>
) => {
  return useMutation({
    mutationFn: registerMember,
    onSuccess: ({ data: { accessToken } }) => {
      storage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
    },
    ...options,
  });
};

export const meLoader = async () => {
  const query = ['authMe'];
  let data = null;

  try {
    const queryData = queryClient.getQueryData(query);
    let result: any = queryData;

    if (!queryData) {
      result = await queryClient.fetchQuery({
        queryKey: query,
        queryFn: authMe,
      });
      return data;
    }

    data = result;
    return data;
  } catch {
    redirect('/login');
  }

  return data;
};
