import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// Removed 'jwt-decode' import to fix your error

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:9090/api/v1/user';

  constructor(private http: HttpClient, private router: Router) {}

  // --- AUTHENTICATION ---
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }

  // --- ROLE MANAGEMENT (Manual Decode) ---
  
  getRole(): string {
    const token = this.getToken();
    if (!token) return '';
    
    try {
      // 1. Split the token (Header.Payload.Signature)
      const payloadPart = token.split('.')[1];
      // 2. Decode Base64 string
      const decodedPayload = atob(payloadPart);
      // 3. Parse JSON
      const payloadObj = JSON.parse(decodedPayload);
      
      return payloadObj.role || '';
    } catch (e) {
      console.error("Failed to decode token", e);
      return '';
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  // --- ADMIN API CALLS ---
  
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  addUser(user: any): Observable<string> {
    // responseType: 'text' because backend returns a String message
    return this.http.post(`${this.baseUrl}/add`, user, { responseType: 'text' });
  }

  deleteUser(username: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${username}`, { responseType: 'text' });
  }
}