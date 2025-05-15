import { useVerifyEmail } from '@/services/Auth';
import { Image, Spinner } from '@nextui-org/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MailIcon from '@/assets/images/mailIcon.png';

export const VerifyEmail = () => {
  const { token } = useParams();
  const { mutate } = useVerifyEmail();

  useEffect(() => mutate(token!), [token]);

  return (
    <div className='flex w-full flex-col items-center justify-center gap-3 p-8' style={{ maxWidth: '484px' }}>
      <Image src={MailIcon} alt='email' width='195px' />

      <h2 className='text-2xl font-medium'>Verifying Email</h2>
      <Spinner className='pt-5' />
    </div>
  );
};
