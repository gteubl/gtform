import { FieldRegistry } from './field-registry';

export interface ControlConfig {
  type: keyof FieldRegistry;  // Control type e.g., 'autocomplete', 'input', 'select'
  formControlName: string;
  label?: string;
  value?: string;
  required?: boolean;
  allOptions?: any[];  // For autocomplete or select controls
  enableMenu?: boolean;
  actionButtonIcon?: string;
  events?: { [eventName: string]: (event: any) => void }; // Event handlers
}
