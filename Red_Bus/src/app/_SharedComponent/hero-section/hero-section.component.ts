import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BusService } from '../../_service/bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  pickupLocation: string = '';
  dropLocation: string = '';
  date: string = '';

  constructor(private bookingService: BusService,private router: Router ) {} // Inject the service

  searchBuses() {
    const searchData = {
      pickupLocation: this.pickupLocation,
      dropLocation: this.dropLocation,
      date: this.date
    };
 console.log(searchData);
    this.bookingService.searchBuses(searchData).subscribe(response => {
      // Pass the response to BookingComponent
      this.bookingService.setSearchData(response);
      this.router.navigate(['/Booking']);
    });
  }
}
