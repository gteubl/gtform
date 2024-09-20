import { Pipe, PipeTransform } from '@angular/core';

import { ChoiceOption } from '../models/index';

@Pipe({
  name: 'valueToChoiceOption'
})
export class ValueToChoiceOptionPipe implements PipeTransform {

  public reverseTransform(choiceOption: ChoiceOption): string {
    return choiceOption.value;
  }

  public transform(style: string | undefined, options: ChoiceOption[]): ChoiceOption | undefined {
    return options.find(option => option.value === style);
  }
}
