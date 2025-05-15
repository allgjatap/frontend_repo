import { Button, Image } from '@nextui-org/react';
import MailIcon from '@/assets/images/mailIcon.png';
import { useAuthData } from '@/services/Auth';

export const ConfirmAccount = () => {
  const { data } = useAuthData();

  return (
    <div className='flex w-full flex-col items-center justify-center gap-8 p-8' style={{ maxWidth: '484px' }}>
      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-medium'>Check your inbox</h2>
        <p className='text-base font-normal'>To confirm your email, tap on the link we sent to {data?.email}</p>
      </div>
      <Image src={MailIcon} alt='email' width='195px' />
      <Button
        className='h-10 w-full px-4 text-base font-medium hover:bg-purple-500 hover:decoration-indigo-400'
        style={{ backgroundColor: 'transparent', color: '#7828C8', maxWidth: '420px' }}
        onClick={() => window.open('https://mail.google.com/mail/u/0/', '_blank')}
      >
        Open Email
      </Button>
    </div>
  );
};
