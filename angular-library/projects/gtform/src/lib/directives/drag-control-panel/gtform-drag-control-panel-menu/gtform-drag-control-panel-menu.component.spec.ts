import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformDragControlPanelMenuComponent } from './gtform-drag-control-panel-menu.component';

describe('GtformDragControlPanelMenuComponent', () => {
  let component: GtformDragControlPanelMenuComponent;
  let fixture: ComponentFixture<GtformDragControlPanelMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformDragControlPanelMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GtformDragControlPanelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
