import { Injectable } from '@angular/core';

import { GtformAutocompleteComponent } from '../../components/gtform-autocomplete/index';
import { GtformInputCheckboxComponent } from '../../components/gtform-checkbox/index';
import { GtformChipsComponent } from '../../components/gtform-chips/index';
import { GtformInputDateComponent } from '../../components/gtform-input-date/index';
import { GtformInputTextComponent } from '../../components/gtform-input-text/index';
import { GtformSelectComponent } from '../../components/gtform-select/index';
import { GtformSwitchComponent } from '../../components/gtform-switch/index';
import { FieldRegistry } from '../models/field-registry';

@Injectable()
export class GtformDynamicFieldService {

  private fieldRegistry: FieldRegistry = {
    autocomplete: GtformAutocompleteComponent,
    checkbox: GtformInputCheckboxComponent,
    chips: GtformChipsComponent,
    date: GtformInputDateComponent,
    text: GtformInputTextComponent,
    currency: GtformInputTextComponent,
    email: GtformInputTextComponent,
    switch: GtformSwitchComponent,
    textarea: GtformInputTextComponent,
    select: GtformSelectComponent
  };

  public constructor() {
  }

  public getComponentForField<K extends keyof FieldRegistry>(fieldType: K): FieldRegistry[K] {
    return this.fieldRegistry[fieldType];
  }
}
