import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    // Clear previous errors
    this.errorMsg = '';
    
    const creds = { userName: this.username, password: this.password };
    
    this.authService.login(creds).subscribe({
      next: (res) => {
        // 1. Save Token
        this.authService.saveToken(res.token);
        // 2. Redirect to Home
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = "Invalid Username or Password";
      }
    });
  }
}