export enum InputType {
  INPUT = 'INPUT',
  EMAIL = 'EMAIL',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  TEXTAREA = 'TEXTAREA',
  SELECT = 'SELECT',
  MULTISELECT = 'MULTISELECT',
}

export type Step = {
  id: string;
  name: string;
};

export type Question = {
  id: string;
  title: string;
  description?: string;
  placeholder?: string;
  type: InputType;
  order: number;
  values?: string[];
  answer?: any;
  stepId: string;
  parentQuestionId: string;
  parentValue: any;
};

export type SubmitOnboarding = {
  questionId: string;
  answer: any;
}[];
