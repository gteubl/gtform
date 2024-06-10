import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { GtformHbfTemplateModule } from '../../templates/gtform-hbf-template/gtform-hbf-template.module';
import { GtformButtonModule } from '../gtform-button/index';

import { GtformFileUploaderComponent } from './gtform-file-uploader.component';

@NgModule({
  imports: [CommonModule, GtformHbfTemplateModule, ReactiveFormsModule, GtformButtonModule],
  declarations: [GtformFileUploaderComponent],
  exports: [GtformFileUploaderComponent]
})
export class GtformFileUploaderModule {
}
