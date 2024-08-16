import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Bus } from '../Modal/Bus';
 // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'https://blue-bus-render.onrender.com/api/V1/bus/buses';  // Adjust the API URL as needed
  private searchData = new BehaviorSubject<any>(this.loadSearchData());
  constructor(private http: HttpClient) {}

  // Create a new bus
  createBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(this.apiUrl, bus);
  }

  // Get all buses
  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl);
  }

  // Get a bus by ID
  getBus(id: string): Observable<Bus> {
    return this.http.get<Bus>(`${this.apiUrl}/${id}`);
  }

  // Update a bus
  updateBus(id: string, bus: Bus): Observable<Bus> {
    return this.http.put<Bus>(`${this.apiUrl}/${id}`, bus);
  }

  // Delete a bus
  deleteBus(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }







  private loadSearchData() {
    const data = localStorage.getItem('searchData');
    return data ? JSON.parse(data) : null;
  }

  setSearchData(data: any) {
    console.log('Setting search data:', data); // Log data being set
    localStorage.setItem('searchData', JSON.stringify(data));
    this.searchData.next(data);
  }

  getSearchData(): Observable<any> {
    return this.searchData.asObservable();
  }

  searchBuses(data: any): Observable<any> {
    console.log('Searching buses with data:', data); // Log request data
    return this.http.post(`${this.apiUrl}/find-buses`, data);
  }
}
