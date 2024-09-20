import { Component } from '@angular/core';


@Component({
  selector: 'gtform-file-folder-uploader-modal',
  templateUrl: './gtform-file-folder-uploader-modal.component.html',
  styleUrl: './gtform-file-folder-uploader-modal.component.scss'
})
export class GtformFileFolderUploaderModalComponent {

  /* public constructor(public dialogRef: DynamicDialogRef) {
  }*/

  // Actions
  public onFileSelect(fileList: FileList): void {
    // this.dialogRef.close(fileList);
    console.log('file selected', fileList);
  //
  }

  public closeDialog(): void {
    // this.dialogRef.close();
  }

}
