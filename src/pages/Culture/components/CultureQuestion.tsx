import { ISlider } from '@/components/UI/ISlider';
import { Button, ButtonProps, Tooltip } from '@nextui-org/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useWatch } from 'react-hook-form';

export type CultureQuestionProps = {
  name: string;
  text: string;
  value: string;
  themeColor: string;
  total: number;
  page: number;
  onSliderChange: (v: number) => void;
  onPageChange: (page: number) => void;
};

export const CultureQuestion = ({
  name,
  text,
  value,
  themeColor,
  total,
  page,
  onSliderChange,
  onPageChange,
}: CultureQuestionProps) => {
  const answer = useWatch({ name });

  const buttonProps: ButtonProps = { className: 'bg-transparent', isIconOnly: true, radius: 'full', size: 'sm' };

  return (
    <div className='px-5 py-2'>
      <div className='flex items-center justify-between gap-2'>
        <p className='w-full text-sm'>{text}</p>
        <ISlider
          className='max-w-60'
          customColor={themeColor}
          size='lg'
          label='Select a number'
          maxValue={10}
          minValue={0}
          orientation='horizontal'
          value={answer || 0}
          onChange={(v) => onSliderChange(v as number)}
        />
      </div>
      <div className='mt-2 flex items-center justify-between'>
        <p className='text-sm font-normal text-[#71717A]'>
          Value: <span className='text-sm font-normal text-[#52525B]'>{value}</span>
        </p>
        <div className='flex items-center gap-1'>
          <Tooltip showArrow={true} content='Back Question'>
            <Button {...buttonProps} disabled={page <= 0} onClick={() => onPageChange(page - 1)}>
              <CaretLeft size={20} />
            </Button>
          </Tooltip>
          <p>
            {page + 1} - {total}
          </p>
          <Tooltip showArrow={true} content='Skip Question'>
            <Button {...buttonProps} disabled={page >= total - 1} onClick={() => onPageChange(page + 1)}>
              <CaretRight size={20} />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
