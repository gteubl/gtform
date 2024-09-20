import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformDrawerComponent } from './gtform-drawer.component';

describe('GtformDrawerComponent', () => {
  let component: GtformDrawerComponent;
  let fixture: ComponentFixture<GtformDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
