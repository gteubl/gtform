export interface GridDataRequest{
  skip?: number;
  take?: number;
  orderBy?: string | null;
  orderDescending?: boolean;
  columnsToFilter?: Array<string> | null;
  magicFilter?: string | null;
}
