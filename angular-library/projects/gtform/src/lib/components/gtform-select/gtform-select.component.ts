import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ChoiceOption } from '../../models';
import { BaseControlValueAccessor } from '../base-control-value-accessor';

@Component({
  selector: 'gtform-select',
  templateUrl: './gtform-select.component.html',
  styleUrl: './gtform-select.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GtformSelectComponent),
      multi: true
    }]
})
export class GtformSelectComponent extends BaseControlValueAccessor<ChoiceOption | null> {
  @Input() public placeholder: string = '';
  @Input() public label: string = '';
  @Input() public disabled: boolean = false;
  @Input() public choiceOptions: ChoiceOption[] = [];

  public constructor() {
    super();
  }

  public override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public override writeValue(value: ChoiceOption | null): void {
    if (value !== null && this.choiceOptions.some(option => option.value === value.value)) {
      this.value = value;
    } else {
      this.value = null;
    }
  }
}
