import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformSideDrawerComponent } from './gtform-side-drawer.component';

describe('GtformSideDrawerComponent', () => {
  let component: GtformSideDrawerComponent;
  let fixture: ComponentFixture<GtformSideDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformSideDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GtformSideDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
