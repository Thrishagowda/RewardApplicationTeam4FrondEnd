import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RewardApiService } from '../../services/reward-api.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  // Get Today's Date in YYYY-MM-DD format
  maxDate: string = new Date().toISOString().split('T')[0];

  // Form Model
  customer = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
    doj: this.maxDate, // Default to today
    isActive: true,
    customerType: 'REGULAR' 
  };

  isLoading = false;
  message = '';
  errorMsg = '';

  constructor(private apiService: RewardApiService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.message = '';
    this.errorMsg = '';

    this.apiService.addCustomer(this.customer).subscribe({
      next: (res) => {
        this.message = 'Customer Added Successfully!';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Failed to add customer. Check inputs.';
        this.isLoading = false;
      }
    });
  }
}