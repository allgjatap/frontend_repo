import React, { useMemo, useRef, useState } from 'react';
import ProfileBg from '@/assets/images/ProfileBg.png';
import { Button, Card, CardBody, CardHeader, Chip, Link, Modal, User, useDisclosure } from '@nextui-org/react';
import { Camera, GraduationCap, PencilSimpleLine, Plus } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { CompanyCardInfo } from './components/CardInfo';
import { useCompanyMembers, useCurrentCompany, useUpdateCompany } from '@/services/Company';
import { InputType } from '@/services/Onboarding/type';
import { CompanySize } from '@/services/Company/type';
import { useOnboardingQuestions, useSubmitOnboarding } from '@/services/Onboarding';
import { getFullName } from '@/utils/getFullName';
import { CreateMemberModal } from './components/CreateMemberModal';
import { companyRoles } from '../SignUpCompany/components/CompanyRepresentative';
import { DynamicFormProps } from '@/validations/useDynamicFormSchema';
import queryClient from '@/services/QueryClient';

const companyInfo: DynamicFormProps[] = [
  { label: 'Company Name', name: 'name', type: InputType.INPUT },
  { label: 'Email', name: 'email', type: InputType.EMAIL, disabled: true },
  { label: 'Phone Number', name: 'phone', type: InputType.INPUT },
  { label: 'Country', name: 'country', type: InputType.INPUT },
  { label: 'Zip', name: 'zip', type: InputType.NUMBER },
];

const companyDetails: DynamicFormProps[] = [
  { label: 'Industry', name: 'industry', type: InputType.INPUT },
  {
    label: 'Company Size',
    name: 'companySize',
    type: InputType.SELECT,
    options: [
      { label: 'Small', value: CompanySize.SMALL },
      { label: 'Medium', value: CompanySize.MEDIUM },
      { label: 'Large', value: CompanySize.LARGE },
    ],
  },
  { label: 'Team Size', name: 'teamSize', type: InputType.NUMBER },
  { label: 'STEM Openings', name: 'stemOpenings', type: InputType.NUMBER },
];

