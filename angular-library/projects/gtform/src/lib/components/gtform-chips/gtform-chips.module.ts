import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GtformHbfTemplateModule } from '../../templates/gtform-hbf-template';
import { GtformButtonModule } from '../gtform-button';
import { GtformGridModule } from '../gtform-grid';
import { GtformIconModule } from '../gtform-icon';

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
