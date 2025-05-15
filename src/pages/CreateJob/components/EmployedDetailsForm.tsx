import { FormInput, FormSelect } from '@/components/Form';
import { useCompanyRole } from '@/services/Company';
import { CompanyRole } from '@/services/Company/type';
import { EmploymentType, JobEducation, JobExperience } from '@/services/Job/type';
import { Card, CardBody, CardHeader, Divider, SelectItem } from '@nextui-org/react';

export const EmployedDetailsForm = () => {
  const { data } = useCompanyRole();
  const { data: companyUser } = data || {};

  const sharedProps: any = {
    variant: companyUser?.role === CompanyRole.HUMAN_RESOURCES ? 'bordered' : 'default',
    size: 'sm',
    disabled: companyUser?.role !== CompanyRole.HUMAN_RESOURCES,
    isDisabled: companyUser?.role !== CompanyRole.HUMAN_RESOURCES,
  };

  return (
    <Card className='border' shadow='none'>
      <CardHeader>
        <h4 className='text-base font-bold'>Employment Details</h4>
      </CardHeader>
      <Divider />
      <CardBody className='grid grid-cols-2 gap-6 p-6'>
        <FormSelect name='employmentType' label='Employment type' {...sharedProps}>
          <SelectItem key={EmploymentType.PART_TIME}>Part-time</SelectItem>
          <SelectItem key={EmploymentType.FULL_TIME}>Full-time</SelectItem>
          <SelectItem key={EmploymentType.CONTRACT}>Contract</SelectItem>
          <SelectItem key={EmploymentType.FREELANCE}>Freelance</SelectItem>
        </FormSelect>
        <FormSelect name='experience' label='Experience' {...sharedProps}>
          <SelectItem key={JobExperience.JUNIOR}>Junior</SelectItem>
          <SelectItem key={JobExperience.MIDDLE}>Middle</SelectItem>
          <SelectItem key={JobExperience.MID_SENIOR}>Mid-Senior</SelectItem>
          <SelectItem key={JobExperience.SENIOR}>Senior</SelectItem>
        </FormSelect>
        <FormSelect name='education' label='Education' {...sharedProps}>
          <SelectItem key={JobEducation.BACHELOR}>Bachelor's Degree</SelectItem>
          <SelectItem key={JobEducation.MASTER}>Master's Degree</SelectItem>
          <SelectItem key={JobEducation.PROFESSIONAL}>Professional Course</SelectItem>
        </FormSelect>
        <FormInput name='language' label='Language' {...sharedProps} />
      </CardBody>
      <Divider />
      <CardBody className='gap-4 px-6 pb-6 pt-4'>
        <h4 className='text-base font-bold'>Annual salary</h4>
        <div className='flex w-full flex-row items-center gap-6'>
          <FormInput
            type='number'
            name='from'
            label='From'
            registerOptions={{ setValueAs: (v) => Number(v) }}
            {...sharedProps}
          />
          <FormInput
            type='number'
            name='to'
            label='To'
            registerOptions={{ setValueAs: (v) => Number(v) }}
            {...sharedProps}
          />
          <FormInput name='currency' label='Currency' {...sharedProps} />
        </div>
      </CardBody>
    </Card>
  );
};
