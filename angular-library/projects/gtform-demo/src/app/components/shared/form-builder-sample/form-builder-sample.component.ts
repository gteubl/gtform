import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

export interface Control {
  type: string;
  label: string;
  name: string;
  value: string;
  required?: boolean;
}

@Component({
  selector: 'app-form-builder-sample',
  templateUrl: './form-builder-sample.component.html',
  styleUrl: './form-builder-sample.component.scss'
})
export class FormBuilderSampleComponent {

  public controlsAvailable: Control[] = [
    {
      type: 'text',
      label: 'First Name',
      name: 'firstName',
      value: 'John',
      required: true
    }
  ];

  public formControls: Control[] = [
    {
      type: 'text',
      label: 'Last Name',
      name: 'lastName',
      value: 'Doe',
      required: true
    },
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      value: ''
    }
  ];

  public drop(event: CdkDragDrop<Control[]>): void {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.formControls.push(event.previousContainer.data[event.previousIndex]);
      /* transferArrayItem(
         event.previousContainer.data,
         event.container.data,
         event.previousIndex,
         event.currentIndex
       );*/
    }

  }

}
