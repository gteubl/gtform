import { Component, Input } from '@angular/core';

import { ComponentType, ComponentValueType } from '../../models/index';
import { ControlConfig } from '../models/control-config';

@Component({
  selector: 'gtform-gtform-dynamic-available-fields',
  templateUrl: './gtform-dynamic-available-fields.component.html',
  styleUrl: './gtform-dynamic-available-fields.component.scss'
})
export class GtformDynamicAvailableFieldsComponent {
//Default definitions
  @Input() public defaultStyle: string = 'gtform-col-6';

  public availableFields: ControlConfig[] = [
    {
      id: '1',
      fieldName: 'AutoComplete',
      componentValueType: ComponentValueType.ChoiceOptions,
      componentType: ComponentType.AutoComplete,
      fieldLabel: 'Auto Complete',
      isRequired: false,
      order: 1,
      choiceOptions: [],
      style: this.defaultStyle
    },
    {
      id: '2',
      fieldName: 'CheckBox',
      componentValueType: ComponentValueType.Boolean,
      componentType: ComponentType.CheckBox,
      fieldLabel: 'CheckBox',
      isRequired: false,
      order: 2,
      choiceOptions: [],
      style: this.defaultStyle
    },
    {
      id: '3',
      fieldName: 'Chips',
      componentValueType: ComponentValueType.ArrayChoiceOptions,
      componentType: ComponentType.Chips,
      fieldLabel: 'Chips',
      isRequired: false,
      order: 3,
      choiceOptions: [],
      style: this.defaultStyle
    },
    {
      id: '4',
      fieldName: 'InputDate',
      componentValueType: ComponentValueType.Date,
      componentType: ComponentType.InputDate,
      fieldLabel: 'InputDate',
      isRequired: false,
      order: 4,
      choiceOptions: [],
      style: this.defaultStyle
    },
    {
      id: '6',
      fieldName: 'InputCurrency',
      componentValueType: ComponentValueType.String,
      componentType: ComponentType.InputCurrency,
      fieldLabel: 'InputCurrency',
      isRequired: false,
      order: 6,
      choiceOptions: [],
      style: this.defaultStyle
    },
    {
      id: '7',
      fieldName: 'InputNumber',
      componentValueType: ComponentValueType.Integer,
      componentType: ComponentType.InputNumber,
      fieldLabel: 'InputNumber',
      isRequired: false,
      order: 7,
      choiceOptions: [],
      style: this.defaultStyle
    },
    {
      id: '8',
      fieldName: 'Switch',
      componentValueType: ComponentValueType.Boolean,
      componentType: ComponentType.Switch,
      fieldLabel: 'Switch',
      isRequired: false,
      order: 8,
      choiceOptions: [],
      style: this.defaultStyle
    },
    {
      id: '9',
      fieldName: 'TextArea',
      componentValueType: ComponentValueType.String,
      componentType: ComponentType.TextArea,
      fieldLabel: 'TextArea',
      isRequired: false,
      order: 9,
      choiceOptions: [],
      style: this.defaultStyle
    },
    {
      id: '10',
      fieldName: 'Select',
      componentValueType: ComponentValueType.String,
      componentType: ComponentType.Select,
      fieldLabel: 'Select',
      isRequired: false,
      order: 10,
      choiceOptions: [],
      style: this.defaultStyle
    }

  ];

}
