import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStoreProvider } from '../../signal-stores/auth-store';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less'
})
export class FooterComponent {
  authProvider: AuthStoreProvider;

  constructor(private router: Router, private authStoreProvider: AuthStoreProvider) {
    this.authProvider = authStoreProvider;
  }
}
