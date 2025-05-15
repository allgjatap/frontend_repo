import { FormTextfield } from '@/components/Form';
import { useCompanyRole } from '@/services/Company';
import { CompanyRole } from '@/services/Company/type';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { Info } from '@phosphor-icons/react';

export const AboutRoleForm = () => {
  const { data } = useCompanyRole();
  const { data: companyUser } = data || {};

  const sharedProps: any = {
    variant: companyUser?.role === CompanyRole.TECHNICAL_LEAD ? 'bordered' : 'faded',
    disabled: companyUser?.role !== CompanyRole.TECHNICAL_LEAD,
    isDisabled: companyUser?.role !== CompanyRole.TECHNICAL_LEAD,
  };

  return (
    <div className='flex flex-col gap-8'>
      <Card className='border' shadow='none'>
        <CardHeader>
          <h4 className='text-base font-bold'>Description</h4>
        </CardHeader>
        <Divider />
        <CardBody className='p-6'>
          <FormTextfield
            name='description'
            placeholder='Enter the job description here; include key areas of responsibility and wat the candidate might do on a typical day.'
            fullWidth
            minRows={8}
            maxRows={8}
            variant={companyUser?.role === CompanyRole.HUMAN_RESOURCES ? 'bordered' : 'faded'}
            isDisabled={companyUser?.role !== CompanyRole.HUMAN_RESOURCES}
          />
        </CardBody>
      </Card>

      <Card className='border' shadow='none'>
        <CardHeader>
          <h4 className='text-base font-bold'>Skills</h4>
        </CardHeader>
        <Divider />
        <CardBody className='gap-6 p-6'>
          <FormTextfield
            label='Technical skills'
            name='technicalSkills'
            placeholder='Enter Technical skills'
            fullWidth
            minRows={8}
            maxRows={8}
            {...sharedProps}
          />

          <FormTextfield
            label='Software soft skills'
            name='softSkills'
            placeholder='Enter Software soft skills'
            fullWidth
            minRows={8}
            maxRows={8}
            {...sharedProps}
          />
        </CardBody>
        <CardBody>
          <p className='flex items-center gap-1 text-sm text-amber-500'>
            <Info size={24} color='#F5A524' />
            This section is completed by the Tech Lead, please click 'Send' to send it to the Tech Lead.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
