import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

import { GtformDynamicModalService, ModalSizes } from '../../../../../../gtform/src/lib/components/gtform-dynamic-modal/index';
import {
  ControlConfig,
  GtformAvailableDynamicControls,
  GtformDynamicFieldConfigModalComponent
} from '../../../../../../gtform/src/lib/form-builder/index';
import { ComponentType, ComponentValueType } from '../../../../../../gtform/src/lib/models/index';

@Component({
  selector: 'app-form-builder-sample',
  templateUrl: './form-builder-sample.component.html',
  styleUrl: './form-builder-sample.component.scss'
})
export class FormBuilderSampleComponent {

  public isEditEnabled: boolean = true;
  public controlsAvailable: ControlConfig[] = GtformAvailableDynamicControls.map(control => ({
    ...control,
    style: 'gtform-col-6'
  }));
  public formControls: ControlConfig[] = [
    {
      id: '4',
      fieldName: 'phone',
      formControlName: 'phone',
      componentValueType: ComponentValueType.String,
      componentType: ComponentType.InputText,
      fieldValueAsString: '',
      fieldLabel: 'Phone',
      isRequired: true,
      order: 4,
      choiceOptions: [],
      style: 'gtform-col-12'
    },
    {
      id: '5',
      fieldName: 'address',
      formControlName: 'address',
      componentValueType: ComponentValueType.String,
      componentType: ComponentType.InputText,
      fieldValueAsString: '',
      fieldLabel: 'Address',
      isRequired: true,
      order: 5,
      choiceOptions: [],
      style: 'gtform-col-6'
    }

  ];

  public constructor(private modalService: GtformDynamicModalService) {
  }

  public drop(event: CdkDragDrop<ControlConfig[]>): void {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const component = this.controlsAvailable.find(control => control.id === event.previousContainer.data[event.previousIndex].id);

      const ref = this.modalService.open(GtformDynamicFieldConfigModalComponent, {
        title: 'Dynamic Modal',
        style: { ...ModalSizes.small },
        data: component
      });

      ref.closed.subscribe((result: any) => {
        console.log('Modal closed with:', result);
        if (result) {
          // this.formControls.splice(event.currentIndex, 0, event.previousContainer.data[event.previousIndex]);
          this.formControls.splice(event.currentIndex, 0, result);
        }

      });

    }

  }

  public removeControlFromFormControls(control: ControlConfig): void {
    this.formControls = this.formControls.filter(item => item !== control);
  }

  public toggleEdit(): void {
    this.isEditEnabled = !this.isEditEnabled;
  }

}
