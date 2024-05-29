import { Pipe, PipeTransform } from '@angular/core';

import { FormOption } from 'src/library/utils/form-option';

@Pipe({
  name: 'formatChoiceOption'
})
export class FormatChoiceOptionPipe implements PipeTransform {

  
  public transform(value: FormOption): string {
    if (!value) {
      return '';
    }
    return value.description ?? '';
  }
  
}
