import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ChoiceOption } from '../../../models';
import { GtformDynamicModalService, ModalSizes } from '../../gtform-dynamic-modal';
import { GridColumn, GridColumnSizeConstants, GridDataSource, GridDataType, GridHeaderConfig } from '../../gtform-grid';

export interface FormChipsModalData {
  options: ChoiceOption[];
  title: string;
// Selectors
  selectedOptions: ChoiceOption[];

}

@Component({
  selector: 'gtform-chips-modal',
  templateUrl: './gtform-chips-modal.component.html',
  styleUrl: './gtform-chips-modal.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class GtformChipsModalComponent implements OnInit {

  public gridColumns: GridColumn[] = [
    {
      propertyName: 'description',
      headerText: 'Descrição',
      dataType: GridDataType.STRING,
      width: GridColumnSizeConstants.XLARGE

    }

  ];
  public headerConfig: GridHeaderConfig = {
    showFilter: true
  };
  protected readonly ModalDialogSizes = ModalSizes;
  private gridDataSource = new BehaviorSubject(new GridDataSource<ChoiceOption>([], 0));
  public gridDataSource$ = this.gridDataSource.asObservable();

  public constructor(private modalService: GtformDynamicModalService) {
  }

  public ngOnInit(): void {
    const data = this.modalService.config.data as FormChipsModalData;
    const gridDataSource = new GridDataSource<ChoiceOption>(data.options, data.options.length);
    this.selectedRows = data.selectedOptions;
    gridDataSource.populateSelected(data.selectedOptions);
    this.gridDataSource.next(gridDataSource);

  }

  // Actions
  public onRowSelected($event: ChoiceOption[]): void {
    this.selectedRows = $event;
  }

  public closeDialog(): void {
    this.modalService.close(this);
  }

  public confirm(): void {
    this.modalService.close(this, this.selectedRows);
  }

  // Selectors
  public selectedRows: ChoiceOption[] = [];
}
