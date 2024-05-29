import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtformBookmarkComponent } from 'projects/gtform/src/lib/components/gtform-bookmark/gtform-bookmark.component';

describe('FormBookmarkComponent', () => {
  let component: GtformBookmarkComponent;
  let fixture: ComponentFixture<GtformBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GtformBookmarkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GtformBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
