import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFullFormTab3Component } from './demo-full-form-tab3.component';

describe('DemoFullFormTab3Component', () => {
  let component: DemoFullFormTab3Component;
  let fixture: ComponentFixture<DemoFullFormTab3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoFullFormTab3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoFullFormTab3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
