import { AboutRoleForm } from '@/pages/CreateJob/components/AboutRoleForm';
import { EmployedDetailsForm } from '@/pages/CreateJob/components/EmployedDetailsForm';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@nextui-org/react';
import { JobDetailsForm } from '@/pages/CreateJob/components/JobDetailsForm';
import { Job } from '@/services/Job/type';
import { useCompanyRole } from '@/services/Company';
import { useCreateJobSchema } from '@/validations/useCreateJobSchema';
import { CompanyRole } from '@/services/Company/type';
import { usePublishJobSchema } from '@/validations/usePublishJobSchema';
import { usePublishJob, useUpdateJob } from '@/services/Job';

export type EditJobsProps = {
  job: Job;
  closeEdit: (v: false) => void;
};

export const EditJobs = ({ job, closeEdit }: EditJobsProps) => {
  const { data } = useCompanyRole();
  const { data: companyRole } = data || {};
  const { mutateAsync: updateCompany, isPending: isUpdating } = useUpdateJob();
  const { mutateAsync: publishJob, isPending: isPublishing } = usePublishJob();

  const createJobResolver = useCreateJobSchema();
  const publishJobResolver = usePublishJobSchema();

  const methods = useForm({
    defaultValues: job,
    resolver: companyRole?.role === CompanyRole.HUMAN_RESOURCES ? createJobResolver : publishJobResolver,
  });

  const handleSubmit = (values: any) => {
    const body = { id: job.id, ...values };

    if (companyRole?.role === CompanyRole.HUMAN_RESOURCES) {
      return updateCompany(body).then(() => closeEdit(false));
    } else if (companyRole?.role === CompanyRole.TECHNICAL_LEAD) {
      return publishJob(body).then(() => closeEdit(false));
    }
  };

  const isLoading = isUpdating || isPublishing;

  return (
    <FormProvider {...methods}>
      <form className='flex w-full flex-col gap-6 p-8' onSubmit={methods.handleSubmit(handleSubmit)}>
        <JobDetailsForm />
        <EmployedDetailsForm />
        <AboutRoleForm />

        <div className='flex justify-end gap-3'>
          <Button variant='bordered' onClick={() => closeEdit(false)}>
            Cancel
          </Button>
          <Button type='submit' color='secondary' isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
