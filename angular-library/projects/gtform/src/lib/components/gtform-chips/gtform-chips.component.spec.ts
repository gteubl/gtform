import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformChipsComponent } from 'projects/gtform/src/lib/components/gtform-chips/gtform-chips.component';

describe('FormChipsComponent', () => {
  let component: GtformChipsComponent;
  let fixture: ComponentFixture<GtformChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformChipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
