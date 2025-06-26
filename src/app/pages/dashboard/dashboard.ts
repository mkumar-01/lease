import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Carousel } from '../../components/carousel/carousel';
import { FeaturedList } from '../../components/featured-list/featured-list';
import iPropertyDetail from "../../model/propertyDetail"
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
  private router = inject(Router);
  // private endPoint = '/data/property-list.json';
  private endPoint = "/assets/data/property-list.json";
  public listedProperty = signal<iPropertyDetail[] | undefined>(undefined);
  public listClonedToSearch = signal<iPropertyDetail[] | undefined>(undefined);
  public featured = signal<iPropertyDetail | undefined>(undefined);
  // public filtered = signal<iPropertyDetail | undefined>(undefined);
  ngOnInit() {
    this.http.get<iPropertyDetail[]>(this.endPoint).subscribe({
      next: res => {
        this.listedProperty.set(res);
        this.listClonedToSearch.set(res)
        this.featured.set(this.listedProperty()?.find(item => {
          return String(item.featured).toLowerCase() === 'true';
        }))
      },
      error: err => console.error(err),
    })
  }
  onSearch(val: string) {
    const value = val.trim().toLowerCase();
    const propertyList = [...this.listClonedToSearch() || []];
    console.log(value)
    if (value !== "") {
      const searchResult: iPropertyDetail[] = propertyList.filter(item => {
        const area = item.propertyLocation?.area?.trim().toLowerCase() || '';
        return area.includes(value); // 🔍 Partial match
      });
      this.listedProperty.set(searchResult)
    } else {
      this.listedProperty.set(propertyList)
    }



  }

  markFavourte(id: HTMLDivElement) {
    id.classList.add('favourite')
  }




}
