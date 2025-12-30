import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users: any[] = [];
  newUser = { userName: '', password: '' };
  
  isLoading = false;
  message = '';
  errorMsg = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error("Failed to load users", err)
    });
  }

  addUser() {
    if(!this.newUser.userName || !this.newUser.password) return;
    
    this.isLoading = true;
    this.message = '';
    this.errorMsg = '';

    this.authService.addUser(this.newUser).subscribe({
      next: (res) => {
        this.message = "User created successfully!";
        this.newUser = { userName: '', password: '' }; // Reset form
        this.isLoading = false;
        this.loadUsers(); // Refresh list
      },
      error: (err) => {
        this.errorMsg = "Failed to create user. Username might exist.";
        this.isLoading = false;
      }
    });
  }

  deleteUser(username: string) {
    if(!confirm(`Delete user ${username}?`)) return;

    this.authService.deleteUser(username).subscribe({
      next: (res) => {
        alert(res);
        this.loadUsers();
      },
      error: (err) => alert("Could not delete user.")
    });
  }
}