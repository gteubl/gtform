import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformAutocompleteComponent } from 'projects/gtform/src/lib/components/gtform-autocomplete/gtform-autocomplete.component';

describe('FormAutocompleteComponent', () => {
  let component: GtformAutocompleteComponent;
  let fixture: ComponentFixture<GtformAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
