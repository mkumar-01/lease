import { Component } from '@angular/core';

@Component({
  selector: 'comments',
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {

  addComments(comments: HTMLTextAreaElement) {
    console.log(comments.value)
  }
}
