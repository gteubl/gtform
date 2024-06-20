import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { GtformOverlayPanelModule } from '../../directives/overlay-panel';
import { GtformTooltipModule } from '../../directives/tooltip';
import { GtformButtonIconModule } from '../gtform-button-icon';
import { GtformInputCheckboxModule } from '../gtform-checkbox';
import { GtformIconModule } from '../gtform-icon';
import { GtformSpinnerModule } from '../gtform-spinner';

import { GtformResizeTableColumnDirective } from './directives/gtform-resize-table-column';
import { GtformGridComponent } from './gtform-grid.component';
import { CastDataPipe } from './pipes/cast-data.pipe';
import { FormatChoiceOptionPipe } from './pipes/format-choice-option.pipe';

@NgModule(
  {
    imports: [CommonModule, FormsModule, GtformButtonIconModule, GtformInputCheckboxModule, GtformTooltipModule, GtformOverlayPanelModule, GtformIconModule, GtformSpinnerModule, CdkDropList, CdkDrag, TranslateModule],
    declarations: [GtformGridComponent, CastDataPipe, FormatChoiceOptionPipe, GtformResizeTableColumnDirective],
    exports: [GtformGridComponent, CastDataPipe, FormatChoiceOptionPipe, GtformResizeTableColumnDirective]
  })
export class GtformGridModule {
}
