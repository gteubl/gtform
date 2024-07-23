import { GridRow } from './grid-row';

export interface GridRowActions {
  icon: string;
  text: string;
  action: (row: GridRow) => void;
  disabled?: (row: GridRow) => boolean;
  show?: (row: GridRow) => boolean;
}
