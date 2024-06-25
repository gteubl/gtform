import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { FormOption } from '../../models';
import { BaseControlValueAccessor } from '../base-control-value-accessor';

@Component({
  selector: 'gtform-select',
  templateUrl: './gtform-select.component.html',
  styleUrl: './gtform-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GtformSelectComponent),
      multi: true
    }]
})
export class GtformSelectComponent extends BaseControlValueAccessor<FormOption | null> {
  @Input() public placeholder: string = '';
  @Input() public label: string = '';
  @Input() public disabled: boolean = false;
  @Input() public options: FormOption[] = [];

  public constructor() {
    super();
  }

  public override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public override writeValue(value: FormOption | null): void {
    console.log(`Select writeValue: ${this.label}`, value);
    if (value !== null && this.options.some(option => option.value === value.value)) {
      this.value = value;
    } else {
      this.value = null;
    }
  }
}
