import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth.interceptor';

import { reducers } from './store/reducers';  // You will define this
// import { effects } from './store/effects';    // You will define this
import { CounterEffects } from './store/effects/counter.effects';    // You will define this
import { PropertyEffects } from './store/effects/property.effects';    // You will define this

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(reducers),
    provideEffects(CounterEffects, PropertyEffects),
    importProvidersFrom(StoreDevtoolsModule.instrument({ maxAge: 25 }))
  ]
};
