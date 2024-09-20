import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformDynamicAvailableFieldsComponent } from './gtform-dynamic-available-fields.component';

describe('GtformDynamicAvailableFieldsComponent', () => {
  let component: GtformDynamicAvailableFieldsComponent;
  let fixture: ComponentFixture<GtformDynamicAvailableFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformDynamicAvailableFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GtformDynamicAvailableFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
