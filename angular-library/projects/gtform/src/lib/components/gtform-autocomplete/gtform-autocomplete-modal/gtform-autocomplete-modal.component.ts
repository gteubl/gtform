import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ChoiceOption, ModalDialogSizes } from '../../../models/index';
import { GridColumns, GridDataSource, GridDataType, GridHeaderConfig } from '../../gtform-grid/index';


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

  public constructor() {
  }

  public ngOnInit(): void {
  //  this.gridDataSource.next(new GridDataSource<ChoiceOption>(this.config.data.options, this.config.data.options.length));
  }

  public closeDialog(): void {
    //this.dialogRef.close();
  }

  public rowClicked($event: ChoiceOption): void {
    //this.dialogRef.close($event);

  }
}
