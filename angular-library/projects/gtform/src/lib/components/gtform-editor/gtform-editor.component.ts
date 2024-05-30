import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { Subject, takeWhile } from 'rxjs';
import { BaseControlValueAccessor } from '../base-control-value-accessor/base-control-value-accessor';



@Component({
  selector: 'gtform-editor',
  templateUrl: './gtform-editor.component.html',
  styleUrl: './gtform-editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GtformEditorComponent),
      multi: true
    }
  ]
})
export class GtformEditorComponent extends BaseControlValueAccessor<string> implements OnChanges, OnInit, OnDestroy {

  @Input() public height = '320px';
  @Input() public header: 'none' | 'basic' | 'complete' | 'email' = 'basic';
  @Input() public readonly = false;
  @Input() public placeholder = '';
  @Input() public inputValue: string | null = null;

  public text = '';
  private isAlive = true;
  private textChange = new Subject<string>();

  public constructor() {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputValue']) {
      const change = changes['inputValue'];

      if (change.currentValue !== change.previousValue) {
        console.log(change.currentValue);
        this.updateValue(change.currentValue);
      }
    }
  }

  public ngOnInit(): void {
    this.textChange.pipe(
      debounceTime(300),
      takeWhile(() => this.isAlive)
    ).subscribe(newValue => {
      this.text = newValue;
      this.onChange(newValue);
      this.onTouched();
    });
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }

  public updateValue(val: string): void {

    this.textChange.next(val);
  }

  public override writeValue(value: string): void {
    super.writeValue(value);
    this.text = value ?? '';
  }
}
