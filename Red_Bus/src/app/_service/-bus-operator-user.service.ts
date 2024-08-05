// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperatorUser } from '../Modal/BusOperatorUser';


@Injectable({
  providedIn: 'root'
})
export class BusOperatorUserService {
  private apiUrl = 'http://localhost:3000/api/V1/OperatorUsers'; // Update with your API URL

  constructor(private http: HttpClient) { }

  // Signup
  signup(user:  OperatorUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user, { withCredentials: true });
  }

  // Login
  login(userData:OperatorUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData,{ withCredentials: true } );
  }

  // Logout
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  // Get user by ID
  getUser(id: string): Observable< OperatorUser> {
    return this.http.get< OperatorUser>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Update user by ID
  updateUser(id: string, user:  OperatorUser): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user, { withCredentials: true });
  }

  // Delete user by ID
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
