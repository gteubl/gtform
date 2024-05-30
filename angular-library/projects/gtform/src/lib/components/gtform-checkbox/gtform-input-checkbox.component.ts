import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControlValueAccessor } from '../base-control-value-accessor/base-control-value-accessor';

@Component({
  selector: 'gtform-input-checkbox',
  templateUrl: './gtform-input-checkbox.component.html',
  styleUrl: './gtform-input-checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GtformInputCheckboxComponent),
      multi: true
    }]
})
export class GtformInputCheckboxComponent extends BaseControlValueAccessor<boolean> {
  @Input() public label: string = '';
  @Input() public labelAbove: boolean = true;
  @Input() public checked: boolean = false;
  @Input() public disabled: boolean = false;

  // Actions
  public onInput(value: Event): void {

    const input = value.target as HTMLInputElement;
    this.value = input.checked;
    this.onTouched();
  }

  public override writeValue(value: boolean): void {
    this.value = value;
    this.checked = value;
  }

}
