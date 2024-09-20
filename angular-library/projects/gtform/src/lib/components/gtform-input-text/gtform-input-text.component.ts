/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, forwardRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControlValueAccessor } from '../base-control-value-accessor';

@Component({
  selector: 'gtform-input-text',
  styleUrl: './gtform-input-text.component.scss',
  templateUrl: './gtform-input-text.component.html',
  host: { 'hostID': crypto.randomUUID().toString() },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GtformInputTextComponent),
      multi: true
    }
  ]
})
export class GtformInputTextComponent extends BaseControlValueAccessor<string> implements OnChanges {
  @Input() public disabled: boolean = false;
  @Input() public inputValue: string | null = null;
  @Input() public label: string = '';
  @Input() public placeholder: string = '';
  @Input() public invalid: boolean = false;
  @Input() public formatType: 'default' | 'cpf' | 'cnpj' | 'currency' | 'cep' | 'numbers' = 'default';

  @ViewChild('inputRef', { static: true }) public inputElement!: ElementRef;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputValue']) {
      const change = changes['inputValue'];
      if (change.currentValue !== change.previousValue) {
        this.writeValue(this.applyFormatting(change.currentValue));
      }
    }
  }

  // Actions
  public onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    switch (this.formatType) {
    case 'cpf':
      value = value.replace(/\D/g, '').slice(0, 11);
      break;
    case 'cnpj':
      value = value.replace(/\D/g, '').slice(0, 14);
      break;
    case 'cep':
      value = value.replace(/\D/g, '').slice(0, 8);
      break;
    case 'currency':
      // eslint-disable-next-line no-case-declarations
      const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
      value = numericValue.toString();
      break;
    case 'numbers':
      value = value.replace(/\D/g, '');
      break;
    }

    value = this.applyFormatting(value);

    this.value = value;
    inputElement.value = value;

    this.invalid = !this.isValidFormat(value);
  }

  public override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public override writeValue(value: any): void {

    if (value !== undefined && value !== null) {
      value = this.normalizevalue(value);
      let stringValue = value.toString();
      stringValue = this.applyFormatting(stringValue);
      this.value = stringValue;

      if (this.inputElement && this.inputElement.nativeElement) {
        (this.inputElement.nativeElement as HTMLInputElement).value = stringValue;
      }
    } else {
      this.value = '';
      if (this.inputElement && this.inputElement.nativeElement) {
        (this.inputElement.nativeElement as HTMLInputElement).value = '';
      }
    }

    this.onTouched();
  }

  private applyFormatting(value: string): string {
    if (!value) return value;

    switch (this.formatType) {
    case 'cpf':
      return value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/, (match, p1, p2, p3, p4) => {
          const result = `${p1}.${p2 || ''}${p2 ? '.' : ''}${p3 || ''}${p3 ? '-' : ''}${p4 || ''}`;
          // Trim trailing non-numeric characters (e.g., '.', '-')
          return result.replace(/[\D]+$/, '');
        });
    case 'cnpj':
      return value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/(\d{2})(\d{1,3})?(\d{1,3})?(\d{1,4})?(\d{1,2})?/, (match, p1, p2, p3, p4, p5) => {
          const result = `${p1}.${p2 || ''}${p2 ? '.' : ''}${p3 || ''}${p3 ? '/' : ''}${p4 || ''}${p4 ? '-' : ''}${p5 || ''}`;
          return result.replace(/[\D]+$/, '');
        });
    case 'currency':
      // eslint-disable-next-line no-case-declarations
      const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;

      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(numericValue / 100);

    case 'cep':
      return value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/^(\d{5})(\d{1,3})?/, (match, p1, p2) => `${p1}-${p2 || ''}`)
        .replace(/-$/, ''); // Remove trailing dash if it exists (for when user deletes input)
    default:
      return value;
    }
  }

  private isValidFormat(value: string): boolean {
    if (this.formatType === 'default') return true; // Always valid if no specific format is required

    if (this.formatType === 'cpf') {
      return /^(\d{3}\.){2}\d{3}-\d{2}$/.test(value); // Matches formatted CPF
    } else if (this.formatType === 'cnpj') {
      return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value); // Matches formatted CNPJ
    }

    if (this.formatType === 'cep') {
      return /^\d{5}-\d{3}$/.test(value); // Matches formatted CEP
    }
    // Implement additional format validations as needed
    return true;
  }

  private normalizevalue(value: any): any {

    if (this.formatType == 'currency') {
      value = value.toString();
      if (!value.includes('.')) {
        return value * 100;
      }
    }
    return value;
  }

}
