import { GridRow } from './grid-row';

export interface GridRowActions {
  icon: string;
  text: string;
  action: (row: GridRow) => void;
  disabled?: boolean;
  show?: boolean;
}
