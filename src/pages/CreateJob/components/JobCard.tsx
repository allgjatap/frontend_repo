import { Job, JobWorkplace } from '@/services/Job/type';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, User } from '@nextui-org/react';
import { Crosshair } from '@phosphor-icons/react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const workplaces = {
  [JobWorkplace.ON_SITE]: 'On-site',
  [JobWorkplace.HYBRID]: 'Hybrid',
  [JobWorkplace.REMOTE]: 'Remote',
};

export type JobCardProps = Job & { onViewMore?: () => void };

export const JobCard = ({
  id,
  title,
  description,
  createdAt,
  isPublished,
  location,
  workplace,
  applicants,
}: JobCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className='w-full max-w-[750px] border shadow-sm' key={id}>
      <CardHeader className='flex justify-between'>
        <User name={title} description={`Product ${location} (${workplaces[workplace]})`} />
        <Chip className={`text-${isPublished ? 'success' : 'warning'} bg-[${isPublished ? '#FDEDD3' : '#D1F4E0'}]`}>
          {isPublished ? 'Completed' : 'Pending'}
        </Chip>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className='text-base font-normal text-slate-500'>{description}</p>
      </CardBody>
      <Divider />
      <CardFooter className='flex justify-between'>
        <div className='flex items-center gap-6'>
          <p className='flex items-center gap-1 text-sm font-normal'>
            <Crosshair size={24} color='#17C964' /> Actively recruiting
          </p>
          <p className='text-sm font-normal text-gray-500'>
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}{' '}
            ago •{' '}
            <span className='text-secondary'>
              {applicants} {applicants > 1 ? 'Applicants' : 'Applicant'}
            </span>
          </p>
        </div>
        <Button variant='light' color='secondary' onClick={() => navigate(`/jobs/post/${id}`)}>
          View More
        </Button>
      </CardFooter>
    </Card>
  );
};
