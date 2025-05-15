import { FieldValues, UseFormSetError } from 'react-hook-form';

export interface Resource {
  exists: boolean;
  name: string;
  id: string;
}
export type SubmitErrorMessage = {
  attemptedValue: string;
  customState: any;
  errorCode: string;
  errorMessage: string;
  formattedMessagePlaceholderValues: any;
  propertyName: string;
};

export interface FormSubmitErrors {
  message: SubmitErrorMessage[];
  statusCode: string;
}

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IGetAllResponseWithoutStatus<T> {
  data: T[];
  meta: Meta;
}

export type IGetAllResponse<T> = {
  status: string;
  data: T[];
  meta: Meta;
};

export type IGetOneResponse<T> = {
  data: T;
  status: string;
};

export type ICreateOneResponse<T> = T;

export type IResponse<T> = {
  data: T;
  status: string;
  meta: Meta;
};

export type IUpdateOneResource<T> = {
  data: T;
  status: string;
};

export type IDeleteOneResource = Record<string, never>;

export type Optional<T> = T | null | undefined;

export type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export function notNull<T>(inp: Optional<T>): T {
  return inp as T;
}

export interface FormSubmitProps {
  values: FieldValues;
  setError: UseFormSetError<any>;
}

export type ID = string | number;

export interface HandleAxiosResponse<T> {
  data: T;
  count?: number;
  [key: string]: any;
}

export interface LocationQueryType {
  state: { queryString?: string };
  pathname: string;
}
