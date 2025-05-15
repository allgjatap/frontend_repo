import { useMemo } from 'react';
import { Button, Link, RadioGroup } from '@nextui-org/react';
import { CustomRadio } from './components/SelectCard';
import { useAuthData } from '@/services/Auth';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, AuthData, RegistrationScope } from '@/services/Auth/type';
import queryClient from '@/services/QueryClient';
import { Bank, Student, UserCircle } from '@phosphor-icons/react';

const scopeDetails = {
  [RegistrationScope.STUDENT]: {
    title: 'Student',
    icon: <Student weight='fill' size={24} />,
    description: 'The Object constructor creates an object wrapper for the given value.',
  },
  [RegistrationScope.CANDIDATE]: {
    title: 'Candidate',
    icon: <UserCircle weight='fill' size={24} />,
    description: 'The Object constructor creates an object wrapper for the given value.',
  },
  [RegistrationScope.COMPANY]: {
    title: 'Company',
    icon: <Bank weight='fill' size={24} />,
    description: 'The Object constructor creates an object wrapper for the given value.',
  },
};

export const SignUpCategory = () => {
  const navigate = useNavigate();
  const { data } = useAuthData();
  const registrationScope = data!.scope;

  const scopes = useMemo(() => {
    const res = [RegistrationScope.STUDENT, RegistrationScope.CANDIDATE];

    if (data?.provider === AuthProvider.EMAIL || data?.isCompany) {
      res.push(RegistrationScope.COMPANY);
    }

    return res;
  }, [data]);

  const onScopeChange = (scope: RegistrationScope) => {
    queryClient.setQueryData(['auth', 'google'], (v: AuthData) => ({ ...v, scope }));
  };

  const onNext = () => {
    if (data?.scope === RegistrationScope.COMPANY) {
      return navigate('/signup/company');
    }

    navigate('/signup');
  };

  return (
    <div className='h-sm:justify-end flex h-full w-full max-w-md flex-col items-center justify-center space-y-6 p-8'>
      <h2 className='text-2xl font-bold'>Choose account you need:</h2>
      <div className='space-y-4'>
        <RadioGroup value={registrationScope || undefined}>
          {scopes.map((scope) => {
            const { title, description, icon } = scopeDetails[scope];

            return (
              <CustomRadio value={scope} onChange={() => onScopeChange(scope)} description={description} icon={icon}>
                {title}
              </CustomRadio>
            );
          })}
        </RadioGroup>
      </div>
      <Button className='w-full' color='primary' disabled={!registrationScope} onClick={onNext}>
        Next
      </Button>

      <div className='mt-4 flex justify-center gap-1'>
        <p className='text-sm text-gray-600'>Already have an account?</p>
        <Link className='text-sm' href='/login'>
          Sign In here
        </Link>
      </div>
    </div>
  );
};
