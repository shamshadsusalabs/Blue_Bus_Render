// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Modal/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/V1/user'; // Update with your API URL

  constructor(private http: HttpClient) { }

  // Signup method
  signup(userData: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, userData, { withCredentials: true });
  }

  // Login method
  login(userData: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData,{ withCredentials: true } );
  }

  // Logout method
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`,{ withCredentials: true } );
  }

  // Get user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`,{ withCredentials: true } );
  }

  // Update user
  updateUser(id: string, userData: User): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, userData,{ withCredentials: true } );
  }

  // Delete user
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`, { withCredentials: true });
  }


}
