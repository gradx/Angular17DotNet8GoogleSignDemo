import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStoreProvider }  from './signal-stores/auth-store';
import { HeaderComponent } from './views/header/header.component';
import { DataService } from './services/data.service';
import { FooterComponent } from './views/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  providers: [AuthStoreProvider, DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})


export class AppComponent {
  title = 'Angular17GoogleSignInOAuth2';
  constructor() { }
}
