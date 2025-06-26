import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { access_token } from '../constant';
import { Router } from '@angular/router';
export interface AuthResponse {
  access_token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  private router = inject(Router);
  private loginApi = 'https://api.escuelajs.co/api/v1/auth/login'
  constructor(
    private http: HttpClient,

  ) { }
  isUserLoggedIn = signal(!!localStorage.getItem('access_token'));
  login(email: string, password: string) {
    this.http.post<AuthResponse>(this.loginApi, { email, password }).subscribe({
      next: (res) => {
        localStorage.setItem(access_token, res.access_token);
        this.router.navigate(['/dashboard']);
        this.isUserLoggedIn.set(true);
      },
      error: (error) => alert("Invalid credentials"),
    })
  }
  logout() {
    localStorage.removeItem(access_token);
    this.isUserLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    return this.isUserLoggedIn();
  }

}
