import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformHbfTemplateComponent } from 'projects/gtform/src/lib/templates/form-hbf-template/gtform-hbf-template.component';

describe('FormHbfTemplateComponent', () => {
  let component: GtformHbfTemplateComponent;
  let fixture: ComponentFixture<GtformHbfTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformHbfTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformHbfTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
