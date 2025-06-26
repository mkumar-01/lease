import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthServices } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(public authService: AuthServices) { }
  private router = inject(Router);

  // logout() {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }

}
