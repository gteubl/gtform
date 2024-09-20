import { Component, Input } from '@angular/core';

@Component({
  selector: 'gtform-hbf-template',
  templateUrl: './gtform-hbf-template.component.html',
  styleUrl: './gtform-hbf-template.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class GtformHbfTemplateComponent {
  @Input() public overflow: boolean = true;

}
