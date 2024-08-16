import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformButtonComponent } from 'projects/gtform/src/lib/components/gtform-button/gtform-button.component';

describe('FormButtonComponent', () => {
  let component: GtformButtonComponent;
  let fixture: ComponentFixture<GtformButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformButtonComponent]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(GtformButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
