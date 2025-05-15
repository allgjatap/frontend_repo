import { useCompanyJob } from '@/services/Job';
import { Button, Spinner } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { EditJobs } from './components/EditJobs';
import { useCompanyRole } from '@/services/Company';
import { CompanyRole } from '@/services/Company/type';
import { ViewJob } from './components/ViewJob';

export const JobDetails = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { data: jobRes, isLoading } = useCompanyJob(id!);
  const { data: roleRes } = useCompanyRole();
  const { data: companyUser } = roleRes || {};
  const { data: job } = jobRes || {};

  if (isLoading) {
    return (
      <div className='flex-1'>
        <Spinner />
      </div>
    );
  }

  if (!!isEditing) {
    return <EditJobs job={job!} closeEdit={setIsEditing} />;
  }

  return (
    <div className='flex flex-col gap-8 overflow-auto p-8'>
      <ViewJob {...job!} />
      <div className='flex gap-1 self-end'>
        {companyUser?.role === CompanyRole.HUMAN_RESOURCES && (
          <Button variant='bordered' color='danger'>
            Delete
          </Button>
        )}
        <Button color='secondary' onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </div>
    </div>
  );
};
