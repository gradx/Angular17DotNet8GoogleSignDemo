import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AuthUser } from '../models/auth-user';
import { Injectable } from '@angular/core';

const AUTH_USER_TOKEN = "AuthUserToken"

type AuthState = {
  user: AuthUser | null;
  updated: string;
};

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(AUTH_USER_TOKEN) || '{}'),
  updated: JSON.stringify(new Date()),
};

export const AuthStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    update(user: AuthUser): void {
      localStorage.setItem(AUTH_USER_TOKEN, JSON.stringify(user));

      patchState(store, 
        { user : user },
        { updated: JSON.stringify(new Date()) } // non object update required for event bubbling
      );
    },
  }))
);

@Injectable({ providedIn: 'root' }) // root required for main.ts
export class AuthStoreProvider {
  public store = new AuthStore();
  readonly APP_TOKEN = 'APP_TOKEN';

  saveToken(data: string) {
    sessionStorage.setItem(this.APP_TOKEN, data);
  }

  getToken() : string | null {
    return sessionStorage.getItem(this.APP_TOKEN);
  }
}
