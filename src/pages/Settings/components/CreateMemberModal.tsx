import { FormInput, FormSelect } from '@/components/Form';
import { companyRoles } from '@/pages/SignUpCompany/components/CompanyRepresentative';
import { useCreateMember } from '@/services/Company';
import { useCreateMemberSchema } from '@/validations/useCreateMemberSchema';
import { Button, ModalBody, ModalContent, ModalHeader, SelectItem, useModalContext } from '@nextui-org/react';
import { FormProvider, useForm } from 'react-hook-form';

export const CreateMemberModal = () => {
  const resolver = useCreateMemberSchema();
  const { onClose } = useModalContext();
  const methods = useForm({ resolver });

  const { mutateAsync: createMember } = useCreateMember();

  const handleSubmit = (values: any) => {
    createMember(values).then(() => onClose());
  };

  return (
    <ModalContent>
      <ModalHeader>Add New Member</ModalHeader>
      <ModalBody>
        <FormProvider {...methods}>
          <form className='flex flex-col gap-6' onSubmit={methods.handleSubmit(handleSubmit)}>
            <FormInput name='firstName' label='First Name' variant='bordered' size='sm' />
            <FormInput name='lastName' label='Last Name' variant='bordered' size='sm' />
            <FormInput name='email' label='Email' variant='bordered' size='sm' />
            <FormSelect name='role' label='Role' variant='bordered' size='sm'>
              {companyRoles.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </FormSelect>

            <div className='flex gap-5 self-end'>
              <Button className='bg-white text-danger' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit' color='secondary'>
                Send Invite
              </Button>
            </div>
          </form>
        </FormProvider>
      </ModalBody>
    </ModalContent>
  );
};
