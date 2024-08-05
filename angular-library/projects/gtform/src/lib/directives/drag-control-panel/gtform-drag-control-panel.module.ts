import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformButtonIconModule } from '../../components/gtform-button-icon/index';
import { GtformIconModule } from '../../components/gtform-icon/index';

import { GtformDragControlPanelMenuComponent } from './gtform-drag-control-panel-menu/gtform-drag-control-panel-menu.component';
import { GtformDragControlPanelDirective } from './gtform-drag-control-panel.directive';

@NgModule({
  declarations: [
    GtformDragControlPanelDirective,
    GtformDragControlPanelMenuComponent
  ],
  imports: [
    CommonModule,
    GtformButtonIconModule,
    GtformIconModule,
    CdkDragHandle
  ],
  exports: [
    GtformDragControlPanelDirective,
    GtformDragControlPanelMenuComponent
  ]
})
export class GtformDragControlPanelModule {
}
