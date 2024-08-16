import { ControlValueAccessor } from '@angular/forms';

export abstract class BaseControlValueAccessor<T> implements ControlValueAccessor {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  protected innerValue: T;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onChange = (value: T): void => {
  };

  protected onTouched = (): void => {
  };

  public get value(): T {
    return this.innerValue;
  }

  protected set value(v: T) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChange(v);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public setDisabledState?(isDisabled: boolean): void {

  }

  public writeValue(value: T): void {
    this.innerValue = value;
  }
}
