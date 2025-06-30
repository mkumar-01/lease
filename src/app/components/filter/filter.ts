import { Component, signal } from '@angular/core';

@Component({
  selector: 'filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.scss'
})
export class Filter {
  public selectedRange = signal<number>(8000);
  furnished(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input.checked)
  }
  shared(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input.checked)
  }
  negotiable(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input.checked)
  }
  range(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value)
    this.selectedRange.set(value)
  }


}
