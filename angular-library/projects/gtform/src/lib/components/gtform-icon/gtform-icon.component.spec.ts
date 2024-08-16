import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformIconComponent } from 'projects/gtform/src/lib/components/gtform-icon/gtform-icon.component';

describe('FormIconComponent', () => {
  let component: GtformIconComponent;
  let fixture: ComponentFixture<GtformIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
