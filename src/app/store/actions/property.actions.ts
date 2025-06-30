// store/actions/property.actions.ts
import { createAction, props } from '@ngrx/store';
import { Property } from '../models/property.model';

// export const loadProperties = createAction('[Property] Load Properties'); //without parameter
export const loadProperties = createAction(
    '[Property] Load Properties',
    props<{ endPoint: string }>()  // ✅ Accept `endPoint` as parameter
);
export const loadPropertiesSuccess = createAction('[Property] Load Success', props<{ data: Property[] }>());
export const loadPropertiesFailure = createAction('[Property] Load Failure', props<{ error: any }>());
