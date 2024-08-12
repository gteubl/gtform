/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Type } from '@angular/core';

import { GtformAutocompleteComponent } from '../../components/gtform-autocomplete/index';
import { GtformInputCheckboxComponent } from '../../components/gtform-checkbox/index';
import { GtformChipsComponent } from '../../components/gtform-chips/index';
import { GtformInputDateComponent } from '../../components/gtform-input-date/index';
import { GtformInputTextComponent } from '../../components/gtform-input-text/index';
import { GtformSelectComponent } from '../../components/gtform-select/index';
import { GtformSwitchComponent } from '../../components/gtform-switch/index';
import { ComponentType } from '../../models/index';

@Injectable()
export class GtformDynamicFieldService {

  private componentRegistry: { [key in ComponentType]: Type<any> } = {
    [ComponentType.AutoComplete]: GtformAutocompleteComponent,
    [ComponentType.CheckBox]: GtformInputCheckboxComponent,
    [ComponentType.Chips]: GtformChipsComponent,
    [ComponentType.InputDate]: GtformInputDateComponent,
    [ComponentType.InputText]: GtformInputTextComponent,
    [ComponentType.InputCurrency]: GtformInputTextComponent,
    [ComponentType.InputNumber]: GtformInputTextComponent,
    [ComponentType.Switch]: GtformSwitchComponent,
    [ComponentType.TextArea]: GtformInputTextComponent,
    [ComponentType.Select]: GtformSelectComponent
  };

  public constructor() {
  }

  public getComponentForField(fieldType: ComponentType): Type<any> {
    return this.componentRegistry[fieldType];
  }
}
