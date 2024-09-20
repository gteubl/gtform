import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'gtform-file-uploader',
  templateUrl: './gtform-file-uploader.component.html',
  styleUrls: ['./gtform-file-uploader.component.scss'],
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class GtformFileUploaderComponent {
  @Input() public allowedExtensions: string[] = [];  // Acceptable file extensions
  @Output() public filesChanged = new EventEmitter<FileList>();
  @ViewChild('fileInput') public fileInputElement!: ElementRef;

  public uploadForm: FormGroup;
  public dragging: boolean = false;

  public constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      files: [null]  // This control is now just a placeholder
    });
  }

  // Actions
  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging = true;
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
    if (event.dataTransfer && this.checkAllowedFiles(event.dataTransfer.files)) {
      const files = event.dataTransfer.files;
      // Handle valid files here
      this.emitFiles(files);
    }
  }

  public onFileSelect(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const files: FileList | null = element.files;
    if (files && this.checkAllowedFiles(files)) {
      // Handle valid files here
      this.emitFiles(files);
    }
    this.dragging = false;
  }

  public emitFiles(files: FileList): void {
    this.filesChanged.emit(files);
  }

  public openFileDialog(): void {
    this.fileInputElement.nativeElement.click(); // Programmatically clicks the file input
  }

  private checkAllowedFiles(files: FileList): boolean {
    if (this.allowedExtensions.length === 0) return true; // If no restriction, accept all files

    for (let i = 0; i < files.length; i++) {
      if (!this.allowedExtensions.includes(files[i].type)) {
        alert(`File type not allowed: ${files[i].type}`);
        return false;
      }
    }
    return true;
  }
}
