import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);

  constructor() { }

  public get<T>(url: string) {
    return this.http.get<T>(url);
  }

}
