import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformAutocompleteModalComponent } from 'projects/gtform/src/lib/components/gtform-autocomplete/gtform-autocomplete-modal/gtform-autocomplete-modal.component';

describe('FormAutocompleteModalComponent', () => {
  let component: GtformAutocompleteModalComponent;
  let fixture: ComponentFixture<GtformAutocompleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformAutocompleteModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformAutocompleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
