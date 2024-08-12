import { CustomField } from '../../models';

export interface ControlConfig extends CustomField {
  enableMenu?: boolean;
  actionButtonIcon?: string;
  events?: { [eventName: string]: (event: any) => void }; // Event handlers
}
