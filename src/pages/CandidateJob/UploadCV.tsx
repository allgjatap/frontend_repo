import { useApplicateJob } from '@/services/Job';
import {
  Button,
  Divider,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useModalContext,
} from '@nextui-org/react';
import { File, FileArrowUp } from '@phosphor-icons/react';
import { useState } from 'react';
import { toast } from 'sonner';

export const UploadCV = ({ id }: { id: string }) => {
  const { onClose } = useModalContext();
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');

  const { mutateAsync: applicateJob } = useApplicateJob();

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file && !url) {
      return toast('Fill one of the two options!');
    }

    applicateJob({ id, file: file!, url }).then(onClose);
  };

  return (
    <ModalContent>
      <ModalHeader className='flex flex-col gap-1'>Add new CV</ModalHeader>
      <ModalBody>
        <div className='flex flex-col items-center'>
          <input type='file' multiple onChange={handleFileChange} className='hidden' id='fileInput' />
          <label
            htmlFor='fileInput'
            className='flex w-full cursor-pointer flex-col items-center gap-4 rounded-2xl border px-6 py-10 text-center'
          >
            <FileArrowUp size={32} />
            <div className='flex flex-col gap-2'>
              <p>
                Click <span className='font-bold text-purple-800'>'Upload'</span> to upload your CV
              </p>
              <p>Select zip,image,pdf or ms.word</p>
            </div>
          </label>
          {!!file && (
            <div className='mt-6 flex w-full items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3'>
              <div className='rounded-lg bg-white p-3'>
                <File />
              </div>
              <div>
                <p className='text-sm'>{file.name}</p>
                <p className='text-xs text-slate-500'>{Math.round((file.size / 1024) * 10) / 10}kB</p>
              </div>
            </div>
          )}
          <div className='mt-6 flex w-full items-center justify-center gap-1'>
            <Divider />
            <div className='px-2'>OR</div>
            <Divider />
          </div>

          <div className='flex w-full flex-col gap-3 py-6'>
            <p>import from URL</p>
            <Input
              name='url'
              fullWidth
              placeholder='Add URL link'
              value={url}
              variant='bordered'
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color='danger' variant='light' onPress={onClose}>
          Close
        </Button>
        <Button color='primary' onPress={handleUpload}>
          Upload
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
