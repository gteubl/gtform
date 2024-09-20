import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFullFormTab4Component } from './demo-full-form-tab4.component';

describe('DemoFullFormTab4Component', () => {
  let component: DemoFullFormTab4Component;
  let fixture: ComponentFixture<DemoFullFormTab4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoFullFormTab4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoFullFormTab4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
