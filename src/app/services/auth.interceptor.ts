import { HttpInterceptorFn } from '@angular/common/http';
import { access_token } from '../constant';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(access_token);
  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned);
  }
  return next(req);
};
