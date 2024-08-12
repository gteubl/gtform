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
    const componentType = this.fieldService.getComponentForField(this.config.componentType) as Type<any>;
    const componentRef = this.dynamicField.viewContainerRef.createComponent(componentType);

    // Standardize and set up inputs dynamically
    const standardizedConfig = this.standardizeConfig(this.config);

    // Apply the standardized configuration to the component instance
    Object.keys(standardizedConfig).forEach(input => {
      (componentRef.instance as any)[input] = standardizedConfig[input];
    });

    // Attach form control and form group if available
    if (this.formGroup) {
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

  private standardizeConfig(config: ControlConfig): { [key: string]: any } {
    const standardizedConfig: { [key: string]: any } = {
      value: config.fieldValueAsString,
      label: config.fieldLabel,
      required: config.isRequired,
      allOptions: config.choiceOptions
    };

    const standardProperties = [
      'fieldValueAsString',
      'fieldLabel',
      'isRequired',
      'choiceOptions',
      'componentType',
      'events'
    ];

    Object.keys(config).forEach(key => {
      if (!standardProperties.includes(key)) {
        standardizedConfig[key] = config[key as keyof ControlConfig];
      }
    });

    return standardizedConfig;
  }
}
