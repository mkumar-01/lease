import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../services/http.service';
import { AuthServices } from '../../services/auth.service';
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
  constructor(public authService: AuthServices) { }
  private store = inject<Store<AppState>>(Store);

  private endPoint = "/assets/data/property-list.json";

  public listedProperty = signal<Property[] | undefined>(undefined);
  public listClonedToSearch = signal<Property[] | undefined>(undefined);
  public featured = signal<Property | undefined>(undefined);

  public furnishedFilter = false;
  public sharedFilter = false;
  public negotiableFilter = false;

  ngOnInit() {
    const endPoint = this.endPoint;
    const localData = localStorage.getItem('data');
    if (localData) {
      try {
        const parsedData = JSON.parse(localData) as Property[];
        this.listedProperty.set(parsedData);
        this.listClonedToSearch.set(parsedData);
        this.featured.set(parsedData.find(item => String(item.featured).toLowerCase() === 'true'));
      } catch (error) {
        console.error("Failed to parse local storage data:", error);
      }
    } else {
      this.fetchFromStore(endPoint);
    }
  }



  private fetchFromStore(endpoint: string) {
    this.store.dispatch(PropertyActions.loadProperties({ endPoint: endpoint }));
    this.store.select(state => state.property.data).subscribe(data => {
      if (data) {
        this.listedProperty.set(data);
        this.listClonedToSearch.set(data);
        this.featured.set(data.find(item => String(item.featured).toLowerCase() === 'true'));
        localStorage.setItem('data', JSON.stringify(data));
      }
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
    const localData = localStorage.getItem('data');
    if (localData) {
      const parsedData = JSON.parse(localData) as Property[];
      const index = parsedData.findIndex(item => item.id === id);
      if (index !== -1) {
        const updated = { ...parsedData[index], isFavourite: true };
        parsedData.splice(index, 1, updated);
        this.listedProperty.set(parsedData);
        localStorage.removeItem('data');
        localStorage.setItem('data', JSON.stringify(parsedData));
      }
    }
  }


  private applyCombinedFilters() {
    const fullList = this.listClonedToSearch();
    if (!fullList) return;

    let filtered = fullList;

    if (this.furnishedFilter) {
      filtered = filtered.filter(item => item.furnished === true);
    }

    if (this.sharedFilter) {
      filtered = filtered.filter(item => item.shared === true);
    }

    if (this.negotiableFilter) {
      filtered = filtered.filter(item => item.expectedRent?.isNegotiable === true);
    }

    this.listedProperty.set(filtered);
  }


  onFurnishedCheck(event: boolean) {
    this.furnishedFilter = event;
    this.applyCombinedFilters();
  }

  onSharedCheck(event: boolean) {
    this.sharedFilter = event;
    this.applyCombinedFilters();

  }

  onNegotiableCheck(event: boolean) {
    this.negotiableFilter = event;
    this.applyCombinedFilters();

  }





}
