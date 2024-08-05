import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSectionComponent } from './global-section.component';

describe('GlobalSectionComponent', () => {
  let component: GlobalSectionComponent;
  let fixture: ComponentFixture<GlobalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
