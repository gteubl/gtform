import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformInputDateComponent } from 'projects/gtform/src/lib/components/gtform-input-date/gtform-input-date.component';

describe('FormInputDateComponent', () => {
  let component: GtformInputDateComponent;
  let fixture: ComponentFixture<GtformInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformInputDateComponent]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(GtformInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
