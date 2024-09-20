import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformFileFolderUploaderModalComponent } from 'projects/gtform/src/lib/components/gtform-file-folder-tree/gtform-file-folder-uploader-modal/gtform-file-folder-uploader-modal.component';

describe('FormFileFolderUploaderModalComponent', () => {
  let component: GtformFileFolderUploaderModalComponent;
  let fixture: ComponentFixture<GtformFileFolderUploaderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformFileFolderUploaderModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformFileFolderUploaderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
