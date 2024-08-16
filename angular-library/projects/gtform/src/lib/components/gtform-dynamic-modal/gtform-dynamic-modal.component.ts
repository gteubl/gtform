/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';

import { ModalConfig } from './models/modal-config';

@Component({
  selector: 'gtform-dynamic-modal',
  templateUrl: './gtform-dynamic-modal.component.html',
  styleUrls: ['./gtform-dynamic-modal.component.scss']
})
export class GtformDynamicModalComponent implements OnInit {
  @Input() public childComponent!: Type<any>;
  @Input() public config: ModalConfig = {};
  @Output() public closed = new EventEmitter<any>();
  @ViewChild('modalContainer', { read: ViewContainerRef, static: true }) public container!: ViewContainerRef;

  public ngOnInit(): void {
    const componentRef = this.container.createComponent(this.childComponent);

    if (componentRef.instance.config) {
      componentRef.instance.config = this.config;
    }
  }

  public close(): void {
    this.closed.emit(undefined);
  }

  public emitResult(result: any): void {
    this.closed.emit(result);
  }
}
