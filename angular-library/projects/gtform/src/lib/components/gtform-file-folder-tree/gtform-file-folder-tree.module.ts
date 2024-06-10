import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformFileFolderTreeComponent } from './gtform-file-folder-tree.component';
import { GtformFileFolderUploaderModalComponent } from './gtform-file-folder-uploader-modal/gtform-file-folder-uploader-modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GtformFileFolderUploaderModalComponent, GtformFileFolderTreeComponent],
  exports: [GtformFileFolderUploaderModalComponent, GtformFileFolderTreeComponent]
})
export class GtformFileFolderTreeModule {
}
