import { Spinner } from '@nextui-org/react';

export const Loader = () => (
  <div className='flex h-screen w-screen items-center justify-center'>
    <Spinner size='lg' color='secondary' />
  </div>
);
