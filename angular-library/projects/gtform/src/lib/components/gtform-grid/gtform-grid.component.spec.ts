/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GtformGridComponent } from './gtform-grid.component';

describe('GridComponent', () => {
  let component: GtformGridComponent<any>;
  let fixture: ComponentFixture<GtformGridComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformGridComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GtformGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
