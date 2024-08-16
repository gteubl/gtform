import { NgModule } from '@angular/core';

import { FileSizePipe } from './file-size.pipe';
import { FormatCpfCnpjPipe } from './format-cpf-cnpj.pipe';

@NgModule(
  {
    imports: [],
    declarations: [FileSizePipe, FormatCpfCnpjPipe],
    exports: [FileSizePipe, FormatCpfCnpjPipe]
  })
export class PipesModule {
}
