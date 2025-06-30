// store/actions/property.actions.ts
import { createAction, props } from '@ngrx/store';
import { Property } from '../models/property.model';

export const loadProperties = createAction('[Property] Load Properties');
export const loadPropertiesSuccess = createAction('[Property] Load Success', props<{ data: Property[] }>());
export const loadPropertiesFailure = createAction('[Property] Load Failure', props<{ error: any }>());
