// store/reducers/index.ts
import { counterReducer } from './counter.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    counter: number;
}

export const reducers: ActionReducerMap<AppState> = {
    counter: counterReducer
};
