import { Component, OnInit } from '@angular/core';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';

import { ChoiceOption } from 'src/api';
import { GridColumns } from 'src/library/form-grid/models/grid-columns';
import { GridDataSource } from 'src/library/form-grid/models/grid-data-source';
import { GridDataType } from 'src/library/form-grid/models/grid-data-type';
import { GridHeaderConfig } from 'src/library/form-grid/models/grid-header-config';
import { ModalDialogSizes } from 'src/library/models/modal-dialog-sizes';

export interface FormChipsModalData {
  options: ChoiceOption[];
  title: string;
// Selectors
  selectedOptions: ChoiceOption[];

}

@Component({
  selector: 'gtform-chips-modal',
  templateUrl: './gtform-chips-modal.component.html',
  styleUrl: './gtform-chips-modal.component.scss'
})
export class GtformChipsModalComponent implements OnInit {

  public gridColumns: GridColumns[] = [
    {
      propertyName: 'description',
      headerText: 'Descrição',
      dataType: GridDataType.STRING
      //  width: GridColumnSizeConstants.XLARGE

    }

  ];
  public headerConfig: GridHeaderConfig = {
    showFilter: true
  };
  protected readonly ModalDialogSizes = ModalDialogSizes;
  private gridDataSource = new BehaviorSubject(new GridDataSource<ChoiceOption>([], 0));
  public gridDataSource$ = this.gridDataSource.asObservable();

  public constructor(public dialogRef: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  public ngOnInit(): void {

    const gridDataSource = new GridDataSource<ChoiceOption>(this.config.data.options, this.config.data.options.length);
    this.selectedRows = this.config.data.selectedOptions;
    gridDataSource.populateSelected(this.config.data.selectedOptions);
    this.gridDataSource.next(gridDataSource);

  }

  // Actions
  public onRowSelected($event: ChoiceOption[]): void {
    this.selectedRows = $event;
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public confirm(): void {
    this.dialogRef.close(this.selectedRows);
  }

  // Selectors
  public selectedRows: ChoiceOption[] = [];
}
