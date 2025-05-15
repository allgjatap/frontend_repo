import { IGetOneResponse } from '@/types/Generic';
import {
  AccessTokenResponse,
  AuthData,
  CompanyAuthData,
  GoogleAuthenticationResponse,
  LoginParams,
  Me,
  RegisterMemberParams,
} from './type';
import { ApiService } from '../ApiService';

export const authMe = async (): Promise<Me> => {
  const res: IGetOneResponse<Me> = await ApiService.get('/user/current');
  return res.data;
};

export const googleAuthentication = (accessToken: string): Promise<IGetOneResponse<GoogleAuthenticationResponse>> => {
  return ApiService.post('auth/google', {
    accessToken,
  });
};

export const verifyEmail = (token: string): Promise<IGetOneResponse<AccessTokenResponse>> => {
  return ApiService.post('auth/verify-email/' + token);
};

export const login = (body: LoginParams): Promise<IGetOneResponse<AccessTokenResponse>> => {
  return ApiService.post('auth/login', body);
};

export const registerUser = (body: AuthData): Promise<IGetOneResponse<any>> => {
  return ApiService.post('auth/register', body);
};

export const registerCompany = (body: CompanyAuthData): Promise<IGetOneResponse<any>> => {
  return ApiService.post('auth/register/company', body);
};

export const registerMember = (body: RegisterMemberParams): Promise<IGetOneResponse<AccessTokenResponse>> => {
  return ApiService.post('auth/register/company/member', body);
};
