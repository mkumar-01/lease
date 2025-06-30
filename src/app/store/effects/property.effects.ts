import { inject, Injectable, OnInit } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, mergeMap, of } from 'rxjs';
import { HttpService } from '../../services/http.service';
import * as PropertyActions from '../actions/property.actions';
import { Property } from '../models/property.model';

@Injectable()
export class PropertyEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpService);
    loadProperties$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PropertyActions.loadProperties),
            mergeMap(({ endPoint }) =>
                this.http.get<Property[]>(endPoint).pipe(
                    map((data: Property[]) => PropertyActions.loadPropertiesSuccess({ data })),
                    catchError(error => of(PropertyActions.loadPropertiesFailure({ error })))
                )
            )
        )
    );




}
