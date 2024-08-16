import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFileUploaderComponent } from 'src/library/gtform-file-uploader/gtform-file-uploader.component';

describe('FormFilesUploaderComponent', () => {
  let component: FormFileUploaderComponent;
  let fixture: ComponentFixture<FormFileUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFileUploaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
