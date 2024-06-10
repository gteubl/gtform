import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GtformOverlayPanelModule } from '../../directives/overlay-panel/index';
import { GtformTooltipModule } from '../../directives/tooltip/index';
import { GtformButtonIconModule } from '../gtform-button-icon/index';
import { GtformInputCheckboxModule } from '../gtform-checkbox/index';
import { GtformIconModule } from '../gtform-icon/index';
import { GtformSpinnerModule } from '../gtform-spinner/index';

import { GtformResizeTableColumnDirective } from './directives/gtform-resize-table-column';
import { GtformGridComponent } from './gtform-grid.component';
import { CastDataPipe } from './pipes/cast-data.pipe';
import { FormatChoiceOptionPipe } from './pipes/format-choice-option.pipe';

@NgModule(
  {
    imports: [CommonModule, FormsModule, GtformButtonIconModule, GtformInputCheckboxModule, GtformTooltipModule, GtformOverlayPanelModule, GtformIconModule, GtformSpinnerModule, CdkDropList, CdkDrag],
    declarations: [GtformGridComponent, CastDataPipe, FormatChoiceOptionPipe, GtformResizeTableColumnDirective],

    exports: [GtformGridComponent, CastDataPipe, FormatChoiceOptionPipe, GtformResizeTableColumnDirective]
  })
export class GtformGridModule {
}
