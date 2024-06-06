import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ChoiceOption, GridColumns, GridDataSource, GridDataType, GridHeaderConfig, ModalSizes } from '../../../models/index';

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
  protected readonly ModalDialogSizes = ModalSizes;
  private gridDataSource = new BehaviorSubject(new GridDataSource<ChoiceOption>([], 0));
  public gridDataSource$ = this.gridDataSource.asObservable();

  public ngOnInit(): void {

    // const gridDataSource = new GridDataSource<ChoiceOption>(this.config.data.options, this.config.data.options.length);
    // this.selectedRows = this.config.data.selectedOptions;
    // gridDataSource.populateSelected(this.config.data.selectedOptions);
    // this.gridDataSource.next(gridDataSource);
    console.log('empty');

  }

  // Actions
  public onRowSelected($event: ChoiceOption[]): void {
    this.selectedRows = $event;
  }

  public closeDialog(): void {
    // this.dialogRef.close();
  }

  public confirm(): void {
    // this.dialogRef.close(this.selectedRows);
  }

  // Selectors
  public selectedRows: ChoiceOption[] = [];
}
