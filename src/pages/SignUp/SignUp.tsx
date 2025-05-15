import { Button, Divider, Link } from '@nextui-org/react';
import { FormInput, FormInputProps } from '@/components/Form/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { GoogleLoginButton } from '../Login/components/GoogleLoginButton';
import { MicrosoftLoginButton } from '../Login/components/MicrosoftLoginButton';
import { useAuthData, useRegister } from '@/services/Auth';
import { Authorization } from '@/components/Authorization';
import { AuthProvider, AuthData } from '@/services/Auth/type';
import { useSignUpSchema } from '@/validations/useSignUpSchema';
import queryClient from '@/services/QueryClient';

export const SignUp = () => {
  const resolver = useSignUpSchema();
  const { data }: any = useAuthData();
  const { mutate: registerUser, isPending } = useRegister();

  const methods = useForm({ defaultValues: data, resolver });

  const onFormSubmit = (values: AuthData) => {
    registerUser({ ...data, ...values });
    queryClient.setQueryData(['auth', 'google'], { ...data, ...values });
  };

  const inputProps: Partial<FormInputProps> = {
    variant: 'bordered',
    size: 'sm',
  };

  return (
    <FormProvider {...methods}>
      <form
        className='se h-sm:self-end ml-11 flex h-full w-full flex-col justify-center gap-8 self-center overflow-auto p-8'
        style={{ maxWidth: '484px' }}
        onSubmit={methods.handleSubmit(onFormSubmit)}
      >
        <p className='text-2xl font-normal'>Sign Up</p>
        <div className='flex flex-col gap-8'>
          <div className='max-w[484px] flex w-full flex-col gap-4 self-center'>
            <FormInput name='firstName' type='text' label='Full Name' {...inputProps} />
            <FormInput name='lastName' type='text' label='Last Name' {...inputProps} />
            <FormInput name='username' type='text' label='Username' {...inputProps} />
            <FormInput name='email' type='email' label='Email' {...inputProps} />
            <FormInput name='password' type='password' label='Password' {...inputProps} />
            <FormInput name='confirmPassword' type='password' label='Confirm Password' {...inputProps} />
          </div>
          <Button
            type='submit'
            className='h-10 w-full px-4 text-base font-medium'
            style={{ backgroundColor: '#4500A8', color: 'white', maxWidth: '420px' }}
            isLoading={isPending}
          >
            Next
          </Button>

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
      </form>
    </FormProvider>
  );
};
