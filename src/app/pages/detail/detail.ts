import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import * as PropertyActions from '../../store/actions/property.actions';
import { AppState } from '../../store/reducers';

import { CommonModule } from '@angular/common';
import { Property } from '../../store/models/property.model';


@Component({
  selector: 'detail',
  imports: [CommonModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail implements OnInit {
  private endPoint = "/assets/data/property-list.json";
  public id: string | null = null;
  public propertyDetail = signal<Property | undefined>(undefined);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject<Store<AppState>>(Store);
  constructor() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }
  ngOnInit() {
    const endPoint = this.endPoint;
    this.store.dispatch(PropertyActions.loadProperties({ endPoint }));
    this.store.select(store => store.property.data).subscribe({
      next: res => {
        const data = res.find(detail => detail.id === Number(this.id))
        this.propertyDetail.set(data)
        // console.log(this.propertyDetail())
      },
      error: err => console.error(err),
    })
  }
  post(post: HTMLTextAreaElement) {
    console.log(post.value)
  }

}
