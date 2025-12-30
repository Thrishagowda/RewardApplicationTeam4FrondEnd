import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reward-frontend';

  // Inject Router so the HTML can check "router.url"
  constructor(public router: Router, public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}