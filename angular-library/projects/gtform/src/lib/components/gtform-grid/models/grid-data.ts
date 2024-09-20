/* eslint-disable @typescript-eslint/no-explicit-any */
import {TemplateRef} from '@angular/core';

import { GridDataType } from './grid-data-type';



export interface GridData {
  propertyName: string;
  value: string | number | boolean;
  template?: TemplateRef<any>;
}

export interface GridCellData extends GridData {
  dataType: GridDataType;
  wrapText?: boolean;
}
