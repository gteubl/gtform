import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControlValueAccessor } from '../base-control-value-accessor/index';

@Component({
  selector: 'gtform-switch',
  templateUrl: './gtform-switch.component.html',
  styleUrl: './gtform-switch.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GtformSwitchComponent),
      multi: true
    }
  ]
})
export class GtformSwitchComponent extends BaseControlValueAccessor<boolean> {
  @Input() public label: string = '';
  @Input() public labelAbove: boolean = true;

  public toggle(): void {
    this.value = !this.value;
    this.onTouched();
  }
}
