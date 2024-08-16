import { GridRow } from './grid-row';

export interface GridRowStyles {
  backgroundColor?: (row: GridRow) => string | null;
  color?: (row: GridRow) => string | null;
  fontWeight?: (row: GridRow) => string | null;
  fontStyle?: (row: GridRow) => string | null;
}
