import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformDynamicFieldConfigModalComponent } from './gtform-dynamic-field-config-modal.component';

describe('GtformDynamicFieldConfigModalComponent', () => {
  let component: GtformDynamicFieldConfigModalComponent;
  let fixture: ComponentFixture<GtformDynamicFieldConfigModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformDynamicFieldConfigModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GtformDynamicFieldConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
