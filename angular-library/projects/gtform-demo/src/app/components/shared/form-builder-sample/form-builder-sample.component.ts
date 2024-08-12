import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

import { ControlConfig } from '../../../../../../gtform/src/lib/form-builder/index';
import { ComponentType, ComponentValueType } from '../../../../../../gtform/src/lib/models/index';

@Component({
  selector: 'app-form-builder-sample',
  templateUrl: './form-builder-sample.component.html',
  styleUrl: './form-builder-sample.component.scss'
})
export class FormBuilderSampleComponent {

  public isEditEnabled: boolean = true;
  public controlsAvailable: ControlConfig[] = [
    {
      id: '1',
      fieldName: 'firstName',
      formControlName: 'firstName',
      componentValueType: ComponentValueType.String,
      componentType: ComponentType.InputText,
      fieldValueAsString: 'John',
      fieldLabel: 'First Name',
      isRequired: true,
      order: 1,
      choiceOptions: [],
      style: 'gtform-col-6'
    },
    {
      id: '2',
      fieldName: 'lastName',
      formControlName: 'lastName',
      componentValueType: ComponentValueType.String,
      componentType: ComponentType.InputText,
      fieldValueAsString: 'Doe',
      fieldLabel: 'Last Name',
      isRequired: true,
      order: 2,
      choiceOptions: [],
      style: 'gtform-col-6'
    },
    {
      id: '3',
      fieldName: 'email',
      formControlName: 'email',
      componentValueType: ComponentValueType.String,
      componentType: ComponentType.InputText,
      fieldValueAsString: '',
      fieldLabel: 'Email',
      isRequired: true,
      order: 3,
      choiceOptions: [],
      style: 'gtform-col-6'
    }
  ];
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

  public drop(event: CdkDragDrop<ControlConfig[]>): void {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.formControls.splice(event.currentIndex, 0, event.previousContainer.data[event.previousIndex]);
    }

  }

  public removeControlFromFormControls(control: ControlConfig): void {
    this.formControls = this.formControls.filter(item => item !== control);
  }

  public toggleEdit(): void {
    this.isEditEnabled = !this.isEditEnabled;
  }

}
