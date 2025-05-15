// TData type of the response Data
// TVariables type of vars passed in function

import { MutationFunction, UseMutationOptions } from '@tanstack/react-query';

export type UseMutationHookOptions<
  TData,
  TError = unknown,
  TVariables = void
> = Omit<UseMutationOptions<TData, TError, TVariables, unknown>, 'mutationFn'>;

export type MutationFunctionHook<
  TData,
  TVariables = unknown
> = MutationFunction<TData, TVariables>;

export type UseMutationHook<TData> = TData;

// Put
export interface UpdateOneEntityFilteredProps<T> {
  id: number | string;
  body: Partial<T>;
  key: string;
}
export interface UpdateOneEntityProps<T> {
  id: number | string;
  body: Partial<T>;
}
// TODO: Change this later after all get updated
export interface UpdateOneEntityPropsSingleHook<T> {
  filters?: string;
  body: Partial<T>;
}

export interface DeleteOneEntityFilteredProps {
  id: number | string;
  key: string;
}
