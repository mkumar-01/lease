import { Component, output } from '@angular/core';

@Component({
  selector: 'dialog',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  onClose = output<boolean>();
  onPreviewSubmit = output<boolean>();
  close() {
    this.onClose.emit(false)
  }
  onSubmit() {
    this.onPreviewSubmit.emit(true)
    this.onClose.emit(false)
  }

}
