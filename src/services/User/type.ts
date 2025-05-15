export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: UserRole;
  profile: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum UserRole {
  STUDENT = 'STUDENT',
  CANDIDATE = 'CANDIDATE',
  COMPANY = 'COMPANY',
}

export type UpdateProfileParams = Partial<{
  firstName: string;
  lastName: string;
  username: string;
}>;
