import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RewardApiService } from '../../services/reward-api.service';
import { Customer } from '../../models/api-models';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  
  searchName: string = '';
  searchCard: string = '';
  isLoading = false;
  errorMsg = '';

  constructor(private apiService: RewardApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.isLoading = true;
    this.apiService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading customers", err);
        this.errorMsg = "Failed to load customers.";
        this.isLoading = false;
      }
    });
  }

  onSearch() {
    this.filteredCustomers = this.customers.filter(c => {
      // 1. Name Check
      const fullName = (c.firstName + ' ' + c.lastName).toLowerCase();
      
      // 2. Card Check (UPDATED for Array)
      // We check if the 'creditCard' array exists and has at least 1 item
      const firstCard = (c.creditCard && c.creditCard.length > 0) ? c.creditCard[0] : null;
      const cardNum = firstCard?.cardNumber || ''; 

      return fullName.includes(this.searchName.toLowerCase()) && 
             cardNum.includes(this.searchCard);
    });
  }

  viewCustomer(custId: number) {
    this.router.navigate(['/dashboard', custId]);
  }
}