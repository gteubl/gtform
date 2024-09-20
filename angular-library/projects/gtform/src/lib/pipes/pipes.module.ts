import { NgModule } from '@angular/core';

import { FileSizePipe } from './file-size.pipe';
import { FormatCpfCnpjPipe } from './format-cpf-cnpj.pipe';
import { ValueToChoiceOptionPipe } from './value-to-choice-option';

@NgModule(
  {
    imports: [],
    declarations: [FileSizePipe, FormatCpfCnpjPipe, ValueToChoiceOptionPipe],
    exports: [FileSizePipe, FormatCpfCnpjPipe, ValueToChoiceOptionPipe]
  })
export class PipesModule {
}
