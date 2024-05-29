import { Component } from '@angular/core';

import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'gtform-file-folder-uploader-modal',
  templateUrl: './gtform-file-folder-uploader-modal.component.html',
  styleUrl: './gtform-file-folder-uploader-modal.component.scss'
})
export class GtformFileFolderUploaderModalComponent {

  public constructor(public dialogRef: DynamicDialogRef) {
  }

  // Actions
  public onFileSelect(fileList: FileList): void {
    this.dialogRef.close(fileList);

  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
