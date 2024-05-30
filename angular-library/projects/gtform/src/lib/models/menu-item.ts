export interface MenuItem {
  label?: string;
  icon?: string;
  tooltip?: string;
  command?(): void;
}
