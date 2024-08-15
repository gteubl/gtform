/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';

import { CustomField } from '../../models';

export interface ControlConfig extends CustomField {
  enableMenu?: boolean | Observable<boolean>;
  inputs?: { [inputName: string]: any }; // Inputs
  outputs?: { [eventName: string]: (event: any) => void }; // Event handlers
}
