export interface GridHeaderActionsButtons {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: () => any;
  disabled?: boolean;
  icon: string;
  tooltip?: string;
}

export interface GridHeaderMoreActions {
  icon: string;
  moreActions: GridHeaderActionsButtons[];
  tooltip?: string;
}

export interface GridHeaderConfig {
  actionsButtons?: GridHeaderActionsButtons[];
  moreActionsButtons?: GridHeaderMoreActions[];
  showFilter?: boolean;
}
