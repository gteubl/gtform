import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'gtform-accordion',
  templateUrl: './gtform-accordion.component.html',
  styleUrl: './gtform-accordion.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() },
  animations: [
    trigger('slideFade', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('500ms ease-in-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ height: '0', opacity: 0 }))
      ])
    ])
  ]
})
export class GtformAccordionComponent {
  @Input() public header: string = '';
  @Input() public opened = true;

  public toggle(): void {
    this.opened = !this.opened;
  }
}
