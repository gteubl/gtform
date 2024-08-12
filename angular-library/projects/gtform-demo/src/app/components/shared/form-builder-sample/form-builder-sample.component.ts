import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

import { ControlConfig } from '../../../../../../gtform/src/lib/form-builder/index';

@Component({
  selector: 'app-form-builder-sample',
  templateUrl: './form-builder-sample.component.html',
  styleUrl: './form-builder-sample.component.scss'
})
export class FormBuilderSampleComponent {

  public isEditEnabled: boolean = true;
  public controlsAvailable: ControlConfig[] = [
    {
      type: 'text',
      label: 'First Name',
      formControlName: 'firstName',
      value: 'John',
      required: true
    },
    {
      type: 'text',
      label: 'Last Name',
      formControlName: 'lastName',
      value: 'Doe',
      required: true
    },
    {
      type: 'email',
      label: 'Email',
      formControlName: 'email',
      value: ''
    },
    {
      type: 'text',
      label: 'Phone',
      formControlName: 'phone',
      value: ''
    }

  ];
  public formControls: ControlConfig[] = [
    {
      type: 'text',
      label: 'Address',
      formControlName: 'address',
      value: 'Doe',
      required: true
    },
    {
      type: 'text',
      label: 'Zip Code',
      formControlName: 'zipCode',
      value: ''
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
