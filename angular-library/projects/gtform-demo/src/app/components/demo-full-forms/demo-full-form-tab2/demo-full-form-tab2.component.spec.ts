import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFullFormTab2Component } from './demo-full-form-tab2.component';

describe('DemoFullFormTab2Component', () => {
  let component: DemoFullFormTab2Component;
  let fixture: ComponentFixture<DemoFullFormTab2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoFullFormTab2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoFullFormTab2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
