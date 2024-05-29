import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformFileFolderTreeComponent } from 'projects/gtform/src/lib/components/gtform-file-folder-tree/gtform-file-folder-tree.component';

describe('FormFileFolderTreeComponent', () => {
  let component: GtformFileFolderTreeComponent;
  let fixture: ComponentFixture<GtformFileFolderTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformFileFolderTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformFileFolderTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
