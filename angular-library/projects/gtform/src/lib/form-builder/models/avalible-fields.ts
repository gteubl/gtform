import { ComponentType, ComponentValueType } from '../../models/index';

import { ControlConfig } from './control-config';

export const GtformAvailableDynamicControls: ControlConfig[] = [
  {
    id: '1',
    fieldName: 'AutoComplete',
    componentValueType: ComponentValueType.ChoiceOptions,
    componentType: ComponentType.AutoComplete,
    fieldLabel: 'Auto Complete',
    isRequired: false,
    order: 1,
    choiceOptions: []
  },
  {
    id: '2',
    fieldName: 'CheckBox',
    componentValueType: ComponentValueType.Boolean,
    componentType: ComponentType.CheckBox,
    fieldLabel: 'CheckBox',
    isRequired: false,
    order: 2,
    choiceOptions: []
  },
  {
    id: '3',
    fieldName: 'Chips',
    componentValueType: ComponentValueType.ArrayChoiceOptions,
    componentType: ComponentType.Chips,
    fieldLabel: 'Chips',
    isRequired: false,
    order: 3,
    choiceOptions: []
  },
  {
    id: '4',
    fieldName: 'InputDate',
    componentValueType: ComponentValueType.Date,
    componentType: ComponentType.InputDate,
    fieldLabel: 'InputDate',
    isRequired: false,
    order: 4,
    choiceOptions: []
  },
  {
    id: '6',
    fieldName: 'InputCurrency',
    componentValueType: ComponentValueType.String,
    componentType: ComponentType.InputCurrency,
    fieldLabel: 'InputCurrency',
    isRequired: false,
    order: 6,
    choiceOptions: []
  },
  {
    id: '7',
    fieldName: 'InputNumber',
    componentValueType: ComponentValueType.Integer,
    componentType: ComponentType.InputNumber,
    fieldLabel: 'InputNumber',
    isRequired: false,
    order: 7,
    choiceOptions: []
  },
  {
    id: '8',
    fieldName: 'Switch',
    componentValueType: ComponentValueType.Boolean,
    componentType: ComponentType.Switch,
    fieldLabel: 'Switch',
    isRequired: false,
    order: 8,
    choiceOptions: []
  },
  {
    id: '9',
    fieldName: 'TextArea',
    componentValueType: ComponentValueType.String,
    componentType: ComponentType.TextArea,
    fieldLabel: 'TextArea',
    isRequired: false,
    order: 9,
    choiceOptions: []
  },
  {
    id: '10',
    fieldName: 'Select',
    componentValueType: ComponentValueType.String,
    componentType: ComponentType.Select,
    fieldLabel: 'Select',
    isRequired: false,
    order: 10,
    choiceOptions: []
  }

];
