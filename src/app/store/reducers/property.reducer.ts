// store/reducers/property.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as PropertyActions from '../actions/property.actions';
import { Property } from '../models/property.model';

export interface PropertyState {
    data: Property[];
    loading: boolean;
    error: any;
}

export const initialState: PropertyState = {
    data: [],
    loading: false,
    error: null
};

export const propertyReducer = createReducer(
    // localStorage.setItem('data', JSON.stringify(initialState)),
    initialState,
    on(PropertyActions.loadProperties, state => ({ ...state, loading: true })),
    on(PropertyActions.loadPropertiesSuccess, (state, { data }) => ({ ...state, loading: false, data })),
    on(PropertyActions.loadPropertiesFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(PropertyActions.markFavourite, (state, { id }) => ({
        ...state,
        data: state.data.map(property => property.id === id ? { ...property, isFavourite: true } : property)
    }))

);
