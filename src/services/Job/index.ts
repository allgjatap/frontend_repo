import { IGetAllResponse, IGetOneResponse } from '@/types/Generic';
import { UseQueryHookOptions } from '@/types/useQueryTypes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { applicateJob, createJob, getCompanyJob, getCompanyJobs, getJobFeed, publishJob, updateJob } from './function';
import { ApplicateJobParams, CreateJobParams, Job, JobListParams, PublishJobParams, UpdateJobParams } from './type';
import { UseMutationHookOptions } from '@/types/useMutationTypes';
import { useNavigate } from 'react-router-dom';
import queryClient from '../QueryClient';
import { toast } from 'sonner';

export const useJobFeed = (options?: UseQueryHookOptions<IGetAllResponse<Job>, Error>) => {
  return useQuery({
    queryKey: ['job', 'feed'],
    queryFn: getJobFeed,
    ...options,
  });
};

export const useCompanyJobs = (query: JobListParams, options?: UseQueryHookOptions<IGetAllResponse<Job>, Error>) => {
  return useQuery({
    queryKey: ['company', 'jobs', query],
    queryFn: () => getCompanyJobs(query),
    ...options,
  });
};

export const useCompanyJob = (id: string, options?: UseQueryHookOptions<IGetOneResponse<Job>, Error>) => {
  return useQuery({
    queryKey: ['company', 'jobs', id],
    queryFn: () => getCompanyJob(id),
    ...options,
  });
};

export const useCreateJob = (options?: UseMutationHookOptions<IGetOneResponse<Job>, Error, CreateJobParams>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createJob,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['company', 'jobs'] });
      navigate('/jobs');
    },
    ...options,
  });
};

export const usePublishJob = (options?: UseMutationHookOptions<IGetOneResponse<Job>, Error, PublishJobParams>) => {
  return useMutation({
    mutationFn: publishJob,
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ['company', 'jobs', id] });
      queryClient.invalidateQueries({ queryKey: ['company', 'jobs'] });
    },
    ...options,
  });
};

export const useUpdateJob = (options?: UseMutationHookOptions<IGetOneResponse<Job>, Error, UpdateJobParams>) => {
  return useMutation({
    mutationFn: updateJob,
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ['company', 'jobs', id] });
      queryClient.invalidateQueries({ queryKey: ['company', 'jobs'] });
    },
    ...options,
  });
};

export const useApplicateJob = (
  options?: UseMutationHookOptions<IGetOneResponse<{ message: string }>, Error, ApplicateJobParams>
) => {
  return useMutation({
    mutationFn: applicateJob,
    onSuccess: () => {
      toast('Job application has been made!');
    },
    ...options,
  });
};
