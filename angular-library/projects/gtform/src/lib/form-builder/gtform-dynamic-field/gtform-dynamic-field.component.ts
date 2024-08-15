import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, Type, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { takeWhile } from 'rxjs/operators';

import { Observable } from 'rxjs';


import { GtformDynamicFieldDirective } from '../directives/gtform-dynamic-field.directive';
import { ControlConfig } from '../models/control-config';
import { GtformDynamicFieldService } from '../services/gtform-dynamic-field.service';

@Component({
  selector: 'gtform-dynamic-field',
  templateUrl: './gtform-dynamic-field.component.html'
})
export class GtformDynamicFieldComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public config!: ControlConfig;
  @ViewChild(GtformDynamicFieldDirective, { static: true }) public dynamicField!: GtformDynamicFieldDirective;
  private isAlive: boolean = true;
  private componentRef: any;
  //FormGroups
  @Input() public formGroup: FormGroup | undefined;

  public constructor(private fieldService: GtformDynamicFieldService) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.updateComponent();
    }
  }

  public ngOnInit(): void {
    this.createComponent();
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }

  private applyInputs(): void {
    if (this.config.inputs) {
      Object.keys(this.config.inputs).forEach(inputName => {
        const inputValue = this.config.inputs![inputName];

        if (inputValue instanceof Observable) {
          inputValue.pipe(takeWhile(() => this.isAlive)).subscribe(value => {
            (this.componentRef.instance as any)[inputName] = value;
          });
        } else {
          (this.componentRef.instance as any)[inputName] = inputValue;
        }
      });
    }
  }

  private applyStandardizedConfig(): void {
    const standardizedConfig = this.standardizeConfig(this.config);

    Object.keys(standardizedConfig).forEach(inputName => {
      const inputValue = standardizedConfig[inputName];

      if (inputValue instanceof Observable) {
        inputValue.pipe(takeWhile(() => this.isAlive)).subscribe(value => {
          (this.componentRef.instance as any)[inputName] = value;
        });
      } else {
        (this.componentRef.instance as any)[inputName] = inputValue;
      }
    });
  }

  private attachEventHandlers(): void {
    if (this.config.outputs) {
      Object.keys(this.config.outputs).forEach(eventName => {
        const eventHandler = this.config.outputs![eventName];
        if (typeof eventHandler === 'function' && (this.componentRef.instance as any)[eventName]) {
          (this.componentRef.instance as any)[eventName].pipe(takeWhile(() => this.isAlive)).subscribe(eventHandler);
        }
      });
    }
  }

  private attachFormControl(): void {
    if (this.formGroup) {
      (this.componentRef.instance as any).formControlName = this.config.formControlName;
      (this.componentRef.instance as any).formGroup = this.formGroup;
    }
  }

  private createComponent(): void {
    const componentType = this.fieldService.getComponentForField(this.config.componentType) as Type<any>;
    this.componentRef = this.dynamicField.viewContainerRef.createComponent(componentType);

    this.applyStandardizedConfig();
    this.applyInputs();
    this.attachFormControl();
    this.attachEventHandlers();
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

  private updateComponent(): void {
    if (this.componentRef) {
      // Update the component instance with the new config
      this.applyStandardizedConfig();
      this.applyInputs();
    }
  }
}
