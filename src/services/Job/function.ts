import { IGetAllResponse, IGetOneResponse } from '@/types/Generic';
import { ApiService } from '../ApiService';
import { ApplicateJobParams, CreateJobParams, Job, JobListParams, PublishJobParams, UpdateJobParams } from './type';

export const getJobFeed = (): Promise<IGetAllResponse<Job>> => {
  return ApiService.get('job');
};

export const getCompanyJobs = (params: JobListParams): Promise<IGetAllResponse<Job>> => {
  return ApiService.get('job', params);
};

export const getCompanyJob = (id: string): Promise<IGetOneResponse<Job>> => {
  return ApiService.get(`job/${id}`);
};

export const createJob = (body: CreateJobParams): Promise<IGetOneResponse<Job>> => {
  return ApiService.post('job', body);
};

export const publishJob = (body: PublishJobParams): Promise<IGetOneResponse<Job>> => {
  return ApiService.post(`job/publish/${body.id}`, body);
};

export const updateJob = (body: UpdateJobParams): Promise<IGetOneResponse<Job>> => {
  return ApiService.patch(`job/${body.id}`, body);
};

export const applicateJob = (body: ApplicateJobParams): Promise<IGetOneResponse<{ message: string }>> => {
  const formData = new FormData();
  formData.append('jobId', body.id!);

  if (!!body.file) {
    formData.append('file', body.file);
  }
  if (!!body.url) {
    formData.append('url', body.url);
  }

  return ApiService.post(
    `job/application`,
    formData,
    {},
    {
      'Content-Type': 'multipart/form-data',
    }
  );
};
