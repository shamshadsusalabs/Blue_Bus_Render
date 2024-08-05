import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ViewDetailComponent } from '../view-detail/view-detail.component';
import { BusService } from '../../_service/bus.service';
import { NavbarComponent } from '../../_SharedComponent/navbar/navbar.component';
BusService

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ViewDetailComponent,NavbarComponent ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  activeTab: string = ''; // Stores the active tab
  showCardContent: boolean = true; // Keeps the card content always visible
  selectedSeat: { id: string, title: string } | null = null;
  selectedBus: any | null = null;
  isModalOpen: boolean = false;
  setActiveTab(tab: string) {
    this.activeTab = tab; // Set the active tab
  }

 // Keeps the card content always visible
  searchResults: any;
  error: string | null = null;
  constructor(private bookingService: BusService) {} // Inject the service

  ngOnInit() {
    this.bookingService.getSearchData().subscribe({
      next: (data) => {
        console.log('Received search data:', data); // Log received data
        this.searchResults = data;
      },
      error: (err) => {
        this.error = 'An error occurred while fetching search results.';
        console.error('Error fetching search data:', err); // Log errors
      }
    });
  }








}
