import React from 'react';
import { useRadio, VisuallyHidden, RadioProps, cn } from '@nextui-org/react';
type CustomRadioProps = RadioProps & {
  icon: React.ReactNode;
  isSelected?: boolean;
  children?: React.ReactNode;
  description?: string;
};

export const CustomRadio: React.FC<CustomRadioProps> = (props) => {
  const { icon, description, children, ...rest } = props;

  const {
    Component,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio({ ...rest });

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        'group inline-flex flex-row-reverse items-center justify-between hover:bg-content2',
        'max-w-[420px] cursor-pointer gap-4 rounded-lg border border-default',
        'bg-white shadow-lg data-[selected=true]:border-primary'
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      <div {...getLabelWrapperProps()} className='m-0 w-full'>
        <div className='flex items-center justify-between border-b-1 p-3'>
          <div className='flex items-center gap-2'>
            {icon && <span {...getLabelProps()}>{icon}</span>}
            {children && <span {...getLabelProps()}>{children}</span>}
          </div>
          <span {...getWrapperProps()}>
            <span {...getControlProps()} />
          </span>
        </div>
        <div className='p-6'>
          {description && <span className='text-small text-foreground opacity-70'>{description}</span>}
        </div>
      </div>
    </Component>
  );
};
