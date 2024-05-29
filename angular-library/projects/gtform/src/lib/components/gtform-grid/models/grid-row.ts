/* eslint-disable @typescript-eslint/no-explicit-any */
import {GridCellData} from 'app/library/form-grid/models/grid-data';

export interface GridRow {
  cells: GridCellData[];
  rawData: any;
  selected: boolean;
}
