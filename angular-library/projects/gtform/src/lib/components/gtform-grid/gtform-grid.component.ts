/* eslint-disable @typescript-eslint/no-explicit-any */
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';

import { GridDataSource } from 'app/library/form-grid/models/grid-data-source';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BehaviorSubject, filter, Subject, takeWhile } from 'rxjs';


import { GridColumns } from 'src/library/form-grid/models/grid-columns';
import { GridCellData } from 'src/library/form-grid/models/grid-data';
import { GridDataType } from 'src/library/form-grid/models/grid-data-type';
import { GridDataRequest } from 'src/library/form-grid/models/grid-data.request';
import { GridFooterInfo } from 'src/library/form-grid/models/grid-footer-info';
import { GridHeaderActionsButtons, GridHeaderConfig } from 'src/library/form-grid/models/grid-header-config';
import { GridRow } from 'src/library/form-grid/models/grid-row';
import { GridRowActions } from 'src/library/form-grid/models/grid-row.actions';
import { formatDateTimeToBRLocaleString, formatDateToBRLocaleString } from 'src/library/utils/utils';

@Component({
  selector: 'form-grid',
  templateUrl: './gtform-grid.component.html',
  styleUrls: ['./gtform-grid.component.scss']
})
export class GtformGridComponent<T> implements OnChanges, OnInit, OnDestroy {

  @Input() public magicFilter = '';
  @Input() public allowDrag = false;
  @Input() public dataSource: GridDataSource<T> | undefined;
  @Input() public gridColumns!: GridColumns[];
  @Input() public gridDataRequest: GridDataRequest = {
    skip: 0,
    take: 10,
    orderBy: undefined,
    orderDescending: undefined,
    columnsToFilter: undefined,
    magicFilter: null
  };
  @Input() public remoteDataSource = false;
  @Input() public gridRowActions: GridRowActions[] = [];
  @Input() public headerConfig: GridHeaderConfig = {
    showFilter: false,
    actionsButtons: []
  };
  @Input() public rowHover = true;
  @Input() public showFooter = false;
  @Input() public showNumber = false;
  @Input() public isSelectable = false;
  @Input() public enableActiveRow = false;
  @Input() public gridHeight = '100%';

  @Output() public gridDataRequestChanged = new EventEmitter<GridDataRequest>();
  @Output() public rowClicked = new EventEmitter<T>();
  @Output() public cellClicked = new EventEmitter<void>();
  @Output() public activeRowChanged = new EventEmitter<T | null>();
  @Output() public rowSelected = new EventEmitter<T[]>();

  @ViewChild('opRowAction') public contextMenu: OverlayPanel | undefined;
  public currentRow: GridRow | null = null;
  public activeRow: GridRow | null = null; //TODO Juntar con currentRow ?
  public dataArray = new BehaviorSubject<GridRow[]>([]);
  public columnsToFilter: GridColumns[] = [];
  public gridFooterInfo = new BehaviorSubject<GridFooterInfo>({
    totalItems: 0,
    page: 1,
    pageSize: this.gridDataRequest.take!,
    pageSizeOptions: [10, 25, 50, 100],
    pageIndex: 0,
    totalPages: 1
  });
  public showRowsActions = false;
  public sortColumn: string | null = null;
  public sortDirection: 'asc' | 'desc' | '' = '';
  public shouldSelectAll = false;
  public seletectedRows: GridRow[] = [];
  protected readonly GridDataType = GridDataType;
  private gridColumnsSubject = new BehaviorSubject<GridColumns[]>(this.gridColumns);
  public gridColumns$ = this.gridColumnsSubject.asObservable().pipe(
    filter(columns => columns.length > 0),
    take(1)
  );
  private gridDataRequestSubject = new Subject<GridDataRequest>();
  private isAlive = true;
  private isLoading = new BehaviorSubject<boolean>(true);
  public readonly isLoading$ = this.isLoading.asObservable();

