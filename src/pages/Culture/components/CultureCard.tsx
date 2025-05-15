import { Fragment, useMemo, useState } from 'react';
import { Card, CardHeader, CardBody, Divider, Tooltip, Button, cn } from '@nextui-org/react';
import { Envelope, Info } from '@phosphor-icons/react';
import { View, ViewSwitch } from '@/components/ViewSwitch';
import { CultureQuestion as CultureQuestionType } from '@/services/Culture/type';
import { useFormContext, useFormState } from 'react-hook-form';
import { CultureQuestion } from './CultureQuestion';
import _ from 'lodash';
import { FormTextfield } from '@/components/Form/FormTextfield';

export enum CultureCardView {
  QUESTIONS = 'QUESTIONS',
  PRACTICES = 'PRACTICES',
  REQUEST = 'REQUEST',
}

type CultureCardType = {
  sectionIndex: number;
  title: string;
  description: string;
  themeColor: string;
  questions: CultureQuestionType[];
};

export const CultureCard = ({ sectionIndex, title, description, themeColor, questions }: CultureCardType) => {
  const name = `[${sectionIndex}]`;

  const { setValue, getValues, control } = useFormContext();
  const { errors } = useFormState({ control, name });
  const [currentIndices, setCurrentIndices] = useState([0, 0, 0]);
  const [viewState, setViewState] = useState(CultureCardView.QUESTIONS);

  const seperatedQuestions = useMemo(() => {
    const initialQuestions = questions.slice(0, 3);
    const otherQuestions = questions.slice(3);

    return [...Array(3)].map((_, i) => {
      const initialQuestion = initialQuestions[i];
      const start = 0 + i * 9;
      const end = 9 + i * 9;

      const values = otherQuestions.slice(start, end);

      return [initialQuestion, ...values];
    });
  }, [questions]);

  const onSliderChange = (questionIndex: number, value: number) => {
    setValue(`[${sectionIndex}].questions[${questionIndex}].answer`, value);
  };

  const onPageChange = (questionIndex: number, groupIndex: number) => {
    const newValue = [...currentIndices];
    newValue[groupIndex] = questionIndex;
    setCurrentIndices(newValue);
    const newQuestion = seperatedQuestions[groupIndex][questionIndex];
    setValue(`[${sectionIndex}].questions[${groupIndex}]`, newQuestion);
  };

  const onCallRequest = () => {
    setValue(`[${sectionIndex}].callRequest`, true);
    setViewState(CultureCardView.QUESTIONS);
  };

  const onQuestionSuggestion = () => {
    const value = getValues(`[${sectionIndex}].questionSuggestion`);

    if (!!value) {
      setViewState(CultureCardView.QUESTIONS);
    }
  };

  const errorMessage: any = !!_.get(errors, name)?.message ? _.get(errors, name)?.message : '';
  const isError = !!errorMessage;

  return (
    <Card className={cn('overflow-hidden border', isError && 'border border-red-500')} shadow='none'>
      <CardHeader className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <p style={{ color: themeColor }}>{title}</p>
          <Tooltip showArrow placement='top' content={description} color='default' className='w-full max-w-[400px]'>
            <Button className='bg-transparent p-0' isIconOnly>
              <Info size={18} className='cursor-pointer' color={themeColor} />
            </Button>
          </Tooltip>
        </div>

        {!!isError && (
          <div>
            {errorMessage.map((view: CultureCardView) => {
              const text = view === CultureCardView.REQUEST ? 'Send the Request' : 'Place Practices';

              return (
                <Button size='sm' color='secondary' variant='light' onClick={() => setViewState(view)}>
                  {text}
                </Button>
              );
            })}
          </div>
        )}
      </CardHeader>
      <Divider />
      <CardBody className='p-0'>
        <ViewSwitch selectedView={viewState}>
          <View value={CultureCardView.QUESTIONS}>
            {seperatedQuestions.map((values, idx) => {
              const questionIndex = currentIndices[idx];
              const question = values[questionIndex];

              return (
                <Fragment key={question.id}>
                  <CultureQuestion
                    name={`[${sectionIndex}].questions[${idx}].answer`}
                    text={question.text}
                    value={question.value}
                    total={values.length}
                    page={questionIndex}
                    themeColor={themeColor}
                    onSliderChange={(v) => onSliderChange(idx, v)}
                    onPageChange={(questionIndex) => onPageChange(questionIndex, idx)}
                  />
                  {idx !== currentIndices.length - 1 && <Divider />}
                </Fragment>
              );
            })}
          </View>

          <View value={CultureCardView.PRACTICES}>
            <div className='flex flex-col gap-6 p-6'>
              <div className='flex flex-col gap-[10px]'>
                <p>What are your company-related practices to enhance efficiency?</p>
                <FormTextfield
                  name={`[${sectionIndex}].questionSuggestion`}
                  placeholder='Establish the practices you follow in your company...'
                />
              </div>
              <div className='flex justify-end gap-2'>
                <Button
                  color='default'
                  variant='ghost'
                  onClick={() => setViewState(CultureCardView.QUESTIONS)}
                  className='w-full max-w-[100px]'
                >
                  Cancel
                </Button>
                <Button color='secondary' className='w-full max-w-[100px]' onClick={onQuestionSuggestion}>
                  Send
                </Button>
              </div>
            </div>
          </View>

          <View value={CultureCardView.REQUEST}>
            <div className='flex flex-col gap-6 px-5 py-6'>
              <div className='flex gap-[10px]'>
                <Envelope
                  weight='fill'
                  size={32}
                  color='#F5A524'
                  className='h-full w-full max-w-[32px] bg-orange-100 p-[6px]'
                />
                <p>
                  Your answer indicates a potential lack of alignment with key cultural values and practices that
                  promote efficiency. To improve in this area, we recommend conducting a thorough assessment of current
                  practices and cultural norms. Book a free call with one of our dedicated account managers to review
                  your overall company efficiency.
                </p>
              </div>
              <div className='flex justify-end gap-2'>
                <Button
                  color='default'
                  variant='ghost'
                  onClick={() => setViewState(CultureCardView.QUESTIONS)}
                  className='w-full max-w-[100px]'
                >
                  Cancel
                </Button>
                <Button color='secondary' className='w-full max-w-[183px]' onClick={onCallRequest}>
                  Send the Request
                </Button>
              </div>
            </div>
          </View>
        </ViewSwitch>
      </CardBody>
    </Card>
  );
};
