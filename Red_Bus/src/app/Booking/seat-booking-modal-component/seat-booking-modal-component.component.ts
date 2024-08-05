import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seat-booking-modal-component',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './seat-booking-modal-component.component.html',
  styleUrl: './seat-booking-modal-component.component.css'
})
export class SeatBookingModalComponentComponent {
  @Input() showModal: boolean = false;
  @Input() busDetails: any;
  @Input() selectedSeat: any;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<any>();

  userName: string = '';
  userMobile: string = '';
  userEmail: string = '';

  closeModal() {
    this.close.emit();
  }

  confirmBooking() {
    const bookingDetails = {
      seat: this.selectedSeat,
      bus: {
        id: this.busDetails._id,
        pickUpLocation: this.busDetails.pickUpLocation,
        pickUpTime: this.busDetails.pickUpTime,
        pickUpAmPm: this.busDetails.pickUpAmPm,
        dropLocation: this.busDetails.dropLocation,
        dropTime: this.busDetails.dropTime,
        dropAmPm: this.busDetails.dropAmPm,
        duration: this.busDetails.duration,
        fare: this.busDetails.fare
      },
      user: {
        name: this.userName,
        mobile: this.userMobile,
        email: this.userEmail
      }
    };
    this.confirm.emit(bookingDetails);
  }
}
