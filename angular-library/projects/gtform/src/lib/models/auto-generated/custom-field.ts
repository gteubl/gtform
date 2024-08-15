/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Observable } from 'rxjs';

import type { ChoiceOption } from './choice-option';
import type { ComponentType } from './component-type';
import type { ComponentValueType } from './component-value-type';

export interface CustomField {
  id: string;
  fieldName: string;
  formControlName?: string;
  componentValueType: ComponentValueType;
  componentType: ComponentType;
  fieldValueAsString?: string;
  fieldLabel: string;
  style?: string;
  isRequired: boolean | Observable<boolean>;
  order: number;
  choiceOptions: ChoiceOption[] | Observable<ChoiceOption[]>;
}
