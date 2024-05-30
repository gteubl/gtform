// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface TableQueryParams {
  filter?: string;
  sortOrder?: 'asc' | 'desc';
  sortBy?: string;
  pageIndex?: number;
  pageSize?: number;
}

/*
@Injectable({
  providedIn: 'root',
})
export class TableDataService {

  constructor(private http: HttpClient) { }

  getTableData(params: TableQueryParams): Observable<any> {
    let queryParams = new HttpParams();
    if (params.filter) queryParams = queryParams.append('filter', params.filter);
    if (params.sortOrder) queryParams = queryParams.append('sortOrder', params.sortOrder);
    if (params.sortBy) queryParams = queryParams.append('sortBy', params.sortBy);
    if (params.pageIndex) queryParams = queryParams.append('pageIndex', params.pageIndex.toString());
    if (params.pageSize) queryParams = queryParams.append('pageSize', params.pageSize.toString());

    return this.http.get('/api/tabledata', { params: queryParams });
  }
}
* */
