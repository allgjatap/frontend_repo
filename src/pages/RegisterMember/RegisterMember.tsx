import { FormInput } from '@/components/Form';
import { FormPassword } from '@/components/Form/FormPassword';
import { useRegisterMember } from '@/services/Auth';
import { useRegisterMemberSchema } from '@/validations/useRegisterMemberSchema';
import { Button } from '@nextui-org/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const RegisterMember = () => {
  const { token } = useParams();
  const resolver = useRegisterMemberSchema();
  const methods = useForm({ resolver, defaultValues: { code: token } });

  const { mutate: registerMember, isPending } = useRegisterMember();

  return (
    <FormProvider {...methods}>
      <form className='flex flex-col gap-8' onSubmit={methods.handleSubmit((values: any) => registerMember(values))}>
        <h2 className='text-2xl font-normal'>Company Representative Details:</h2>

        <FormInput name='username' label='Username' variant='bordered' size='sm' />
        <FormPassword name='password' label='Password' variant='bordered' size='sm' />
        <FormPassword name='confirmPassword' label='Confirm Password' variant='bordered' size='sm' />

        <Button type='submit' className='w-full text-base font-medium' color='secondary' isLoading={isPending}>
          Next
        </Button>
      </form>
    </FormProvider>
  );
};
