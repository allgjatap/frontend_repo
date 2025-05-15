import { Button, Modal, Spinner, useDisclosure } from '@nextui-org/react';
import { ViewJob } from '../Jobs/components/ViewJob';
import { useCompanyJob } from '@/services/Job';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadCV } from './UploadCV';

export const CandidateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useCompanyJob(id!);
  const { data: job } = data || {};

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (isLoading) {
    return (
      <div className='flex-1'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6 p-6'>
      <ViewJob {...job!} />
      <div className='flex justify-end gap-5'>
        <Button color='default' className='' variant='bordered' onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button color='secondary' onPress={onOpen}>
          Upload CV
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <UploadCV id={id!} />
        </Modal>
      </div>
    </div>
  );
};
