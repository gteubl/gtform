import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformTabsComponent } from 'projects/gtform/src/lib/components/gtform-tabs/gtform-tabs.component';

describe('FormTabsComponent', () => {
  let component: GtformTabsComponent;
  let fixture: ComponentFixture<GtformTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformTabsComponent]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(GtformTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
