/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, takeWhile } from 'rxjs';

import { ComponentType } from '../../models/index';
import { GtformDynamicFieldDirective } from '../directives/gtform-dynamic-field.directive';
import { ControlConfig } from '../models/control-config';
import { GtformDynamicFieldService } from '../services/gtform-dynamic-field.service';

@Component({
  selector: 'gtform-dynamic-field',
  templateUrl: './gtform-dynamic-field.component.html',
  styleUrl: './gtform-dynamic-field.component.scss'
})
export class GtformDynamicFieldComponent implements OnInit, OnDestroy {

  @Input() public config!: ControlConfig;
  @ViewChild(GtformDynamicFieldDirective, { static: true }) public dynamicField!: GtformDynamicFieldDirective;
  private isAlive: boolean = true;
  //FormGroups
  @Input() public formGroup: FormGroup | undefined;

  public constructor(private fieldService: GtformDynamicFieldService) {
  }

  public ngOnInit(): void {
    const componentType = this.fieldService.getComponentForField(this.config.componentType) as Type<any>;
    const componentRef = this.dynamicField.viewContainerRef.createComponent(componentType);

    // Standardize and set up inputs dynamically
    const standardizedConfig = this.standardizeConfig(this.config);

    // Apply the standardized configuration to the component instance, checking for observables
    Object.keys(standardizedConfig).forEach(inputName => {
      const inputValue = standardizedConfig[inputName];

      if (inputValue instanceof Observable) {
        // Subscribe to the observable and assign the emitted value
        inputValue.pipe(takeWhile(() => this.isAlive)).subscribe(value => {
          (componentRef.instance as any)[inputName] = value;
        });
      } else {
        // Directly assign the value if it's not an observable
        (componentRef.instance as any)[inputName] = inputValue;
      }
    });

    // Apply inputs if available
    if (this.config.inputs) {
      Object.keys(this.config.inputs).forEach(inputName => {
        const inputValue = this.config.inputs![inputName];

        // Check if the input is an Observable
        if (inputValue instanceof Observable) {
          inputValue.pipe(takeWhile(() => this.isAlive)).subscribe(value => {
            (componentRef.instance as any)[inputName] = value;
          });
        } else {
          (componentRef.instance as any)[inputName] = inputValue;
        }
      });
    }

    // Handle specific component types
    if (this.config.componentType === ComponentType.InputCurrency) {
      (componentRef.instance as any).formatType = 'currency';
    }

    if (this.config.componentType === ComponentType.InputNumber) {
      (componentRef.instance as any).formatType = 'numbers';
    }

    // Attach form control and form group if available
    if (this.formGroup) {
      (componentRef.instance as any).formControlName = this.config.formControlName;
      (componentRef.instance as any).formGroup = this.formGroup;
    }

    // Attach event handlers if any
    if (this.config.outputs) {
      Object.keys(this.config.outputs).forEach(eventName => {
        const eventHandler = this.config.outputs![eventName];
        if (typeof eventHandler === 'function' && (componentRef.instance as any)[eventName]) {
          (componentRef.instance as any)[eventName].pipe(takeWhile(() => this.isAlive)).subscribe(eventHandler);
        }
      });
    }
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }

  private standardizeConfig(config: ControlConfig): { [key: string]: any } {
    const standardizedConfig: { [key: string]: any } = {
      value: config.fieldValueAsString,
      label: config.fieldLabel,
      required: config.isRequired
    };

    const standardProperties = [
      'fieldValueAsString',
      'fieldLabel',
      'isRequired',
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
