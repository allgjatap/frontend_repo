import { FormInput, FormRadioGroup, FormSelect } from '@/components/Form';
import { useCompanyRole } from '@/services/Company';
import { CompanyRole } from '@/services/Company/type';
import { JobDepartment, JobWorkplace } from '@/services/Job/type';
import { Card, CardBody, CardHeader, Divider, Radio, SelectItem } from '@nextui-org/react';

export const JobDetailsForm = () => {
  const { data } = useCompanyRole();
  const { data: companyUser } = data || {};

  const sharedProps: any = {
    variant: companyUser?.role === CompanyRole.HUMAN_RESOURCES ? 'bordered' : 'default',
    disabled: companyUser?.role !== CompanyRole.HUMAN_RESOURCES,
    isDisabled: companyUser?.role !== CompanyRole.HUMAN_RESOURCES,
  };

  return (
    <Card className='border' shadow='none'>
      <CardHeader>Job Title and Department Details</CardHeader>
      <Divider />
      <CardBody className='flex-row gap-3 p-6'>
        <FormInput name='title' label='Job Title' {...sharedProps} />
        <FormSelect className='max-w-72' name='department' label='Department' {...sharedProps}>
          <SelectItem key={JobDepartment.SUSTAINABILITY_ENVIRONMENT}>Sustainability/Environment</SelectItem>
          <SelectItem key={JobDepartment.ARCHITECTURE_CIVIL}>Architecture and Civil</SelectItem>
          <SelectItem key={JobDepartment.ENGINEERING}>Engineering</SelectItem>
          <SelectItem key={JobDepartment.PHYSICS_GEOSCIENCES}>Physics & Geosciences</SelectItem>
          <SelectItem key={JobDepartment.DIGITAL_TRANSFORMATION_IT}>Digital Transformation & IT</SelectItem>
          <SelectItem key={JobDepartment.INCL_DATA_SCIENCE_AI}>incl.Data Science & AI</SelectItem>
          <SelectItem key={JobDepartment.MATHEMATIC}>Mathematic</SelectItem>
          <SelectItem key={JobDepartment.BIOLOGY_CHEMISTRY}>Biology & Chemistry</SelectItem>
          <SelectItem key={JobDepartment.MEDICINE_HEALTH}>Medicine/Health Sector</SelectItem>
        </FormSelect>
      </CardBody>

      <Divider />

      <CardBody className='gap-6 px-6 py-4'>
        <p>Workplace</p>

        <FormRadioGroup
          classNames={{ wrapper: 'flex justify-between w-full gap-6' }}
          name='workplace'
          orientation='horizontal'
          isDisabled={companyUser?.role !== CompanyRole.HUMAN_RESOURCES}
        >
          <Radio value={JobWorkplace.ON_SITE} description='Employees work from and office'>
            On-site
          </Radio>
          <Radio value={JobWorkplace.HYBRID} description='Employees work from both office and home'>
            Hybrid
          </Radio>
          <Radio value={JobWorkplace.REMOTE} description='Employees work from home'>
            Remote
          </Radio>
        </FormRadioGroup>
      </CardBody>

      <Divider />

      <CardBody className='px-6 pb-6 pt-4'>
        <FormInput
          name='location'
          label='Job Location'
          description='Write a contry, state or city where you’d like to advertise this Job.'
          {...sharedProps}
        />
      </CardBody>
    </Card>
  );
};
