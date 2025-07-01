import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
// import * as PropertyActions from '../../store/actions/property.actions';
import { AppState } from '../../store/reducers';

import { Property } from '../../store/models/property.model';
import { CommentsComponent } from '../../components/comments/comments.component';


@Component({
  selector: 'detail',
  imports: [CommonModule, CommentsComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail implements OnInit {
  // private endPoint = "/assets/data/property-list.json";
  public id: string | null = null;
  public propertyDetail = signal<Property | undefined>(undefined);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject<Store<AppState>>(Store);
  constructor() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ngOnInit() {
    if (this.findDetail()) {
      this.propertyDetail.set(this.findDetail());
    } else {
      this.router.navigate(['/login'])
    }
  }
  findDetail(): Property | undefined {
    const localData = localStorage.getItem('data');
    if (localData) {
      const parsedData = JSON.parse(localData) as Property[];
      const data = parsedData.find(detail => detail.id === Number(this.id))
      return data;
    }
    return undefined;
  }
  onAddComment(userComment: string) {
    const data = this.findDetail();
    if (data) {
      if (!data.userComments) {
        data.userComments = [];
      }
      data.userComments.push(userComment);
      this.setData(data)
    }
  }
  setData(data: Property) {
    const localData = localStorage.getItem('data');
    if (localData) {
      const parsedData = JSON.parse(localData) as Property[];
      const index = parsedData.findIndex(item => item.id === Number(this.id));
      if (index !== -1) {
        const updated = { ...data };
        parsedData.splice(index, 1, updated);
        this.propertyDetail.set(updated);
        localStorage.removeItem('data');
        localStorage.setItem('data', JSON.stringify(parsedData));
      }
    }
  }


}
