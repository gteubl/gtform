import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformSpinnerComponent } from 'projects/gtform/src/lib/components/gtform-spinner/gtform-spinner.component';

describe('FormSpinnerComponent', () => {
  let component: GtformSpinnerComponent;
  let fixture: ComponentFixture<GtformSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformSpinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
