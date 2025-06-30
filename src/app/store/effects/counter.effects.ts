// store/effects/counter.effects.ts
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class CounterEffects {
    constructor(private actions$: Actions) { }
}

export const effects = [CounterEffects];
