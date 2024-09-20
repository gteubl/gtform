import { Pipe, PipeTransform } from '@angular/core';

import { ChoiceOption } from '../../../models';

@Pipe({
  name: 'formatChoiceOption'
})
export class FormatChoiceOptionPipe implements PipeTransform {

  public transform(value: ChoiceOption): string {
    if (!value) {
      return '';
    }
    return value.description ?? '';
  }

}
