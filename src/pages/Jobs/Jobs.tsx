import { Input, Pagination, Tab, Tabs } from '@nextui-org/react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { JobCard } from '../CreateJob/components/JobCard';
import { useNavigate } from 'react-router-dom';
import { useCompanyJobs } from '@/services/Job';
import { useQueryString } from '@/hooks/useQueryString';
import { debounce } from 'lodash';

export const Jobs = () => {
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useQueryString({ page: 1, search: '' });
  const { data, isLoading } = useCompanyJobs(queryParams);
  const { data: jobs = [], meta } = data || {};

  const searchTemplate = (e: any) => {
    setQueryParams({ search: e.target.value });
  };
  const debounceSearch = debounce(searchTemplate, 500);

  return (
    <div className='flex h-full w-full flex-col gap-8 overflow-auto p-8'>
      <div className='flex w-full justify-between'>
        <Input
          type='Search'
          placeholder='Search'
          isClearable
          variant='bordered'
          radius='lg'
          classNames={{ innerWrapper: 'bg-transparent' }}
          startContent={<MagnifyingGlass size={15} />}
          className='max-w-[488px] rounded-full bg-white'
          onChange={debounceSearch}
        />
        <Tabs
          key={''}
          variant={'bordered'}
          aria-label='Tabs variants'
          color='warning'
          className='rounded-full bg-white'
        >
          <Tab key='week' title='1 week' />
          <Tab key='mounth' title='1 mounth' />
          <Tab key='3mounth' title='3 mounth' />
          <Tab key='year' title='1 year' />
        </Tabs>
      </div>
      <div className='flex h-full w-full flex-col justify-between overflow-auto'>
        <div className='grid w-full grid-cols-2 gap-4'>
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} onViewMore={() => navigate(`/jobs/post/${job.id}`)} />
          ))}
        </div>
        <div className='flex flex-col items-center gap-5'>
          <Pagination
            loop
            showControls
            color='secondary'
            total={meta?.pageCount || 0}
            page={queryParams.page}
            isDisabled={isLoading}
            onChange={(page) => setQueryParams({ page })}
          />
        </div>
      </div>
      {jobs.length === 0 && <div className='text-center items-center flex flex-col mb-[27%] gap-4'><div className="bg-purple-100 p-8 rounded-2xl flex " ><MagnifyingGlass size={50} weight="bold" color="#4500A8"  /></div><h2 className="text-3xl weight-bold"> No Jobs found!</h2></div>}
    </div>
  );
};
