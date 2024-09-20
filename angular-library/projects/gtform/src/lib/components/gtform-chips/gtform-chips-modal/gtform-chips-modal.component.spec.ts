import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformChipsModalComponent } from 'projects/gtform/src/lib/components/gtform-chips/gtform-chips-modal/gtform-chips-modal.component';

describe('FormChipsModalComponent', () => {
  let component: GtformChipsModalComponent;
  let fixture: ComponentFixture<GtformChipsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformChipsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformChipsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
