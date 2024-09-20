import { Component } from '@angular/core';

@Component({
  selector: 'gtform-spinner',
  templateUrl: './gtform-spinner.component.html',
  styleUrl: './gtform-spinner.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class GtformSpinnerComponent {

}
