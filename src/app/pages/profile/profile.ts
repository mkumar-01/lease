import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpService } from '../../services/http.service';
interface UserProfile {
  avatar: string,
  email: string,
  id: number,
  name: string,
  role: string,
  updatedAt: string
}
@Component({
  selector: 'profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  private http = inject(HttpService)
  private profileEndPoint = 'https://api.escuelajs.co/api/v1/auth/profile'
  userProfile = signal<UserProfile | undefined>(undefined);
  ngOnInit() {
    this.http.get<UserProfile>(this.profileEndPoint).subscribe({
      next: res => this.userProfile.set(res),
      error: err => console.error(err),

    })
  }

}
