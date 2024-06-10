import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformFileUploaderComponent } from './gtform-file-uploader.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GtformFileUploaderComponent],
  exports: [GtformFileUploaderComponent]
})
export class GtformFileUploaderModule { }
