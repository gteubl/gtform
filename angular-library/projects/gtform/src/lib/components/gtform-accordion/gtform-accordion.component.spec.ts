import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormAccordionComponent} from 'projects/gtform/src/lib/components/gtform-accordion/gtform-accordion.component';

describe('FormAccordionPanelComponent', () => {
  let component: FormAccordionComponent;
  let fixture: ComponentFixture<FormAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAccordionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
