import { workplaces } from '@/pages/CreateJob/components/JobCard';
import { EmploymentType, Job, JobEducation, JobExperience } from '@/services/Job/type';
import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, User } from '@nextui-org/react';
import { Crosshair } from '@phosphor-icons/react';
import { formatDistanceToNow } from 'date-fns';

export const employmentTypes = {
  [EmploymentType.PART_TIME]: 'Part-time',
  [EmploymentType.FULL_TIME]: 'Full-time',
  [EmploymentType.CONTRACT]: 'Contract',
  [EmploymentType.FREELANCE]: 'Freelance',
};

export const jobExperiences = {
  [JobExperience.JUNIOR]: 'Junior',
  [JobExperience.MIDDLE]: 'Middle',
  [JobExperience.MID_SENIOR]: 'Mid-Senior',
  [JobExperience.SENIOR]: 'Senior',
};

export const jobEducations = {
  [JobEducation.BACHELOR]: "Bachelor's Degree",
  [JobEducation.MASTER]: "Master's Degree",
  [JobEducation.PROFESSIONAL]: 'Professional Course',
};

export type ViewJobProps = Job;

export const ViewJob = (job: ViewJobProps) => {
  const employmentData = [
    { title: 'Employment Type', label: employmentTypes[job!.employmentType] },
    { title: 'Experience', label: jobExperiences[job!.experience] },
    { title: 'Education', label: jobEducations[job!.education] },
    { title: 'Language', label: job?.language },
  ];

  const annualSalaryData = [
    { title: 'From', label: job!.from },
    { title: 'To', label: job!.to },
    { title: 'Currency', label: job!.currency },
  ];

  return (
    <Card className='flex flex-1 border' shadow='none'>
      <CardHeader className='flex justify-between'>
        <User
          avatarProps={{ src: 'https://images.unsplash.com/broken' }}
          name={job!.title}
          description={`Product ${job!.location} (${workplaces[job!.workplace]})`}
        />
        <Chip variant='flat' color={job!.isPublished ? 'success' : 'warning'}>
          {job!.isPublished ? 'Published' : 'Pending'}
        </Chip>
      </CardHeader>
      <Divider />
      <CardBody className='flex flex-col gap-6 p-6'>
        <h4 className='text-base font-bold'>Employment Details</h4>
        <div className='flex justify-between'>
          {employmentData.map((data) => (
            <div key={data.title} className='flex flex-col'>
              <p className='text-sm font-normal text-slate-500'>{data.title}</p>
              <p className='text-base font-normal text-slate-900'>{data.label}</p>
            </div>
          ))}
        </div>
      </CardBody>
      <Divider />
      <CardBody className='flex flex-col gap-6 p-6'>
        <h4 className='text-base font-bold'>Annual salary</h4>
        <div className='flex justify-between'>
          {annualSalaryData.map((data) => (
            <div key={data.title} className='flex flex-col'>
              <p className='text-sm font-normal text-slate-500'>{data.title}</p>
              <p className='text-base font-normal text-slate-900'>{data.label}</p>
            </div>
          ))}
        </div>
      </CardBody>
      <Divider />
      <CardBody className='gap-8 p-6'>
        <div>
          <h4 className='text-base font-bold'>Description</h4>
          <p className='text-base font-normal text-slate-500'>{job!.description}</p>
        </div>
        <div>
          <h4 className='text-base font-bold'>Requirements</h4>

          <div>
            <p>Technical skills</p>
            <p className='text-base font-normal text-slate-500'>{job!.technicalSkills || '-'}</p>
          </div>

          <div>
            <p>Soft skills</p>
            <p className='text-base font-normal text-slate-500'>{job!.softSkills || '-'}</p>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className='flex items-center gap-6'>
          <p className='flex items-center gap-1 text-sm font-normal'>
            <Crosshair size={24} color='#17C964' /> Actively recruiting
          </p>
          <p className='text-sm font-normal text-gray-500'>
            {formatDistanceToNow(new Date(job!.createdAt), {
              addSuffix: true,
            })}{' '}
            •{' '}
            <span className='text-secondary'>
              {job.applicants} {job.applicants > 1 ? 'Applicants' : 'Applicant'}
            </span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
