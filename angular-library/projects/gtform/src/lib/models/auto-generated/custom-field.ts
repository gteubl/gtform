/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import type { ComponentValueType } from "./component-value-type";
import type { ComponentType } from "./component-type";
import type { ChoiceOption } from "./choice-option";

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
