import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFullFormTab1Component } from './demo-full-form-tab1.component';

describe('DemoFullFormTab1Component', () => {
  let component: DemoFullFormTab1Component;
  let fixture: ComponentFixture<DemoFullFormTab1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoFullFormTab1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoFullFormTab1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
