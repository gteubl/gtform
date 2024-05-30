export interface FormOption {
  value: number | string;
  description: string;
}

export const blankChoiceOption: FormOption = {
  value: -1,
  description: '',
};
