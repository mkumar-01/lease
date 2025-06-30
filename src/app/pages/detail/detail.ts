import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as PropertyActions from '../../store/actions/property.actions';
import { AppState } from '../../store/reducers';

import { CommonModule } from '@angular/common';
import { Property } from '../../store/models/property.model';
import { CommentsComponent } from '../../components/comments/comments.component';


@Component({
  selector: 'detail',
  imports: [CommonModule, CommentsComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail implements OnInit {
  private endPoint = "/assets/data/property-list.json";
  public id: string | null = null;
  public propertyDetail = signal<Property | undefined>(undefined);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject<Store<AppState>>(Store);
  constructor() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }
  ngOnInit() {
    const localData = localStorage.getItem('data');
    if (localData) {
      const parsedData = JSON.parse(localData) as Property[];
      const data = parsedData.find(detail => detail.id === Number(this.id))
      this.propertyDetail.set(data);
    } else {
      this.router.navigate(['/login'])
    }
  }

}
