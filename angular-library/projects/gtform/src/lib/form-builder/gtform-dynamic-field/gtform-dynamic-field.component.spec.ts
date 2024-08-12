import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformDynamicFieldComponent } from './gtform-dynamic-field.component';

describe('GtformDynamicFieldComponent', () => {
  let component: GtformDynamicFieldComponent;
  let fixture: ComponentFixture<GtformDynamicFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformDynamicFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GtformDynamicFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
