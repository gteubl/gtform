import { FieldRegistry } from './field-registry';

export interface ControlConfig {
  type: keyof FieldRegistry;
  formControlName: string;
  label?: string;
  value?: string;
  required?: boolean;
  allOptions?: any[];
  enableMenu?: boolean;
  actionButtonIcon?: string;
  events?: { [eventName: string]: (event: any) => void }; // Event handlers
}
