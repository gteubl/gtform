import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformComponent } from './gtform.component';

describe('GtformComponent', () => {
  let component: GtformComponent;
  let fixture: ComponentFixture<GtformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GtformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
