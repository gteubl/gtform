export class GridDataSource<T> {
  public skip: number;
  public take: number;
  public count: number;
  public data: T[];

  private idAdded: boolean[];
  private selectedAdded: boolean[];

  public constructor(data: T[], count: number = 0, skip: number = 0, take: number = 10) {
    this.idAdded = new Array(data.length).fill(false);
    this.selectedAdded = new Array(data.length).fill(false);

    this.data = data.map((item, index) => {
      const newItem = { ...item } as any;

      // Add id property, default to index + 1 if id doesn't exist
      if (!Object.prototype.hasOwnProperty.call(newItem, 'id')) {
        newItem.id = index + 1;
        this.idAdded[index] = true;
      }

      // Set selected property, default to false if selected doesn't exist
      if (!Object.prototype.hasOwnProperty.call(newItem, 'selected')) {
        newItem.selected = false;
        this.selectedAdded[index] = true;
      }

      return newItem;
    });
    this.count = count;
    this.skip = skip;
    this.take = take;
  }

  // Method to remove added properties
  public removeAddedProperties(items: T[]): T[] {
    return items.map((item, index) => {
      const newItem = { ...item } as any;

      if (this.idAdded[index]) {
        delete newItem.id;
      }

      if (this.selectedAdded[index]) {
        delete newItem.selected;
      }

      return newItem;
    });
  }

  // Method to populate selected property
  public populateSelected(selectedOptions: T[]): void {
    const selectedSet = new Set(selectedOptions.map(item => JSON.stringify(item)));

    this.data.forEach(item => {
      const itemAsObject = item as any;
      const cleanedItem = this.removeAddedProperties([item])[0];
      itemAsObject.selected = selectedSet.has(JSON.stringify(cleanedItem));
    });
  }
}
