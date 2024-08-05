import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeSectionComponent } from './prime-section.component';

describe('PrimeSectionComponent', () => {
  let component: PrimeSectionComponent;
  let fixture: ComponentFixture<PrimeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
