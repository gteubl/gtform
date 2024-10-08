import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'gtform-dynamic-modal-container',
  templateUrl: './gtform-dynamic-modal-container.component.html',
  styleUrl: './gtform-dynamic-modal-container.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() }

})
export class GtformDynamicModalContainerComponent {
  @ViewChild('modalContainer', { read: ViewContainerRef, static: true }) public modalContainer!: ViewContainerRef;
}
