import { Component, output } from '@angular/core';

@Component({
  selector: 'comments',
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  onAddComment = output<string>();
  addComments(comments: HTMLTextAreaElement) {
    this.onAddComment.emit(comments.value);
    comments.value = ''
  }
}
