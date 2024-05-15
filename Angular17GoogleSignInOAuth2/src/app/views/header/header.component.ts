import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStoreProvider } from '../../signal-stores/auth-store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {

  authProvider: AuthStoreProvider;

  constructor(private router: Router, private authStoreProvider: AuthStoreProvider) {
    this.authProvider = authStoreProvider;
  }

  manual() {
    const user = this.authProvider.store.user();
    this.authProvider.store.update(user!);

    //this.router.navigate(['/login']);
  }
}
