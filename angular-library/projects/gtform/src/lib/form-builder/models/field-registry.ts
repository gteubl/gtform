import { GtformAutocompleteComponent } from '../../components/gtform-autocomplete/index';
import { GtformInputCheckboxComponent } from '../../components/gtform-checkbox/index';
import { GtformChipsComponent } from '../../components/gtform-chips/index';
import { GtformInputDateComponent } from '../../components/gtform-input-date/index';
import { GtformInputTextComponent } from '../../components/gtform-input-text/index';
import { GtformSelectComponent } from '../../components/gtform-select/index';
import { GtformSwitchComponent } from '../../components/gtform-switch/index';

export interface FieldRegistry {
  autocomplete: typeof GtformAutocompleteComponent;
  checkbox: typeof GtformInputCheckboxComponent;
  chips: typeof GtformChipsComponent;
  date: typeof GtformInputDateComponent;
  text: typeof GtformInputTextComponent;
  currency: typeof GtformInputTextComponent;
  email: typeof GtformInputTextComponent;
  switch: typeof GtformSwitchComponent;
  textarea: typeof GtformInputTextComponent;
// Selectors
  select: typeof GtformSelectComponent;
}
