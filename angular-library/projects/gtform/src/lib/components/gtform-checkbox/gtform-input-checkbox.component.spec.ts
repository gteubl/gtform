import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputCheckboxComponent } from 'src/library/gtform-checkbox/form-input-checkbox.component';

describe('FormCheckComponent', () => {
  let component: FormInputCheckboxComponent;
  let fixture: ComponentFixture<FormInputCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormInputCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
