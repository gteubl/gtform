import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformProgressStepperComponent } from 'projects/gtform/src/lib/components/gtform-progress-stepper/gtform-progress-stepper.component';

describe('FormProgressStepperComponent', () => {
  let component: GtformProgressStepperComponent;
  let fixture: ComponentFixture<GtformProgressStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformProgressStepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformProgressStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
