import { FormInput } from '@/components/Form/FormInput';
import { useCompanyDetailsSchema } from '@/validations/useCompanyDetailsSchema';
import { Button } from '@nextui-org/react';
import { FormProvider, useForm } from 'react-hook-form';
import { SignUpCompanyProps } from '../SingUpCompany';

export const CompanyDetails = ({ defaultValues, onNext, isLoading }: SignUpCompanyProps) => {
  const resolver = useCompanyDetailsSchema();
  const methods = useForm({ defaultValues, resolver });

  return (
    <FormProvider {...methods}>
      <form className='flex flex-col gap-8' onSubmit={methods.handleSubmit(onNext)}>
        <h2 className='text-2xl font-normal'>Sign Up</h2>

        <div className='flex flex-col gap-4'>
          <FormInput name='companyName' label='Company Name' variant='bordered' size='sm' />
          <FormInput name='email' type='email' label='Email' variant='bordered' size='sm' />
          <FormInput name='phone' label='Phone Number' variant='bordered' size='sm' />
          <FormInput name='country' label='Country' variant='bordered' size='sm' />
          <FormInput name='city' label='City' variant='bordered' size='sm' />
          <FormInput
            name='zip'
            type='number'
            label='Zip'
            variant='bordered'
            size='sm'
            registerOptions={{ setValueAs: (v) => Number(v) }}
          />
        </div>
        <Button type='submit' className='w-full text-base font-medium' color='secondary' isLoading={isLoading}>
          Next
        </Button>
      </form>
    </FormProvider>
  );
};
