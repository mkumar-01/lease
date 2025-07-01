import { Component, input, output, OnInit } from '@angular/core';

@Component({
  selector: 'dialog',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  onClose = output<boolean>();
  onPreviewSubmit = output<boolean>();
  postData = input<any>();
  close() {
    this.onClose.emit(false)
  }
  onSubmit() {
    this.onPreviewSubmit.emit(true)
    this.onClose.emit(false)
  }
  ngOnInit() {
    console.log(this.postData())
  }


}
