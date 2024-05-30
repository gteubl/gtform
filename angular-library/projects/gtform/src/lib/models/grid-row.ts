/* eslint-disable @typescript-eslint/no-explicit-any */

import { GridCellData } from './grid-data';

export interface GridRow {
  cells: GridCellData[];
  rawData: any;
  selected: boolean;
}
