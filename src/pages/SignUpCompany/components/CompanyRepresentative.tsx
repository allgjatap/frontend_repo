import { FormInput } from '@/components/Form/FormInput';
import { useCompanyRepresentativeSchema } from '@/validations/useCompanyRepresentativeSchema';
import { Button, SelectItem } from '@nextui-org/react';
import { FormProvider, useForm } from 'react-hook-form';
import { SignUpCompanyProps } from '../SingUpCompany';
import { CompanyRole } from '@/services/Company/type';
import { FormSelect } from '@/components/Form/FormSelect';
import { FormPassword } from '@/components/Form/FormPassword';

export const companyRoles = [
  {
    label: 'CEO',
    value: CompanyRole.CEO,
  },
  {
    label: 'Human Resources',
    value: CompanyRole.HUMAN_RESOURCES,
  },
  {
    label: 'Talent Acquisition',
    value: CompanyRole.TALENT_ACQUISITION,
  },
  {
    label: 'Technical Lead',
    value: CompanyRole.TECHNICAL_LEAD,
  },
];

export const CompanyRepresentative = ({ defaultValues, onNext, isLoading }: SignUpCompanyProps) => {
  const resolver = useCompanyRepresentativeSchema();
  const methods = useForm({ defaultValues, resolver });

  return (
    <FormProvider {...methods}>
      <form className='flex flex-col gap-8' onSubmit={methods.handleSubmit(onNext)}>
        <h2 className='text-2xl font-normal'>Company Representative Details:</h2>

        <div className='flex flex-col gap-4'>
          <FormInput name='firstName' label='First Name' variant='bordered' size='sm' />
          <FormInput name='lastName' label='Last Name' variant='bordered' size='sm' />
          <FormInput name='username' label='Username' variant='bordered' size='sm' />
          <FormSelect name='companyRole' label='Role' variant='bordered' size='sm' items={companyRoles}>
            {(item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            )}
          </FormSelect>
          <FormPassword name='password' label='Password' variant='bordered' size='sm' />
          <FormPassword name='confirmPassword' label='Confirm Password' variant='bordered' size='sm' />
        </div>

        <Button type='submit' className='w-full text-base font-medium' color='secondary' isLoading={isLoading}>
          Next
        </Button>
      </form>
    </FormProvider>
  );
};
