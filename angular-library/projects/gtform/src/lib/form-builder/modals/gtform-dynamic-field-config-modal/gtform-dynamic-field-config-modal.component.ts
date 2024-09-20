import { Component, Injector, OnInit } from '@angular/core';

import { GtformDynamicModalService } from '../../../components/gtform-dynamic-modal/index';
import { ChoiceOption, ComponentType } from '../../../models/index';
import { ControlConfig } from '../../models/control-config';

@Component({
  selector: 'gtform-gtform-dynamic-field-config-modal',
  templateUrl: './gtform-dynamic-field-config-modal.component.html',
  styleUrl: './gtform-dynamic-field-config-modal.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class GtformDynamicFieldConfigModalComponent implements OnInit {

  public data: ControlConfig | undefined;
  public showChoiceOptions: boolean = false;
  public componentSizeOptions: ChoiceOption[] = [
    { description: '1 Column (gtform-col-1)', value: 'gtform-col-1' },
    { description: '2 Columns (gtform-col-2)', value: 'gtform-col-2' },
    { description: '3 Columns (gtform-col-3)', value: 'gtform-col-3' },
    { description: '4 Columns (gtform-col-4)', value: 'gtform-col-4' },
    { description: '5 Columns (gtform-col-5)', value: 'gtform-col-5' },
    { description: '6 Columns (gtform-col-6)', value: 'gtform-col-6' },
    { description: '7 Columns (gtform-col-7)', value: 'gtform-col-7' },
    { description: '8 Columns (gtform-col-8)', value: 'gtform-col-8' },
    { description: '9 Columns (gtform-col-9)', value: 'gtform-col-9' },
    { description: '10 Columns (gtform-col-10)', value: 'gtform-col-10' },
    { description: '11 Columns (gtform-col-11)', value: 'gtform-col-11' },
    { description: '12 Columns (gtform-col-12)', value: 'gtform-col-12' }
  ];

  public choiceOptions: ChoiceOption[] = [];

  public constructor(private injector: Injector) {
  }

  public ngOnInit(): void {
    const modalService = this.injector.get(GtformDynamicModalService);
    this.data = { ...modalService.config.data as ControlConfig };
    this.evaluateChoiceOptions(this.data);
    console.log(this.data);
  }

  // Actions
  public onCancel(): void {
    const modalService = this.injector.get(GtformDynamicModalService);
    modalService.close(this, undefined);

  }

  public onSave(): void {
    const modalService = this.injector.get(GtformDynamicModalService);
    modalService.close(this, this.data);
  }

  public onStyleChange($event: ChoiceOption): void {
    this.data!.style = $event.value;

  }

  public evaluateChoiceOptions(config: ControlConfig | undefined): void {
    this.showChoiceOptions = !!config &&
      (config.componentType === ComponentType.AutoComplete || config.componentType === ComponentType.Select);
  }
}
