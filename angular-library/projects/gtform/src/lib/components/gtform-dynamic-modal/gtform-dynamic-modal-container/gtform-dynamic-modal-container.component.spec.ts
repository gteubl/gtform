import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformDynamicModalContainerComponent } from './gtform-dynamic-modal-container.component';

describe('GtformDynamicModalContainerComponent', () => {
  let component: GtformDynamicModalContainerComponent;
  let fixture: ComponentFixture<GtformDynamicModalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformDynamicModalContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformDynamicModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
