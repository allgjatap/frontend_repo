import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGetMe } from '@/services/Auth';
import { UserRole } from '@/services/User/type';
import { isAuthenticated } from '@/utils/auth';
import { StorageKey } from '@/utils/storage';
import { Navigate, Outlet } from 'react-router-dom';

export const RoutePointer = (paths: { role: UserRole; Component: () => JSX.Element }[]) => {
  const { data } = useGetMe();

  const found = paths.find((path) => path.role === data!.role);

  if (!!found) {
    const { Component } = found;
    return <Component />;
  }

  return <Navigate to='/' />;
};

export const PrivateRoute = (): JSX.Element => {
  useLocalStorage([StorageKey.ACCESS_TOKEN]);

  if (!isAuthenticated()) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export const PublicRoute = (): JSX.Element => {
  useLocalStorage([StorageKey.ACCESS_TOKEN]);

  if (!isAuthenticated()) {
    return <Outlet />;
  }
  return <Navigate to={'/jobs'} />;
};
