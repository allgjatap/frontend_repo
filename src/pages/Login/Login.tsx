import { Button, Checkbox, Divider, Link } from '@nextui-org/react';
import { MicrosoftLoginButton } from './components/MicrosoftLoginButton';
import { FormProvider, useForm } from 'react-hook-form';
import { useLoginClientSchema } from '@/validations/useLoginClientSchema';
import { FormInput } from '@/components/Form/FormInput';
import { GoogleLoginButton } from './components/GoogleLoginButton';
import { initialAuthData, useLogin } from '@/services/Auth';
import queryClient from '@/services/QueryClient';
import { AuthProvider, AuthData } from '@/services/Auth/type';
import { FormPassword } from '@/components/Form/FormPassword';

export type LoginParams = {
  email: string;
  password: string;
};
export const Login = () => {
  const loginSchema = useLoginClientSchema();
  const { mutate: login } = useLogin();
  const methods = useForm<LoginParams>({ resolver: loginSchema });
  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    login(data);
  };

  const onSignUp = () => {
    const authData = queryClient.getQueryData(['google', 'auth']) as AuthData;

    if (authData.provider !== AuthProvider.EMAIL) {
      queryClient.setQueryData(['google', 'auth'], initialAuthData);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='se h-sm:mb-7 h-sm:self-end flex w-full max-w-[484px] flex-col gap-8 self-center p-8'>
        <p className='text-2xl font-normal'>Sing In</p>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex w-full flex-col gap-4 self-center'>
            <FormInput name='email' type='email' label='Email' variant='bordered' className='max-h-12' />

            <FormPassword label='Password' variant='bordered' name='password' className='max-h-12' />
            <div className='flex justify-between'>
              <Checkbox defaultSelected size='sm'>
                Remember me
              </Checkbox>
              <Link href='' color='foreground' size='sm'>
                Forgot Password
              </Link>
            </div>
          </div>
          <Button className='w-full text-base font-medium' color='secondary' type='submit'>
            Log In
          </Button>

          <div className='flex flex-col gap-4'>
            <div
              style={{ maxWidth: '125px', width: '100%' }}
              className='flex items-center justify-center gap-1 self-center'
            >
              <Divider />
              <p className='text text-nowrap text-center text-sm font-normal'>Or login using </p>
              <Divider />
            </div>

            <div className='mt-4 flex justify-center space-x-4'>
              <GoogleLoginButton />

              <MicrosoftLoginButton />
            </div>
            <div className='mt-4 flex justify-center gap-1'>
              <p className='text-sm text-gray-600'>Need an account?</p>
              <Link className='text-sm' href='/signup/category' onClick={onSignUp}>
                Sign up here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
