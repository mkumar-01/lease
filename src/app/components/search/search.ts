import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  public search: string = "";
  onKeyUp = output<string>();
  constructor() {
  }
  sendOutput(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    // console.log(typeof value)
    this.onKeyUp.emit(value)
  }
}