  public ngOnChanges(changes: SimpleChanges): void {

    if (changes['dataSource']?.currentValue && this.dataSource && this.dataSource?.data.length > 0) {
      this.isLoading.next(false);
      this.gridFooterInfo.next({
        ...this.gridFooterInfo.value,
        totalItems: this.remoteDataSource ? this.dataSource.count : this.dataSource.data.length,
        totalPages: this.calculateTotalPages(this.remoteDataSource ? this.dataSource.count : this.dataSource.data.length, this.gridFooterInfo.value.pageSize)
      });

      this.populateGrid(this.dataSource.data);

    }

    if (changes['dataSource']?.currentValue && this.dataSource && this.dataSource?.data.length === 0) {
      this.isLoading.next(false);
      this.clearData();
    }

    if (changes['gridRowActions']?.currentValue) {
      this.showRowsActions = this.gridRowActions?.length > 0;
    }

    if (changes['gridColumns']?.currentValue) {
      this.gridColumnsSubject.next(this.gridColumns);
      this.columnsToFilter = this.gridColumns.filter(c => !c.filterNotAllowed);
    }

    if (changes['magicFilter']?.currentValue && this.magicFilter !== '') {
      this.applyFilter();
    }

  }

  public ngOnInit(): void {
    if (this.remoteDataSource) {
      this.gridDataRequestSubject.pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(500), takeWhile(() => this.isAlive))
        .subscribe(request => {
          this.isLoading.next(true);
          this.gridDataRequestChanged.emit(request);
        });
    } else {
      this.gridDataRequestSubject.pipe(
        filter(() => this.dataSource !== undefined && this.hasOffLinePagination()),
        takeWhile(() => this.isAlive))
        .subscribe(() => {
          this.applyFilter();
        });
    }
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }

  // Actions
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onActionClick(action: GridRowActions): void {
    action.action(this.currentRow!);
  }

  public onChangeRowSelected(row: GridRow): void {

    if (row.selected) {
      this.seletectedRows.push(row);
    } else {
      const index = this.seletectedRows.findIndex((r: any) => r.rawData.id == row.rawData.id);
      this.seletectedRows.splice(index, 1);
    }

    this.emitSelectedRows();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onClickRow(row: GridRow, cell: any): void {
    this.rowClicked.emit(row.rawData);
    this.cellClicked.emit(cell);

    if (this.enableActiveRow) {

      if (row.rawData.id == this.activeRow?.rawData?.id) {
        this.activeRowChanged.emit(null);
        this.activeRow = null;
        return;
      }

      this.activeRow = row;
      this.activeRowChanged.emit(row.rawData);
    }

  }

  public onClickRowSelectable(): void {
    const currentDataArray = this.dataArray.getValue();
    currentDataArray.forEach(row => row.selected = this.shouldSelectAll);
    this.dataArray.next(currentDataArray);
  }

  public onColumnFilterChange(column: GridColumns): void {

    if (this.shouldFilter(column)) {
      const index = this.columnsToFilter.findIndex(c => c.propertyName === column.propertyName);
      this.columnsToFilter.splice(index, 1);
    } else {
      this.columnsToFilter.push(column);
    }

  }

  public onDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.gridColumns, event.previousIndex, event.currentIndex);
    this.reorderDataArray(event);
  }

  public onFirstPage(): void {
    this.gridFooterInfo.next({
      ...this.gridFooterInfo.value,
      page: 1,
      pageIndex: 0
    });

    const newRequest = {
      ...this.gridDataRequest,
      skip: 0
    };
    this.gridDataRequest = newRequest;
    this.gridDataRequestSubject.next(newRequest);

  }

  public onLastPage(): void {
    this.gridFooterInfo.next({
      ...this.gridFooterInfo.value,
      page: this.gridFooterInfo.value.totalPages,
      pageIndex: this.gridFooterInfo.value.totalPages - 1
    });

    const newRequest = {
      ...this.gridDataRequest,
      skip: (this.gridFooterInfo.value.totalPages - 1) * this.gridFooterInfo.value.pageSize
    };
    this.gridDataRequest = newRequest;

    this.gridDataRequestSubject.next(newRequest);

  }

  public onMoreHeaderActionClick(action: GridHeaderActionsButtons): void {
    if (action.disabled) {
      return;
    }

    action.action();

  }

  public onNextPage(): void {
    this.gridFooterInfo.next({
      ...this.gridFooterInfo.value,
      page: this.gridFooterInfo.value.page + 1,
      pageIndex: this.gridFooterInfo.value.pageIndex + 1
    });

    const newRequest = {
      ...this.gridDataRequest,
      skip: this.gridFooterInfo.value.pageIndex * this.gridFooterInfo.value.pageSize
    };
    this.gridDataRequest = newRequest;

    this.gridDataRequestSubject.next(newRequest);
  }

  public onPreviousPage(): void {
    this.gridFooterInfo.next({
      ...this.gridFooterInfo.value,
      page: this.gridFooterInfo.value.page - 1,
      pageIndex: this.gridFooterInfo.value.pageIndex - 1
    });

    const newRequest = {
      ...this.gridDataRequest,
      skip: this.gridFooterInfo.value.pageIndex * this.gridFooterInfo.value.pageSize
    };
    this.gridDataRequest = newRequest;

    this.gridDataRequestSubject.next(newRequest);

  }

  public onSort(column: GridColumns): void {

    if (this.sortColumn === column.propertyName) {
      // Toggle sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.propertyName;
      this.sortDirection = 'asc';
    }

    if (this.remoteDataSource) {
      const newRequest = {
        ...this.gridDataRequest,
        orderBy: column.propertyName,
        orderDescending: this.sortDirection === 'desc'
      };

      this.gridDataRequest = newRequest;

      this.gridDataRequestSubject.next(newRequest);

      return;
    }
    this.sortOfflineData(column);

  }

  public get showHeader(): boolean {
    const actionsLength = this.headerConfig?.actionsButtons?.length ?? 0;
    const moreActionsLength = this.headerConfig?.moreActionsButtons?.length ?? 0;

    return (actionsLength > 0 || moreActionsLength > 0 || this.headerConfig?.showFilter) ?? false;
  }

  public actionBtnClicked(actionButton: GridHeaderActionsButtons): void {
    actionButton.action();
  }

  public applyFilter(): void {
    if (this.remoteDataSource) {
      const newRequest = {
        ...this.gridDataRequest,
        magicFilter: this.magicFilter,
        columnsToFilter: this.columnsToFilter.map(c => c.propertyName)
      };
      this.gridDataRequest = newRequest;

      // If using a remote data source, emit the filter details for the backend to handle
      if (this.magicFilter?.length > 0) {
        this.gridDataRequestSubject.next(newRequest);
      }

      return;
    }

    let filteredData: T[] = this.dataSource!.data;

    if (this.magicFilter) {
      const filterValue = this.magicFilter.toLowerCase();
      filteredData = this.dataSource!.data.filter((row: any) => {
        return this.columnsToFilter.some((column) => {
          const rawValue = this.getValueByPath(row, column.propertyName);
          const cellValue = this.manageValueAsString(rawValue, column.dataType).toLowerCase();
          return cellValue.includes(filterValue);
        });
      });
    }

    this.populateGrid(filteredData);

    this.gridFooterInfo.next({
      ...this.gridFooterInfo.value,
      totalItems: filteredData.length,
      totalPages: this.calculateTotalPages(filteredData.length, this.gridFooterInfo.value.pageSize)
    });

  }

  public changePageSize(page: number): void {
    this.gridFooterInfo.next({
      ...this.gridFooterInfo.value,
      pageSize: page,
      totalPages: this.calculateTotalPages(this.gridFooterInfo.value.totalItems, page)
    });

    const newRequest = {
      ...this.gridDataRequest,
      take: page
    };
    this.gridDataRequest = newRequest;

    this.gridDataRequestSubject.next(newRequest);
  }

  public emitSelectedRows(): void {
    if (this.dataSource) {
      // Filter selected rows before cleaning up properties
      const selectedRows = this.dataSource.data.filter((row: any) =>
        this.seletectedRows.some(selectedRow => selectedRow.rawData.id === row.id)
      );

      // Remove added properties from the selected rows
      const cleanedSelectedRows = this.dataSource.removeAddedProperties(selectedRows);

      this.rowSelected.emit(cleanedSelectedRows);
    }

  }

  public openContextMenu(event: MouseEvent, row: GridRow): void {
    event.preventDefault(); // Prevent the browser context menu
    this.currentRow = row;

    if (this.contextMenu) {
      this.contextMenu.toggle(event);
    }
  }

  public setCurrentRow(row: GridRow): void {
    this.currentRow = row;
  }

  public shouldFilter(column: GridColumns): boolean {
    return this.columnsToFilter.some(c => c.propertyName === column.propertyName);
  }

  private calculateTotalPages(totalItems: number, pageSize: number): number {
    return Math.ceil(totalItems / pageSize);
  }

  private clearData(): void {
    this.dataArray.next([]);
  }

  private getDataWithOfflinePagination(allData: T[]): T[] {
    return allData.slice(this.gridDataRequest.skip, this.gridDataRequest.skip! + this.gridDataRequest.take!);
  }

  private getValueByPath(obj: any, path: string): any {
    const keys = path.split('.');
    return keys.reduce((currentObject, key) => {
      return currentObject && currentObject[key] !== undefined ? currentObject[key] : undefined;
    }, obj);
  }

  private hasOffLinePagination(): boolean {
    return !this.remoteDataSource && this.showFooter;
  }

  private manageValueAsString(value: any, dataType: GridDataType): string {

    switch (dataType) {
    case GridDataType.DATE:
      return value ? formatDateToBRLocaleString(new Date(value)) : '';
    case GridDataType.DATETIME:
      return value ? formatDateTimeToBRLocaleString(new Date(value)) : '';
    case GridDataType.CHOICEOPTION:
      return value.description ?? '';
    default:
      return value.toString() ?? '';
    }
  }

  private normalizeValues(valueA: any, valueB: any, dataType: GridDataType): [any, any] {
    switch (dataType) {
    case GridDataType.STRING:
      valueA = valueA?.toString()
        .toLowerCase() ?? '';
      valueB = valueB?.toString()
        .toLowerCase() ?? '';
      break;
    case GridDataType.NUMBER:
      valueA = valueA ?? 0;
      valueB = valueB ?? 0;
      break;
    case GridDataType.DATE:
      valueA = valueA ? new Date(valueA) : new Date(0); // Use epoch if invalid
      valueB = valueB ? new Date(valueB) : new Date(0);
      break;
    case GridDataType.CHOICEOPTION:
      valueA = valueA.description ?? '';
      valueB = valueB.description ?? '';
      break;
    }
    return [valueA, valueB];
  }

  private populateColumns(array: T[]): void {
    this.clearData();

    const newArray: GridRow[] = [];

    array.forEach((row: any) => {
      const gridCellData: GridCellData[] = [];

      this.gridColumns.forEach(headerColumn => {
        const value = this.getValueByPath(row, headerColumn.propertyName);

        gridCellData.push({
          propertyName: headerColumn.propertyName,
          value: value,
          template: headerColumn.template,
          dataType: headerColumn.dataType,
          wrapText: headerColumn.wrapText
        });
      });
      const isRowSelected = this.seletectedRows.some((r: any) => r.rawData.id == row.id);

      newArray.push({
        cells: gridCellData,
        rawData: row,
        selected: row.selected || isRowSelected
      });
    });

    this.dataArray.next(newArray);
  }

  private populateGrid(array: T[]): void {
    if (this.hasOffLinePagination()) {
      const showingData = this.getDataWithOfflinePagination(array);
      this.populateColumns(showingData);
    } else {
      this.populateColumns(array);
    }
  }

  private reorderDataArray(event: CdkDragDrop<string[]>): void {

    const currentDataArray = this.dataArray.getValue();

    currentDataArray.forEach(row => {
      moveItemInArray(row.cells, event.previousIndex, event.currentIndex);
    });

    this.dataArray.next(currentDataArray);

    // Persist the new column order to the backend or localStorage  ?
  }

  private sortOfflineData(column: GridColumns): void {
    if (!this.sortColumn || this.sortDirection === '') {
      return;
    }

    const dataArray = this.dataSource?.data ?? [];

    dataArray.sort((a: T, b: T) => {
      let valueA = this.getValueByPath(a, this.sortColumn!);
      let valueB = this.getValueByPath(b, this.sortColumn!);

      if (column.dataType === GridDataType.CUSTOMTEMPLATE) {
        return 0; // Consider sorting based on another attribute if applicable
      }

      // Normalize data for comparison
      [valueA, valueB] = this.normalizeValues(valueA, valueB, column.dataType);

      // Comparison
      let comparison = 0;
      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    this.populateGrid(dataArray);

  }

}
