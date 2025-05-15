import { useState } from 'react';
import { JobStepsView } from './components/JobStepsView';
import { EmployedDetailsForm } from './components/EmployedDetailsForm';
import { Button } from '@nextui-org/react';
import { JobDetailsForm } from './components/JobDetailsForm';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateJobSchema } from '@/validations/useCreateJobSchema';
import { toast } from 'sonner';
import { AboutRoleForm } from './components/AboutRoleForm';
import { useCreateJob } from '@/services/Job';

const steps = ['Job Details', 'Employment Details', 'Job Description'];

export const CreateJob = () => {
  const resolver = useCreateJobSchema();
  const methods = useForm({ resolver });

  const { mutate: createJob, isPending } = useCreateJob();

  const [page, setPage] = useState(0);

  const handleError = () => {
    toast('Please complete all the steps');
  };

  const handleSubmit = (values: any) => {
    createJob(values);
  };

  const onNextPage = () => {
    if (page < steps.length - 1) {
      return setPage(page + 1);
    }
    methods.handleSubmit(handleSubmit, handleError)();
  };

  const forms = [JobDetailsForm, EmployedDetailsForm, AboutRoleForm];
  const Form = forms[page];

  return (
    <div className='flex w-full gap-7 overflow-auto p-8' style={{ height: `calc(100vh - 88px)` }}>
      <JobStepsView steps={steps} currentStep={page} />

      <FormProvider {...methods}>
        <div className='flex w-full flex-col gap-8'>
          <Form />

          <div className='flex w-full justify-end gap-2'>
            <Button
              className='w-full max-w-[171px]'
              variant='bordered'
              color='default'
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
            >
              Back
            </Button>
            <Button className='w-full max-w-[171px]' color='secondary' onClick={onNextPage} isLoading={isPending}>
              {page === steps.length - 1 ? 'Save' : 'Next'}
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
