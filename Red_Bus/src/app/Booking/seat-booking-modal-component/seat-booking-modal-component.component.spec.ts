import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatBookingModalComponentComponent } from './seat-booking-modal-component.component';

describe('SeatBookingModalComponentComponent', () => {
  let component: SeatBookingModalComponentComponent;
  let fixture: ComponentFixture<SeatBookingModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatBookingModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatBookingModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
