import { Divider, Link } from '@nextui-org/react';
import { MicrosoftLoginButton } from '../Login/components/MicrosoftLoginButton';
import { GoogleLoginButton } from '../Login/components/GoogleLoginButton';
import { Authorization } from '@/components/Authorization';
import { AuthProvider, CompanyAuthData } from '@/services/Auth/type';
import { useAuthData, useRegisterCompany } from '@/services/Auth';
import { useState } from 'react';
import queryClient from '@/services/QueryClient';
import { CompanyRepresentative } from './components/CompanyRepresentative';
import { CompanyDetails } from './components/CompanyDetails';

export type SignUpCompanyProps = {
  defaultValues: any;
  isLoading?: boolean;
  onNext: (values: any) => void;
};

export const SignUpCompany = () => {
  const { mutate: registerCompany, isPending } = useRegisterCompany();
  const { data } = useAuthData();
  const [page, setPage] = useState(1);

  const onNext = (values: Partial<CompanyAuthData>) => {
    if (page <= 2) {
      queryClient.setQueryData(['auth', 'google'], (oldData: any) => ({ ...oldData, ...values }));
    }

    const newData = queryClient.getQueryData(['auth', 'google']);

    if (page < 2) {
      return setPage(page + 1);
    }

    registerCompany(newData as CompanyAuthData);
  };

  const components = [CompanyRepresentative, CompanyDetails];
  const FormComponent = components[page - 1];

  return (
    <div
      className='max-w[484px] h-sm:self-end ml-11 flex h-full w-full flex-col justify-center gap-8 self-center overflow-auto p-8'
      style={{ maxWidth: '484px' }}
    >
      <FormComponent defaultValues={data} onNext={onNext} isLoading={isPending} />

      <div className='flex flex-col gap-4'>
        <Authorization policyCheck={data?.provider === AuthProvider.EMAIL}>
          <div
            style={{ maxWidth: '125px', width: '100%' }}
            className='flex items-center justify-center gap-1 self-center'
          >
            <Divider />
            <p className='text text-nowrap text-center text-sm font-normal'>Or sign up using </p>
            <Divider />
          </div>

          <div className='mt-4 flex justify-center space-x-4'>
            <GoogleLoginButton />

            <MicrosoftLoginButton />
          </div>
        </Authorization>

        <div className='mt-4 flex justify-center gap-1'>
          <p className='text-sm text-gray-600'>Already have an account?</p>
          <Link className='text-sm' href='/login'>
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};
