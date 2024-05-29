import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoWrapperComponent } from 'app/library/templates/endereco-wrapper/endereco-wrapper.component';

describe('EnderecoWrapperComponent', () => {
  let component: EnderecoWrapperComponent;
  let fixture: ComponentFixture<EnderecoWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnderecoWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnderecoWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
