import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCpfCnpj'
})
export class FormatCpfCnpjPipe implements PipeTransform {
//TODO: Move to application
  public transform(value: string): string {
    if (!value) {
      return '';
    }

    const onlyNumbers = value.replace(/\D/g, '');

    // Format CPF
    if (onlyNumbers.length === 11) {
      return onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    // Format CNPJ
    if (onlyNumbers.length === 14) {
      return onlyNumbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return value; // Return the input unchanged if it doesn't match CPF or CNPJ patterns
  }

}
