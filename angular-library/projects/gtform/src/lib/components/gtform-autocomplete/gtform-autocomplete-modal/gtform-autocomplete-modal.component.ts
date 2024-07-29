import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { ChoiceOption } from '../../../models';
import { GtformDynamicModalService, ModalSizes } from '../../gtform-dynamic-modal/index';
import { GridColumn, GridDataSource, GridDataType, GridHeaderConfig } from '../../gtform-grid';

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

  public gridColumns: GridColumn[] = [
    {
      propertyName: 'description',
      headerText: this.translateService.instant('DESCRIPTION'),
      dataType: GridDataType.STRING
    }
  ];

  public headerConfig: GridHeaderConfig = {
    showFilter: true
  };
  protected readonly ModalSizes = ModalSizes;
  private gridDataSource = new BehaviorSubject(new GridDataSource<ChoiceOption>([], 0));
  public gridDataSource$ = this.gridDataSource.asObservable();

  public constructor(private modalService: GtformDynamicModalService, private translateService: TranslateService) {
  }

  public ngOnInit(): void {
    this.gridDataSource.next(new GridDataSource<ChoiceOption>(this.modalService.config.data.options, this.modalService.config.data.options.length));
  }

  public closeDialog(): void {
    this.modalService.close(this);
  }

  public rowClicked($event: ChoiceOption): void {
    this.modalService.close(this, $event);

  }
}
