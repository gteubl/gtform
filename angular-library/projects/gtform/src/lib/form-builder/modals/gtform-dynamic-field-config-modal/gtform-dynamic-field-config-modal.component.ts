import { Component, Injector, OnInit } from '@angular/core';

import { GtformDynamicModalService } from '../../../components/gtform-dynamic-modal/index';
import { ChoiceOption, ComponentType } from '../../../models/index';
import { ControlConfig } from '../../models/control-config';

@Component({
  selector: 'gtform-gtform-dynamic-field-config-modal',
  templateUrl: './gtform-dynamic-field-config-modal.component.html',
  styleUrl: './gtform-dynamic-field-config-modal.component.scss'
})
export class GtformDynamicFieldConfigModalComponent implements OnInit {

  public data: ControlConfig | undefined;
  public showChoiceOptions: boolean = false;
  public componentSizeOptions: ChoiceOption[] = [
    { description: 'col-1', value: 'gtform-col-1' },
    { description: 'col-2', value: 'gtform-col-2' },
    { description: 'col-3', value: 'gtform-col-3' },
    { description: 'col-4', value: 'gtform-col-4' },
    { description: 'col-5', value: 'gtform-col-5' },
    { description: 'col-6', value: 'gtform-col-6' },
    { description: 'col-7', value: 'gtform-col-7' },
    { description: 'col-8', value: 'gtform-col-8' },
    { description: 'col-9', value: 'gtform-col-9' },
    { description: 'col-10', value: 'gtform-col-10' },
    { description: 'col-11', value: 'gtform-col-11' },
    { description: 'col-12', value: 'gtform-col-12' }
  ];

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
