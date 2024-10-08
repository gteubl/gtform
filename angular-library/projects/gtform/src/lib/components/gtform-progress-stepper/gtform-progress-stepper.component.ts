import { Component, Input } from '@angular/core';

@Component({
  selector: 'gtform-progress-stepper',
  templateUrl: './gtform-progress-stepper.component.html',
  styleUrl: './gtform-progress-stepper.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class GtformProgressStepperComponent {
  @Input() public breadcrumbs: { label: string }[] = [];
  @Input() public currentStep: number = 0;
}
