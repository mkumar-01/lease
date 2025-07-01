import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../store/models/property.model';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  // private http = inject(HttpClient);



  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>('/assets/data/property-list.json');
  }

}
