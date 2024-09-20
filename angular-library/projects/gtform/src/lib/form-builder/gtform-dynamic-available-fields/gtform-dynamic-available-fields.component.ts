import { Component, Input } from '@angular/core';

import { ComponentType } from '../../models/index';
import { GtformAvailableDynamicControls } from '../models/avalible-fields';
import { ControlConfig } from '../models/control-config';

@Component({
  selector: 'gtform-dynamic-available-fields',
  templateUrl: './gtform-dynamic-available-fields.component.html',
  styleUrl: './gtform-dynamic-available-fields.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class GtformDynamicAvailableFieldsComponent {

  public getIconForComponentType(componentType: ComponentType): string {

    switch (componentType) {
    case ComponentType.AutoComplete:
      return 'search';
    case ComponentType.CheckBox:
      return 'check_box';
    case ComponentType.InputDate:
      return 'date_range';
    case ComponentType.InputCurrency:
      return 'attach_money';
    case ComponentType.InputNumber:
      return 'format_list_numbered';
    case ComponentType.InputText:
      return 'text_fields';
    case ComponentType.TextArea:
      return 'text_format';
    case ComponentType.Select:
      return 'arrow_drop_down';
    case ComponentType.Switch:
      return 'toggle_on';
    case ComponentType.Chips:
      return 'label';
    default:
      return 'edit';
    }

  }

  //Default definitions
  @Input() public defaultStyle: string = 'gtform-col-6';
  @Input() public availableFields: ControlConfig[] = GtformAvailableDynamicControls.map(control => ({
    ...control,
    style: this.defaultStyle ?? 'gtform-col-6'
  }));

}
