import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFullFormsComponent } from './demo-full-forms.component';

describe('DemoFullFormsComponent', () => {
  let component: DemoFullFormsComponent;
  let fixture: ComponentFixture<DemoFullFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoFullFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoFullFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
