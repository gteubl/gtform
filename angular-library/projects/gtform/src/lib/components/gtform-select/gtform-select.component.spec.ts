import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformSelectComponent } from 'projects/gtform/src/lib/components/gtform-select/gtform-select.component';

describe('FormSelectComponent', () => {
  let component: GtformSelectComponent;
  let fixture: ComponentFixture<GtformSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformSelectComponent]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(GtformSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
