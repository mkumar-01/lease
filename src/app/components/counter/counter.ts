// src/app/components/counter.component.ts
import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { increment, decrement, reset } from '../../store/actions/counter.actions';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'counter',
  imports: [CommonModule],
  template: `
    <h2>Count: {{ count() }}</h2>
    <button (click)="inc()">+</button>
    <button (click)="dec()">-</button>
    <button (click)="res()">Reset</button>
  `
})
export class CounterComponent {
  private store = inject<Store<AppState>>(Store);

  count = signal(0);

  constructor() {
    this.store.select(state => state.counter).subscribe(value => {
      this.count.set(value);
    });
  }

  inc() { this.store.dispatch(increment()); }
  dec() { this.store.dispatch(decrement()); }
  res() { this.store.dispatch(reset()); }
}
