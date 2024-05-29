import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformEditorComponent } from 'projects/gtform/src/lib/components/gtform-editor/gtform-editor.component';

describe('FormEditorComponent', () => {
  let component: GtformEditorComponent;
  let fixture: ComponentFixture<GtformEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
