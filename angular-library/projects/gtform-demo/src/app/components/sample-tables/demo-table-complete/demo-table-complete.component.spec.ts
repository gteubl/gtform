import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoTableCompleteComponent } from './demo-table-complete.component';

describe('DemoTableComponent', () => {
  let component: DemoTableCompleteComponent;
  let fixture: ComponentFixture<DemoTableCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoTableCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoTableCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
