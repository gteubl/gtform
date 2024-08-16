import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformDynamicModalComponent } from './gtform-dynamic-modal.component';

describe('GtformDynamicModalComponent', () => {
  let component: GtformDynamicModalComponent;
  let fixture: ComponentFixture<GtformDynamicModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformDynamicModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformDynamicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
