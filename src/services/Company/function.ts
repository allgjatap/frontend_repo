import { IGetAllResponse, IGetOneResponse } from '@/types/Generic';
import { ApiService } from '../ApiService';
import { Company, CompanyMember, CreateMemberParams } from './type';

export const getCurrentCompany = (): Promise<IGetOneResponse<Company>> => {
  return ApiService.get('company/current');
};

export const getCompanyRole = (): Promise<IGetOneResponse<CompanyMember>> => {
  return ApiService.get('company/role');
};

export const getCompanyMembers = (): Promise<IGetAllResponse<CompanyMember>> => {
  return ApiService.get('company/member');
};

export const updateCompany = (body: Partial<Company>): Promise<IGetOneResponse<any>> => {
  return ApiService.patch('company', body);
};

export const createMember = (body: CreateMemberParams): Promise<IGetOneResponse<CompanyMember>> => {
  return ApiService.post('company/member', body);
};