export const Settings = () => {
  const { data: companyRes } = useCurrentCompany();
  const { data: onboardingRes } = useOnboardingQuestions();
  const { data: membersRes } = useCompanyMembers();
  const { data: onboarding = [] } = onboardingRes || {};
  const { data: members = [] } = membersRes || {};
  const company = companyRes?.data;

  const { mutate: updateCompany } = useUpdateCompany();
  const { mutate: submitOnboarding } = useSubmitOnboarding({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding', 'question'] });
    },
  });
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const navigate = useNavigate();
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

  const clearProfilePhoto = () => {
    setProfilePhoto(null);
  };

  const handleCoverPhotoButtonClick = () => {
    if (coverPhotoInputRef.current) {
      coverPhotoInputRef.current.click();
    }
  };

  const onboardingInputs = useMemo(() => {
    return onboarding.map((item) => ({
      name: item.id,
      label: item.title,
      type: item.type,
      options: item.values?.map((value) => ({ label: value, value })),
      parentInput: item.parentQuestionId,
      parentValue: item.parentValue,
    }));
  }, [onboarding]);

  const onboardingData = useMemo(() => {
    return onboarding.reduce((acc, input) => {
      acc[input.id] = input.answer;
      return acc;
    }, {} as any);
  }, [onboarding]);

  const onSubmitOnboarding = (values: any) => {
    const questions = Object.entries(values).map(([key, value]) => ({ questionId: key, answer: value }));

    submitOnboarding(questions);
  };

  return (
    <div className='flex flex-col gap-8 p-8'>
      <div className='flex flex-col overflow-hidden rounded-xl border bg-white'>
        <div className='relative flex w-full flex-col border-b pb-14'>
          <div className='relative flex h-full max-h-[222px] min-h-[220px] w-full justify-end overflow-hidden rounded-t-md border border-[#F4F4F5] bg-white'>
            <img src={coverPhoto || ProfileBg} alt='Cover' className='h-full w-full rounded-t-md object-cover' />
            <input
              type='file'
              accept='image/*'
              ref={coverPhotoInputRef}
              className='absolute inset-0 cursor-pointer opacity-0'
              onChange={handleCoverPhotoUpload}
            />
            <Button
              className='absolute bottom-0 right-2 top-2 self-end rounded-full p-2'
              variant='light'
              onClick={handleCoverPhotoButtonClick}
            >
              {!coverPhoto ? <PencilSimpleLine size={22} /> : <Camera size={22} />}
            </Button>
          </div>
          <div className='relative flex flex-col'></div>
          <div className='absolute bottom-0 left-4 top-[60px] flex max-h-[150px] max-w-[150px] translate-y-1/2 transform items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-xl'>
            {profilePhoto ? (
              <div>
                <img src={profilePhoto} alt='Profile' className='h-full w-full rounded-full object-cover' />
              </div>
            ) : (
              <Button className='h-[150px] w-[150px] bg-none' variant='light'>
                <Camera size={22} />
              </Button>
            )}
            <input
              type='file'
              accept='image/*'
              className='absolute inset-0 h-full max-h-[150px] w-full max-w-[150px] cursor-pointer opacity-0'
              onChange={handleProfilePhotoUpload}
            />
          </div>
          <div className='ml-[200px]'>
            <h1 className='text-xl font-bold'>{company?.name}</h1>
            <p className='flex gap-1'>{company?.country}</p>
          </div>
          {profilePhoto && (
            <div className='absolute bottom-0 left-6 flex gap-4'>
              <Link href='#' color='danger' onClick={clearProfilePhoto}>
                Remove
              </Link>
              <Link href='' color='secondary' onClick={() => handleProfilePhotoUpload}>
                Change
              </Link>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-4 p-8'>
          <h3 className='text-lg font-bold text-gray-500'>Suggestion for you</h3>
          <div className='flex gap-4'>
            <div className='flex h-full w-full max-w-[635px] gap-[14px] rounded-xl border p-6'>
              <div className='max-h-[72px] max-w-[72px] rounded-xl bg-violet-200 p-[14px]'>
                <GraduationCap size={'44px'} weight='fill' color='#4F46E5' />
              </div>
              <div className='flex flex-col gap-1'>
                <h3 className='text-base font-semibold text-slate-900'>Complete Culture Fit </h3>
                <div className='flex items-end gap-4'>
                  <p>We have not finished filling in all the questions, please fill them out</p>
                  <Button
                    color='secondary'
                    variant='bordered'
                    className='border-2 px-8'
                    onClick={() => navigate('/culture')}
                  >
                    Go Culture Fit
                  </Button>
                </div>
              </div>
            </div>
            {!profilePhoto && (
              <div className='flex h-full w-full max-w-[635px] gap-[14px] rounded-xl border p-6'>
                <div className='max-h-[72px] max-w-[72px] rounded-xl bg-violet-200 p-[14px]'>
                  <Camera size={'44px'} weight='fill' color='#4F46E5' />
                </div>
                <div className='flex flex-col gap-1'>
                  <h3 className='text-base font-semibold text-slate-900'>Add a profile to help others Recognize you</h3>
                  <div className='flex items-end gap-4'>
                    <p>Members with a profile photo receive to 2.3 times as many profile View</p>
                    <Button
                      color='secondary'
                      variant='bordered'
                      className='border-2 px-8'
                      onClick={(e: any) => handleProfilePhotoUpload(e)}
                    >
                      Add Photo
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {!!company && (
        <div className='grid grid-cols-2 gap-8'>
          <CompanyCardInfo title='Company Information' inputs={companyInfo} data={company!} onSubmit={updateCompany} />

          <Card shadow='none' className='border bg-white'>
            <CardHeader className='flex justify-between'>
              <p>Team Members</p>
              <Button isIconOnly color='secondary' size='sm' onClick={onOpen}>
                <Plus color='white' size={20} weight='bold' />
              </Button>
            </CardHeader>
            <CardBody className='gap-2'>
              {members.map((member) => (
                <div key={member.id} className='flex items-center justify-between rounded-xl border p-3'>
                  <User
                    name={getFullName(member)}
                    description={companyRoles.find((o) => o.value === member.role)?.label}
                  />
                  {member.isPending && (
                    <Chip color='warning' variant='flat'>
                      Pending
                    </Chip>
                  )}
                </div>
              ))}
            </CardBody>
          </Card>

          <CompanyCardInfo title='Company Details' inputs={companyDetails} data={company!} onSubmit={updateCompany} />
        </div>
      )}

      <CompanyCardInfo
        title='Questions'
        inputs={onboardingInputs}
        data={onboardingData}
        onSubmit={onSubmitOnboarding}
      />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <CreateMemberModal />
      </Modal>
    </div>
  );
};
