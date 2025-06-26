import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import iPropertyDetail from '../../model/propertyDetail';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'detail',
  imports: [CommonModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail implements OnInit {
  private http = inject(HttpService);
  private endPoint = "/assets/data/property-list.json";
  public id: string | null = null;
  public propertyDetail = signal<iPropertyDetail | undefined>(undefined);
  private activatedRoute = inject(ActivatedRoute);
  constructor() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(this.id);
  }
  ngOnInit() {
    this.http.get<iPropertyDetail[]>(this.endPoint).subscribe({
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
