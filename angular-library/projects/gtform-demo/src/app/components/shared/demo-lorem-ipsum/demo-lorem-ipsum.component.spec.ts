import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLoremIpsumComponent } from './demo-lorem-ipsum.component';

describe('DemoLoremIpsumComponent', () => {
  let component: DemoLoremIpsumComponent;
  let fixture: ComponentFixture<DemoLoremIpsumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoLoremIpsumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoLoremIpsumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
