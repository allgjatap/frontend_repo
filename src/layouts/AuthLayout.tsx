import { Avatar, AvatarGroup, Image } from '@nextui-org/react';
import { Outlet } from 'react-router-dom';
import StarIcon from '@/assets/icons/stars-icon.svg';
import SignUpImage from '@/assets/images/singUp.png';
import Logo from '@/assets/icons/Logo.svg';

export const AuthLayout = () => {
  return (
    <div className='flex h-screen items-center justify-center overflow-hidden'>
      <div
        className='flex flex-1 flex-col items-center justify-center gap-16'
        style={{
          backgroundImage: `url(${SignUpImage})`,
          height: '100vh',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          paddingInline: '60px',
        }}
      >
        <div className='align-center flex flex-col gap-16'>
          <div className='align-center flex flex-col gap-5'>
            <h1 className='text-[#FFF]' font-normal style={{ fontSize: '56px' }}>
              Start changing your solutions in reality.{' '}
            </h1>

            <p font-normal text-base className='text-[#FFF]'>
              Our revolutionary AI-powered platform is your one-stop shop for seamless STEM recruitment. We connect you
              with a pre-vetted network of 10,000+ top-tier candidates, then handle the matching, hiring, visa and
              integration process – all under one roof{' '}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <AvatarGroup size='sm' max={5}>
              <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
              <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026705d' />
              <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026706d' />
              <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026707d' />
              <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026708d' />
            </AvatarGroup>
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <Image src={StarIcon} alt='stars-icon' />
                <Image src={StarIcon} alt='stars-icon' />
                <Image src={StarIcon} alt='stars-icon' />
                <Image src={StarIcon} alt='stars-icon' />
                <Image src={StarIcon} alt='stars-icon' />
                <p className='text-[#FFF]'>(5.0)</p>
              </div>
              <p className='text-[#FFF]'>from 10,000+ reviews</p>
            </div>
          </div>
        </div>
      </div>

      <div className='relative flex h-full flex-1 items-center justify-center bg-white'>
        <img
          src={Logo}
          alt='logo'
          className='absolute left-6 top-9'
          style={{ maxWidth: '94px', width: '100%', maxHeight: '108px', height: '100%' }}
        />

        <Outlet />
      </div>
    </div>
  );
};
