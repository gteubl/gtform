/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { GtformDynamicFieldDirective } from '../directives/gtform-dynamic-field.directive';
import { ControlConfig } from '../models/control-config';
import { GtformDynamicFieldService } from '../services/gtform-dynamic-field.service';

@Component({
  selector: 'gtform-dynamic-field',
  templateUrl: './gtform-dynamic-field.component.html',
  styleUrl: './gtform-dynamic-field.component.scss'
})
export class GtformDynamicFieldComponent implements OnInit {

  @Input() public config!: ControlConfig;
  @ViewChild(GtformDynamicFieldDirective, { static: true }) public dynamicField!: GtformDynamicFieldDirective;
  //FormGroups
  @Input() public formGroup: FormGroup | undefined;

  public constructor(private fieldService: GtformDynamicFieldService) {
  }

  public ngOnInit(): void {
    const componentType = this.fieldService.getComponentForField(this.config.type) as Type<any>;
    const componentRef = this.dynamicField.viewContainerRef.createComponent(componentType);

    // Set up inputs dynamically
    Object.keys(this.config).forEach(input => {
      if (input !== 'type' && input !== 'events') {
        (componentRef.instance as any)[input] = this.config[input as keyof ControlConfig];
      }
    });

    // Attach form control and form group
    if (this.formGroup === undefined) {
      (componentRef.instance as any).formControlName = this.config.formControlName;
      (componentRef.instance as any).formGroup = this.formGroup;
    }

    // Attach event handlers if any
    if (this.config.events) {
      Object.keys(this.config.events).forEach(eventName => {
        const eventHandler = this.config.events![eventName];
        if (typeof eventHandler === 'function' && (componentRef.instance as any)[eventName]) {
          (componentRef.instance as any)[eventName].subscribe(eventHandler);
        }
      });
    }
  }
}
