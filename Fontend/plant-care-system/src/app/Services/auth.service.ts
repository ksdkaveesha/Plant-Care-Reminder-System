import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrllogin = 'http://localhost:5230/api/Auth/login'; 
  private apiUrllogout = 'http://localhost:5230/api/Auth/logout';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrllogin, { username, password });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    const username = this.getUsername();
    console.log('Logging out user:', username); // ✅ Debug log

    if (username) {
      this.http.post(this.apiUrllogout, { username }, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe({
        next: (res) => {
          console.log('Logout success:', res);
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Logout error:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.router.navigate(['/']);
        }
      });
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['/']);
    }
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

}
