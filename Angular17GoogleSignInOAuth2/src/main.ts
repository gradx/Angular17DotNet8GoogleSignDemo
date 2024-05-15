import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AuthStoreProvider } from './app/signal-stores/auth-store';
import { DataService } from './app/services/data.service';

declare global {
  interface Window {
    handleOauthResponse: (response: any) => void;
    authStoreProvider: AuthStoreProvider;
    dataService: DataService;
  }
}

function decodeJwtResponse(token: string) {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

window.handleOauthResponse = (response: any) => { 
  window.dataService.validateToken(response.credential).subscribe({
    next: response => {
      let result = response as string;
      let responsePayload = decodeJwtResponse(result);

      window.authStoreProvider.store.update({ 
        name: responsePayload.name, 
        sub: responsePayload.sub, 
        given_name: responsePayload.given_name, 
        family_name: responsePayload.family_name, 
        email: responsePayload.email,
        picture: responsePayload.website 
      }
    );
      window.authStoreProvider.saveToken(result);
      window.location.href = '/login-result';
    }
  });

}

bootstrapApplication(AppComponent, appConfig)
  .then(ref => {
    window.authStoreProvider = ref.injector.get(AuthStoreProvider);
    window.dataService = ref.injector.get(DataService);
  })
  .catch((err) => console.error(err));


