import { FormDynamicInput } from '@/components/Form/FormDynamicInput';
import { InputType } from '@/services/Onboarding/type';
import { DynamicFormProps, useDynamicFormSchema } from '@/validations/useDynamicFormSchema';
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { PencilLine } from '@phosphor-icons/react';
import { useCallback, useMemo, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

export type CompanyCardInfoProps = {
  title: string;
  inputs: DynamicFormProps[];
  data: any;
  onSubmit?: (values: FieldValues) => void;
  disabled?: boolean;
};

const showAnswer = (answer: any) => {
  if (typeof answer === 'boolean') {
    return !!answer ? 'Yes' : 'No';
  }
  return answer;
};

export const CompanyCardInfo = ({ title, inputs, data, onSubmit, disabled }: CompanyCardInfoProps) => {
  const resolver = useDynamicFormSchema(inputs);
  const methods = useForm({ values: data, resolver });
  const [editQuestions, setEditQuestions] = useState(false);

  const filteredInputs = useMemo(() => {
    return inputs.filter((input) => {
      if (!!input.parentInput) {
        const found = inputs.find((i) => i.name === input.parentInput);

        if (!found) {
          return false;
        }

        let value = methods.getValues(found.name!);

        if (found.type === InputType.BOOLEAN) {
          value = typeof value === 'boolean' ? value : value === 'true';
        }

        return input.parentValue === value;
      }

      return true;
    });
  }, [inputs, methods.watch()]);

  const renderQuestion = useCallback(
    (item: DynamicFormProps, index: number) => (
      <div key={item.name}>
        {!editQuestions ? (
          <CardBody className='gap-2px flex flex-col'>
            <p className='text-xs font-normal text-gray-400'>
              <strong>{item.label}</strong>
            </p>
            <p className='min-h-5 text-sm font-medium'>{showAnswer(data[item.name]) || '-'}</p>
          </CardBody>
        ) : (
          <FormDynamicInput key={item.name} radius='none' {...item} />
        )}
        {index < filteredInputs.length - 1 && <Divider />}
      </div>
    ),
    [data, editQuestions]
  );

  const showEditQuestions = (show: boolean) => {
    setEditQuestions(show);
    methods.clearErrors();
  };

  const handleSubmit = (values: FieldValues) => {
    onSubmit?.(values);
    setEditQuestions(false);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit, (err) => console.log('err', err))}>
        <Card className='overflow-hidden border' shadow='none'>
          <CardHeader className='flex items-center justify-between'>
            <h3>{title}</h3>

            {!!editQuestions ? (
              <div className='flex gap-2'>
                <Button variant='bordered' onPress={() => showEditQuestions(false)}>
                  Cancel
                </Button>
                <Button type='submit' color='secondary'>
                  Submit
                </Button>
              </div>
            ) : (
              !disabled && (
                <Button isIconOnly variant='light' radius='full' onPress={() => showEditQuestions(true)}>
                  <PencilLine size={26} />
                </Button>
              )
            )}
          </CardHeader>
          <CardBody>
            <Card className='border' shadow='none'>
              <CardBody className='p-0'>{filteredInputs.map(renderQuestion)}</CardBody>
            </Card>
          </CardBody>
        </Card>
      </form>
    </FormProvider>
  );
};
