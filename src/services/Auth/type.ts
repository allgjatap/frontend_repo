import { User } from '@/services/User/type';

export enum RegistrationScope {
  STUDENT = 'STUDENT',
  CANDIDATE = 'CANDIDATE',
  COMPANY = 'COMPANY',
}

export enum AuthProvider {
  EMAIL = 'EMAIL',
  GOOGLE = 'GOOGLE',
  MICROSOFT = 'MICROSOFT',
}

export type Me = User & { hasCompletedOnboarding: boolean };

export type AccessTokenResponse = { accessToken: string };
export type GoogleAuthenticationResponse = AuthData | AccessTokenResponse;
export type RegisterResponse = AccessTokenResponse & { isVerified: boolean };

export type DefaultAuthData = {
  email: string;
  firstName: string;
  lastName: string;
  isCompany: boolean;
  provider: AuthProvider;
  scope: RegistrationScope | null;
};

export type CompanyAuthData = {
  companyName: string;
  role: string;
  country: string;
  city: string;
  zip: string;
};

export type AuthData =
  | ({ scope: RegistrationScope.COMPANY } & CompanyAuthData & DefaultAuthData)
  | ({ scope: RegistrationScope.STUDENT | RegistrationScope.CANDIDATE | null } & DefaultAuthData);

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterMemberParams = {
  code: string;
  username: string;
  password: string;
  confirmPassword: string;
};
