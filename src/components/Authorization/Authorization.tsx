import { Me } from '@/services/Auth/type';
import queryClient from '@/services/QueryClient';
import { UserRole } from '@/services/User/type';
import { IGetOneResponse } from '@/types/Generic';
import { useCallback } from 'react';

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: UserRole[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const useAuthorization = () => {
  const checkAccess = useCallback(({ allowedRoles }: { allowedRoles: UserRole[] }) => {
    const { data: user } = queryClient.getQueryData(['authMe']) as IGetOneResponse<Me>;
    // const { user } = data || {};

    if (!user) {
      throw Error('User does not exist!');
    }

    if (allowedRoles && allowedRoles.length > 0) {
      return allowedRoles?.includes(user.role);
    }

    return true;
  }, []);

  return { checkAccess };
};

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
