import { Injectable } from '@angular/core';

import { GtformAutocompleteComponent } from '../../components/gtform-autocomplete/index';
import { GtformInputDateComponent } from '../../components/gtform-input-date/index';
import { GtformInputTextComponent } from '../../components/gtform-input-text/index';
import { GtformSelectComponent } from '../../components/gtform-select/index';
import { FieldRegistry } from '../models/field-registry';

@Injectable()
export class GtformDynamicFieldService {

  private fieldRegistry: FieldRegistry = {
    autocomplete: GtformAutocompleteComponent,
    date: GtformInputDateComponent,
    text: GtformInputTextComponent,
    select: GtformSelectComponent,
    email: GtformInputTextComponent
  };

  public constructor() {
  }

  public getComponentForField<K extends keyof FieldRegistry>(fieldType: K): FieldRegistry[K] {
    return this.fieldRegistry[fieldType];
  }
}
