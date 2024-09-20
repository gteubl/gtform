export class GridDataSourceRequest<T> {
  public skip: number;
  public take: number;
  public data?: T;

  public constructor(skip: number, take: number) {
    this.skip = skip;
    this.take = take;
  }
}
