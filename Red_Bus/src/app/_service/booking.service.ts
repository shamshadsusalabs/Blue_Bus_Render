import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Booking} from '../Modal/Booking'
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/api/V1/Booking/bookings';

  constructor(private http: HttpClient) {}

  // Create a new booking
  createBooking(booking: Booking): Observable<any> {
    return this.http.post<any>(this.apiUrl, booking);
  }

  // Get all bookings
  getAllBookings(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Get a booking by ID
  getBookingById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update a booking by ID
  updateBooking(id: string, booking: Booking): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, booking);
  }

  // Delete a booking by ID
  deleteBooking(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);


  }


  getSeatDetailsByBusId(busId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/seats/${busId}`);
  }
}

