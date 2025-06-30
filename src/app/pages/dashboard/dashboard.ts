import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../services/http.service';

import { AppState } from '../../store/reducers';
import * as PropertyActions from '../../store/actions/property.actions';
import { Property } from '../../store/models/property.model';

import { Carousel } from '../../components/carousel/carousel';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Search } from '../../components/search/search';
import { Filter } from '../../components/filter/filter';
@Component({
  selector: 'dashboard',
  imports: [Carousel, Search, Filter, CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private http = inject(HttpService)
  private store = inject<Store<AppState>>(Store);

  private endPoint = "/assets/data/property-list.json";

  public listedProperty = signal<Property[] | undefined>(undefined);
  public listClonedToSearch = signal<Property[] | undefined>(undefined);
  public featured = signal<Property | undefined>(undefined);
  ngOnInit() {
    const endPoint = this.endPoint;
    this.store.dispatch(PropertyActions.loadProperties({ endPoint }));
    this.store.select(state => state.property.data).subscribe(data => {
      this.listedProperty.set(data);
      this.listClonedToSearch.set(data)
      this.featured.set(this.listedProperty()?.find(item => {
        return String(item.featured).toLowerCase() === 'true';
      }))
      console.log("state properties ", this.listedProperty())
    });
  }
  onSearch(val: string) {
    const value = val.trim().toLowerCase();
    const propertyList = [...this.listClonedToSearch() || []];
    if (value !== "") {
      const searchResult: Property[] = propertyList.filter(item => {
        const area = item.propertyLocation?.area?.trim().toLowerCase() || '';
        return area.includes(value); // 🔍 Partial match
      });
      this.listedProperty.set(searchResult)
    } else {
      this.listedProperty.set(propertyList)
    }

  }

  markFavourte(id: number) {
    this.store.dispatch(PropertyActions.markFavourite({ id }));
  }




}
