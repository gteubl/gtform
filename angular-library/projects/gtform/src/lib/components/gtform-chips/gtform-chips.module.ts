import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GtformHbfTemplateModule } from '../../templates/gtform-hbf-template/gtform-hbf-template.module';
import { GtformButtonModule } from '../gtform-button/index';
import { GtformGridModule } from '../gtform-grid/index';
import { GtformIconModule } from '../gtform-icon/index';

import { GtformChipsModalComponent } from './gtform-chips-modal/gtform-chips-modal.component';
import { GtformChipsComponent } from './gtform-chips.component';

@NgModule(
  {
    imports: [CommonModule, GtformHbfTemplateModule, GtformGridModule, GtformButtonModule, GtformIconModule, FormsModule],
    declarations: [GtformChipsModalComponent, GtformChipsComponent],
    exports: [GtformChipsModalComponent, GtformChipsComponent]
  }
)
export class GtformChipsModule {
}
