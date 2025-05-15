import React, { Fragment, useMemo, useRef, useState } from 'react';
import { Card, Button, CardHeader, Divider, CardBody, Slider, Image } from '@nextui-org/react';
import { CloudArrowUp } from '@phosphor-icons/react';
import Stars from '@/assets/icons/stars-icon.svg';
import ProfileBg from '@/assets/images/ProfileBg.png';
import { useCurrentCompany } from '@/services/Company';
import { useGetMe } from '@/services/Auth';
import { UserRole } from '@/services/User/type';
import { getFullName } from '@/utils/getFullName';

export const CultureMetrics = () => {
  const { data: user } = useGetMe();
  const { data } = useCurrentCompany({ enabled: user.role === UserRole.COMPANY });
  const company = data?.data;
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const coverPhotoInputRef = useRef<HTMLInputElement>(null);

  const handleCoverPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCoverPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleProfilePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleCoverPhotoButtonClick = () => {
    if (coverPhotoInputRef.current) {
      coverPhotoInputRef.current.click();
    }
  };

  const credentials = useMemo(() => {
    if (user.role === UserRole.COMPANY) {
      return { name: company?.name, country: company?.country };
    }

    return { name: getFullName(user), country: '' };
  }, [user, company]);

  return (
    <div className='h-max bg-white pb-4'>
      <Card className='flex gap-4 pb-16 shadow-none'>
        <div className='relative flex w-full flex-col'>
          <div className='relative flex h-full max-h-[222px] w-full justify-end overflow-hidden rounded-t-md border border-[#F4F4F5] bg-white'>
            <Image src={coverPhoto || ProfileBg} alt='Cover' className='z-0 h-full w-full rounded-t-md object-cover' />
            <input
              type='file'
              accept='image/*'
              ref={coverPhotoInputRef}
              className='absolute inset-0 cursor-pointer opacity-0'
              onChange={handleCoverPhotoUpload}
            />
            <Button
              className='absolute bottom-0 right-2 top-2 self-end rounded-full bg-white p-2'
              variant='light'
              onClick={handleCoverPhotoButtonClick}
            >
              <CloudArrowUp size={22} />
            </Button>
          </div>
          <div className='absolute bottom-0 left-4 flex max-h-[150px] max-w-[150px] translate-y-1/2 transform items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-200'>
            {profilePhoto ? (
              <Image src={profilePhoto} alt='Profile' className='h-full w-full rounded-full object-cover' />
            ) : (
              <Button className='h-[150px] w-[150px] bg-transparent bg-none p-0' variant='light'>
                <CloudArrowUp size={22} />
              </Button>
            )}
            <input
              type='file'
              accept='image/*'
              className='absolute inset-0 h-full max-h-[150px] w-full max-w-[150px] cursor-pointer opacity-0'
              onChange={handleProfilePhotoUpload}
            />
          </div>
        </div>
        <div className='ml-[200px]'>
          <h1 className='text-xl font-bold'>{credentials?.name}</h1>
          <p className='flex gap-1'>{credentials?.country}</p>
        </div>
      </Card>
      <div className='flex w-full justify-between gap-10 px-8'>
        <div className='h-full max-h-[505px] w-full max-w-[835px]'>
          <Card className='h-full max-h-[505px] w-full max-w-[835px] border border-[#F4F4F5] shadow-none'>
            <CardHeader>
              <h3>Strengthen</h3>
            </CardHeader>
            <Divider />
            <CardBody className='gap-auto flex h-full w-full max-w-[840px] flex-col p-6'>
              <p>Complete the culture questions to have a better and more attractive candidate profile.</p>
              <div className='flex h-[348px] w-full flex-row justify-around'>
                <div className='p-3'>
                  <Slider
                    size='lg'
                    formatOptions={{ style: 'percent' }}
                    startContent={<p>D&I</p>}
                    label
                    isDisabled
                    className='opacity-100'
                    step={0.01}
                    maxValue={1}
                    minValue={0}
                    orientation='vertical'
                    defaultValue={0.02}
                    color='warning'
                    classNames={{ base: 'w-full h-full border border-[#F4F4F5] p-2' }}
                  />
                </div>
                <div className='p-3'>
                  <Slider
                    formatOptions={{ style: 'percent' }}
                    size='lg'
                    step={0.01}
                    maxValue={1}
                    minValue={0}
                    startContent={<p>L&D</p>}
                    label
                    isDisabled
                    className='opacity-100'
                    orientation='vertical'
                    defaultValue={0.06}
                    color='success'
                    classNames={{ base: 'w-full h-full border border-[#F4F4F5] p-2' }}
                  />
                </div>
                <div className='p-3'>
                  <Slider
                    size='lg'
                    step={0.01}
                    formatOptions={{ style: 'percent' }}
                    maxValue={1}
                    minValue={0}
                    startContent={<p>EFF</p>}
                    label
                    isDisabled
                    className='opacity-100'
                    orientation='vertical'
                    defaultValue={0.021}
                    color='primary'
                    classNames={{ base: 'w-full h-full border border-[#F4F4F5] p-2' }}
                  />
                </div>
                <div className='p-3'>
                  <Slider
                    size='lg'
                    step={0.01}
                    formatOptions={{ style: 'percent' }}
                    maxValue={1}
                    minValue={0}
                    startContent={<p>AGL</p>}
                    label
                    isDisabled
                    className='opacity-100'
                    orientation='vertical'
                    defaultValue={0.02}
                    color='danger'
                    classNames={{ base: 'w-full h-full border border-[#F4F4F5] p-2' }}
                  />
                </div>
                <div className='p-3'>
                  <Slider
                    size='lg'
                    step={0.01}
                    maxValue={1}
                    formatOptions={{ style: 'percent' }}
                    minValue={0}
                    orientation='vertical'
                    defaultValue={0.05}
                    startContent={<p>ESAT</p>}
                    label
                    aria-disabled
                    isDisabled
                    className='opacity-100'
                    color='secondary'
                    classNames={{ base: 'w-full h-full border border-[#F4F4F5] p-2' }}
                  />
                </div>
                <div className='p-3'>
                  <Slider
                    size='lg'
                    step={0.01}
                    maxValue={1}
                    minValue={0}
                    formatOptions={{ style: 'percent' }}
                    orientation='vertical'
                    startContent={<p>ESG..</p>}
                    label
                    color='foreground'
                    defaultValue={0.23}
                    isDisabled
                    className='opacity-100'
                    classNames={{
                      base: 'w-full h-full border border-[#F4F4F5] p-2',
                      filler: 'bg-rose-800   ',
                      thumb: 'bg-rose-800 border-b-rose-800',
                      trackWrapper: 'w-full h-full  border-b-rose-800 ',
                      mark: 'bg-rose-800 border-rose-800 border-b-rose-800',
                      step: 'border border-rose-800 bg-rose-800   ',
                    }}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='flex h-full w-full max-w-[600px] flex-col gap-8'>
          {user.role === UserRole.COMPANY ? (
            <Fragment>
              <Card className='border border-[#F4F4F5] shadow-none'>
                <CardHeader>
                  <h3>Satisfaction with the corporate culture</h3>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className='flex justify-between'>
                    <p>Corporate culture</p>
                    <div className='flex gap-1'>
                      <img src={Stars} alt='star' />
                      <img src={Stars} alt='star' />
                      <img src={Stars} alt='star' />
                      <img src={Stars} alt='star' />
                      <img src={Stars} alt='star' />
                      5.0
                    </div>
                  </div>
                </CardBody>
                <CardBody>
                  <p>Based on 723 reviews</p>
                </CardBody>
              </Card>
              <Card className='border border-[#F4F4F5] shadow-none'>
                <CardHeader>
                  <h3>How do we assess the corporate culture?</h3>
                </CardHeader>
                <CardBody>
                  <p className='px-3.5 py-3.5'>
                    At Higherd, we believe that culture defines the personality of a company. The corporate culture
                    assessment is carried out 100% by our users, who select a maximum of 40 of 160 cultural
                    characteristics to best describe the corporate culture - anonymously, of course.
                  </p>
                </CardBody>
              </Card>
            </Fragment>
          ) : (
            <Card className='border border-[#F4F4F5] shadow-none'>
              <CardHeader>
                <h3>Suggestions</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>
                  Complete the questions to have a more valuable impact on companies that are interested in employment.
                </p>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
