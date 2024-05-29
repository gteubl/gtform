import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformButtonIconComponent } from 'projects/gtform/src/lib/components/gtform-button-icon/gtform-button-icon.component';

describe('FormButtonIconComponent', () => {
  let component: GtformButtonIconComponent;
  let fixture: ComponentFixture<GtformButtonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformButtonIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
