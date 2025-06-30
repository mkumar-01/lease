// store/reducers/index.ts
import { counterReducer } from './counter.reducer';
import { propertyReducer, PropertyState } from './property.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    counter: number,
    property: PropertyState

}

export const reducers: ActionReducerMap<AppState> = {
    counter: counterReducer,
    property: propertyReducer
};
