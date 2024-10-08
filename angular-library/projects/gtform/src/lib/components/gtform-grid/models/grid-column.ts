/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateRef } from '@angular/core';

import { GridDataType } from './grid-data-type';

export interface GridColumn {
  propertyName: string;
  headerText: string;
  dataType: GridDataType;
  width?: string;
  filterNotAllowed?: boolean;
  template?: TemplateRef<any>;
  resizable?: boolean;
  wrapText?: boolean;
}
