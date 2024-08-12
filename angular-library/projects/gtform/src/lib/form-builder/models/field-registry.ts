import { GtformAutocompleteComponent } from '../../components/gtform-autocomplete/index';
import { GtformInputDateComponent } from '../../components/gtform-input-date/index';
import { GtformInputTextComponent } from '../../components/gtform-input-text/index';
import { GtformSelectComponent } from '../../components/gtform-select/index';

export interface FieldRegistry {
  autocomplete: typeof GtformAutocompleteComponent;
  date: typeof GtformInputDateComponent;
  text: typeof GtformInputTextComponent;
  email: typeof GtformInputTextComponent;
// Selectors
  select: typeof GtformSelectComponent;
  // Add other components as needed
}
