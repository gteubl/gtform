import { Component, OnInit } from '@angular/core';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';

import { ChoiceOption } from 'src/api';
import { GridColumns } from 'src/library/form-grid/models/grid-columns';
import { GridDataSource } from 'src/library/form-grid/models/grid-data-source';
import { GridDataType } from 'src/library/form-grid/models/grid-data-type';
import { GridHeaderConfig } from 'src/library/form-grid/models/grid-header-config';
import { ModalDialogSizes } from 'src/library/models/modal-dialog-sizes';

export interface FormAutocompleteModalData {
  options: ChoiceOption[];
  title: string;
}

@Component({
  selector: 'gtform-autocomplete-modal',
  templateUrl: './gtform-autocomplete-modal.component.html',
  styleUrl: './gtform-autocomplete-modal.component.scss'
})
export class GtformAutocompleteModalComponent implements OnInit {

  public gridColumns: GridColumns[] = [
    {
      propertyName: 'description',
      headerText: 'Descrição',
      dataType: GridDataType.STRING
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
    this.gridDataSource.next(new GridDataSource<ChoiceOption>(this.config.data.options, this.config.data.options.length));
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public rowClicked($event: ChoiceOption): void {
    this.dialogRef.close($event);

  }
}
