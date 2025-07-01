import { Component, output, signal } from '@angular/core';
import { single } from 'rxjs';

@Component({
  selector: 'filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.scss'
})
export class Filter {
  public selectedRange = signal<number>(8000);
  onFurnishedCheck = output<boolean>()
  onSharedCheck = output<boolean>()
  onNegotiableCheck = output<boolean>()
  furnished(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onFurnishedCheck.emit(input.checked)
  }
  shared(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onSharedCheck.emit(true)
  }
  negotiable(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onNegotiableCheck.emit(input.checked)
  }
  range(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value)
    this.selectedRange.set(value)
  }


}
