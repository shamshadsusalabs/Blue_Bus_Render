import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, } from '@angular/core';
import { BusService } from '../../_service/bus.service';
import { SeatBookingModalComponentComponent } from '../seat-booking-modal-component/seat-booking-modal-component.component';
import { BookingService } from '../../_service/booking.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-detail',
  standalone: true,
  imports: [CommonModule,SeatBookingModalComponentComponent],
  templateUrl: './view-detail.component.html',
  styleUrl: './view-detail.component.css'
})
export class ViewDetailComponent {
  activeTab: string | null = null; // Stores the active tab, initially null
  showCardContent: boolean = true; // Keeps the card content always visible
  showSeats: boolean = false;
  searchResults: any;
  error: string | null = null;
  openSeatViewId: string | null = null;
  activeTabs: { [key: string]: string } = {};

  constructor(private busService: BusService,private  bookingService: BookingService) {}

  ngOnInit() {
    this. busService.getSearchData().subscribe({
      next: (data) => {
        console.log('Received search data for View Component:', data); // Log received data
        this.searchResults = data.map((result: any) => ({
          ...result,
          duration: this.calculateDuration(result.pickUpTime, result.pickUpAmPm, result.dropTime, result.dropAmPm)
        }));
      },
      error: (err) => {
        this.error = 'An error occurred while fetching search results.';
        console.error('Error fetching search data:', err); // Log errors
      }
    });


  }

  calculateDuration(pickUpTime: string, pickUpAmPm: string, dropTime: string, dropAmPm: string): string {
    const pickUpDate = new Date(`2023-01-01T${this.convertTo24HourFormat(pickUpTime, pickUpAmPm)}`);
    const dropDate = new Date(`2023-01-01T${this.convertTo24HourFormat(dropTime, dropAmPm)}`);

    if (dropDate < pickUpDate) {
      dropDate.setDate(dropDate.getDate() + 1);
    }

    const durationMs = dropDate.getTime() - pickUpDate.getTime();
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${durationHours}h ${durationMinutes}m`;
  }

  convertTo24HourFormat(time: string, ampm: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    let hours24 = hours;

    if (ampm.toLowerCase() === 'pm' && hours < 12) {
      hours24 += 12;
    } else if (ampm.toLowerCase() === 'am' && hours === 12) {
      hours24 = 0;
    }

    return `${hours24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }


  toggleSeatView() {
    this.showSeats = !this.showSeats;
  }



  setActiveTab(id: string, tab: string): void {
    this.activeTabs[id] = tab;
  }




  seatdetails:any;




// Assuming you set the booked seats somehow, for example, after fetching seat details
toggleSeats(_id: string): void {
  this.openSeatViewId = this.openSeatViewId === _id ? null : _id;

  console.log(_id);

  this.bookingService.getSeatDetailsByBusId(_id).subscribe((data)=>{
        this.seatdetails = data;
        console.log(this.seatdetails);
  },(error)=>{
    console.log(error);

  }
)
}

showModal: boolean = false;
selectedBusDetails: any;
selectedSeat: any;




getSeats(totalSeats: number): string[] {
  return Array.from({ length: totalSeats }, (_, i) => String.fromCharCode(65 + Math.floor(i / 10)) + (i % 10 + 1));
}

getSeatRows(totalSeats: number): { id: string; title: string }[][] {
  const seats = this.getSeats(totalSeats).map((seat) => ({ id: seat, title: seat }));
  const rows: { id: string; title: string }[][] = [];
  for (let i = 0; i < seats.length; i += 9) {
    rows.push(seats.slice(i, i + 9));
  }
  return rows;
}

  openModal(busDetails: any, seat: any) {
    this.selectedBusDetails = busDetails;
    this.selectedSeat = seat;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmBooking(bookingDetails: any) {
    console.log(bookingDetails);
    // Show loader
    Swal.fire({
      title: 'Processing...',
      text: 'Please wait while we confirm your booking.',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });


    this.bookingService.createBooking(bookingDetails).subscribe({
      next: (data) => {
        // Close the loader
        Swal.close();

        // Show success message
        Swal.fire({
          title: 'Booking Confirmed!',
          text: `Your ticket is confirmed. Ticket details have been sent to your email and WhatsApp number.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        // Close the loader
        Swal.close();

        // Show error message from server
        const errorMessage = err.error?.message || 'There was an error confirming your booking. Please try again later.';

        Swal.fire({
          title: 'Booking Failed!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });

    this.showModal = false;
  }}
