import {GridRow} from 'src/library/form-grid/models/grid-row';

export interface GridRowActions {
  icon: string;
  text: string;
  action: (row: GridRow) => void;
  disabled?: boolean;
}
