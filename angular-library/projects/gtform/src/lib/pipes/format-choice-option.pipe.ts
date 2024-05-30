import { Pipe, PipeTransform } from '@angular/core';
import { FormOption } from '../models/index';


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
