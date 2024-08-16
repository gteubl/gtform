import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformSwitchComponent } from './gtform-switch.component';

describe('GtformSwitchComponent', () => {
  let component: GtformSwitchComponent;
  let fixture: ComponentFixture<GtformSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GtformSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
