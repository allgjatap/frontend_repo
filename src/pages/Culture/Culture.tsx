import { useMemo, useState } from 'react';
import { CultureCard } from './components/CultureCard';
import { CultureMetrics } from './CultureMetrics';
import { Button, Tab, Tabs, Tooltip } from '@nextui-org/react';
import '@/index.css';
import { Info } from '@phosphor-icons/react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useCulture, useUpdateCulture } from '@/services/Culture';
import { useCultureUpdateSchema } from '@/validations/useCultureUpdateSchema';
import { UpdateCultureParams } from '@/services/Culture/type';
import { useGetMe } from '@/services/Auth';
import { UserRole } from '@/services/User/type';

export enum CultureType {
  General = 'General Cultural Profile',
  Metrics = 'Culture Metrics',
}

export const Culture = () => {
  const { data: user } = useGetMe();
  const { data } = useCulture();
  const { data: culture = [] } = data || {};

  const [selected, setSelected] = useState(user.role === UserRole.COMPANY ? 'general' : 'metrics');

  const defaultValues = useMemo(() => {
    return culture.map((section) => {
      return { ...section, questions: section.questions.slice(0, 3) };
    });
  }, [culture]);

  const resolver = useCultureUpdateSchema();
  const methods = useForm({ values: defaultValues, resolver });
  const { mutate } = useUpdateCulture();

  const handleSubmit = (values: FieldValues) => {
    mutate(values as UpdateCultureParams);
  };

  return (
    <div className='flex h-full w-full flex-col justify-center overflow-hidden px-8 pt-8'>
      {selected === 'general' ? (
        <div className='flex items-center gap-2'>
          <p>What are your company core values in each field?</p>
          <Tooltip
            showArrow={true}
            placement='top'
            content={
              'Your answers are visible only to your HR team members. By providing transparent feedback we ensure you to attract and retain only candidates who resonate with your company culture and values.'
            }
            color='default'
            className='w-full max-w-[400px]'
          >
            <div>
              <Info size={24} className='cursor-pointer' />
            </div>
          </Tooltip>
        </div>
      ) : (
        <p>Company profile evaluated by users and completion of questions.</p>
      )}

      <Tabs
        key={selected}
        color='warning'
        aria-label='Options'
        selectedKey={selected}
        onSelectionChange={(key: any) => setSelected(key)}
        className='mt-[-35px] justify-end border-b pb-4'
        classNames={{ panel: 'flex h-full overflow-auto flex-1 pb-8' }}
      >
        <Tab key='general' title='General Cultural Profile'>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <div className='grid grid-cols-2 gap-8'>
                {culture.map((section, index) => {
                  return (
                    <CultureCard
                      key={section.id}
                      sectionIndex={index}
                      title={section.name}
                      description={section.description}
                      themeColor={section.themeColor}
                      questions={section.questions}
                    />
                  );
                })}
              </div>
              <div className='flex justify-end py-4'>
                <Button color='secondary' type='submit'>
                  Submit questions
                </Button>
              </div>
            </form>
          </FormProvider>
        </Tab>

        <Tab key='metrics' title='Culture Metrics'>
          <CultureMetrics />
        </Tab>
      </Tabs>
    </div>
  );
};
