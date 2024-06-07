import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR}            from '@angular/forms';

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

  public selectedOptionValue: string | null = null;

  public constructor() {
    super();
  }

  public override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;

    // This approach remains unchanged; it's concise and does the job well.
    const selectedOption = this.options.find(option => option.value.toString() === value);
    this.writeValue(selectedOption ?? null);

  }

  public override writeValue(value: FormOption | null): void {
    if (value !== null && this.options.some(option => option.value === value.value)) {
      //this.innerValue = value;
      this.value = value;
      // Update a new property to store the selected option's value as a string
      this.selectedOptionValue = value.value.toString();
    } else {
      this.value = null;
      // this.value = null;
      //this.innerValue = null;
      this.selectedOptionValue = null; // Or a default value, as appropriate
    }
  }

}
