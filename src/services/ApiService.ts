import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { getToken } from '@/utils/auth';
import { storage } from '@/utils/storage';

const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  headers: { 'Content-type': 'application/json' },
});
// @ts-ignore
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = getToken();
  if (accessToken) {
    // TODO: check this later as it is AXIOS problem till it gets fixed
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...config.headers,
      },
      params: {
        ...config.params,
      },
    };
  }
  return config;
});

export { axiosInstance };

export class ApiService {
  static async get<T>(
    path: string,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ): Promise<T> {
    try {
      const response = await axiosInstance.get(path, {
        responseType: 'json',
        params: params,
        headers: {
          ...headers,
          'Access-Control-Expose-Headers': ['Count'],
        },
      });
      return ApiService.handleResponse(response);
    } catch (error: any) {
      return ApiService.handleError(error);
    }
  }
  static async getFile<T>(
    path: string,
    params?: Record<string, string | number>,
    headers?: Record<string, string>,
  ): Promise<T> {
    try {
      const response = await axiosInstance.get(path, {
        responseType: 'blob',
        params: params,
        headers: {
          ...headers,
        },
      });
      return {
        data: [response.data],
      } as any;
    } catch (error: any) {
      return ApiService.handleError(error);
    }
  }

  static async post<T>(
    path: string,
    data?: any,
    params?: Record<string, string | number>,
    headers?: Record<string, string>,
  ): Promise<T> {
    try {
      const response = await axiosInstance.post(path, data, {
        params: params,
        headers: headers,
      });

      return ApiService.handleResponse(response);
    } catch (error: any) {
      return ApiService.handleError(error);
    }
  }

  static async patch<T>(
    path: string,
    data?: any,
    params?: Record<string, string | number>,
    headers?: Record<string, string>,
  ): Promise<T> {
    try {
      const response = await axiosInstance.patch(path, data, {
        params: params,
        headers: headers,
      });

      return ApiService.handleResponse(response);
    } catch (error: any) {
      return ApiService.handleError(error);
    }
  }

  static async delete(
    path: string,
    params?: Record<string, string | number>,
    headers?: Record<string, string>,
  ): Promise<Record<string, never>> {
    try {
      const response = await axiosInstance.delete(path, {
        params: params,
        headers: headers,
      });

      return ApiService.handleResponse(response);
    } catch (error: any) {
      return ApiService.handleError(error);
    }
  }

  static handleResponse(response: AxiosResponse): any {
    return response.data;
  }

  static handleError(error: AxiosError): any {
    const statusCode = error.response?.status;

    if (statusCode === 401) {
      storage.removeItem('accessToken');
    }

    throw error;
  }
}