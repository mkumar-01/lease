import { CanActivateFn, Router } from '@angular/router';
import { access_token } from '../constant';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const isLoggedIn = !!localStorage.getItem(access_token); // or a proper AuthService
  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
