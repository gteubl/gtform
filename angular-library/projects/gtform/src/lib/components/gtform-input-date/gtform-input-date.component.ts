import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControlValueAccessor } from '../base-control-value-accessor';

@Component({
  selector: 'gtform-input-date',
  templateUrl: './gtform-input-date.component.html',
  styleUrl: './gtform-input-date.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GtformInputDateComponent),
      multi: true
    }]
})
export class GtformInputDateComponent extends BaseControlValueAccessor<string> {
  @Input() public placeholder: string = '';
  @Input() public label: string = '';
  @Input() public disabled: boolean = false;

  // Actions
  public onInput(value: Event): void {

    if (!value) return;

    const input = value.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(input.value);
    this.onTouched();
  }

  public override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
