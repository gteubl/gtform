import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformToastComponent } from './gtform-toast.component';

describe('GtformToastComponent', () => {
  let component: GtformToastComponent;
  let fixture: ComponentFixture<GtformToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformToastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
