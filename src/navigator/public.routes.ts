import { ConfirmAccount } from '@/pages/ConfirmAccount/ConfirmAccount';
import { Login } from '@/pages/Login/Login';
import { SignUpCategory } from '@/pages/SignUpCategory/SingUpCategory';
import { RouteObject } from 'react-router-dom';
import { SignUp } from '@/pages/SignUp';
import { VerifyEmail } from '@/pages/VerifyEmail/VerifyEmail';
import { SignUpCompany } from '@/pages/SignUpCompany/SingUpCompany';
import { RegisterMember } from '@/pages/RegisterMember';

export const publicRoutes: RouteObject[] = [
  {
    path: 'login',
    Component: Login,
  },
  {
    path: 'signup/category',
    Component: SignUpCategory,
  },
  {
    path: 'signup',
    Component: SignUp,
  },
  {
    path: 'signup/company',
    Component: SignUpCompany,
  },
  {
    path: 'confirm-account',
    Component: ConfirmAccount,
  },
  {
    path: 'verify-email/:token',
    Component: VerifyEmail,
  },
  {
    path: 'register-member/:token',
    Component: RegisterMember,
  },
];
