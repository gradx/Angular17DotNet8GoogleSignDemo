import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { SampleInterceptor } from './interceptors/sample-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),  
    {
        provide: HTTP_INTERCEPTORS,
        useClass: SampleInterceptor,
        multi:true
    }
  ]
};
