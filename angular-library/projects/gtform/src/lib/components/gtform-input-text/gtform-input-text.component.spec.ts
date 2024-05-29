import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformInputTextComponent } from 'projects/gtform/src/lib/components/gtform-input-text/gtform-input-text.component';

describe('FormInputTextComponent', () => {
  let component: GtformInputTextComponent;
  let fixture: ComponentFixture<GtformInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformInputTextComponent]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(GtformInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
