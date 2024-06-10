import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformDynamicModalContainerComponent } from './gtform-dynamic-modal-container/gtform-dynamic-modal-container.component';
import { GtformDynamicModalComponent } from './gtform-dynamic-modal.component';

@NgModule(
  {
    imports: [CommonModule],
    declarations: [GtformDynamicModalComponent, GtformDynamicModalContainerComponent],
    exports: [GtformDynamicModalComponent, GtformDynamicModalContainerComponent]
  })
export class GtformDynamicModalModule { }
