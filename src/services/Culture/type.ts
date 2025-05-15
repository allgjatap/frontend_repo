export type CultureQuestion = {
  id: string;
  text: string;
  value: string;
};

export type CultureSection = {
  id: string;
  name: string;
  description: string;
  themeColor: string;
  questions: CultureQuestion[];
};

export type Culture = CultureSection;

export type UpdateCultureParams = (CultureSection & { questionSuggestion?: string; callRequest?: boolean })[];
