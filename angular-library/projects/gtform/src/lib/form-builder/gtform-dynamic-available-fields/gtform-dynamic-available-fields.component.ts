import { Component, Input } from '@angular/core';

import { GtformAvailableDynamicControls } from '../models/avalible-fields';
import { ControlConfig } from '../models/control-config';

@Component({
  selector: 'gtform-dynamic-available-fields',
  templateUrl: './gtform-dynamic-available-fields.component.html',
  styleUrl: './gtform-dynamic-available-fields.component.scss'
})
export class GtformDynamicAvailableFieldsComponent {

  //Default definitions
  @Input() public defaultStyle: string = 'gtform-col-6';
  @Input() public availableFields: ControlConfig[] = GtformAvailableDynamicControls.map(control => ({
    ...control,
    style: this.defaultStyle ?? 'gtform-col-6'
  }));

}
