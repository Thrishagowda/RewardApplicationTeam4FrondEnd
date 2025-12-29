import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// FIXED PATHS: Only one dot set (..) is needed here
import { RewardApiService } from '../services/reward-api.service';
import { Customer } from '../models/api-models';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  customer: Customer | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: RewardApiService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.fetchCustomerDetails(Number(idParam));
    }
  }

  fetchCustomerDetails(id: number) {
    this.apiService.getCustomerById(id).subscribe({
      next: (data) => {
        this.customer = data;
        
        // UPDATED: Check array length instead of just existence
        if (data.creditCard && data.creditCard.length > 0) {
           // Use the FIRST card in the list
           const mainCard = data.creditCard[0];
           this.apiService.setCustomerContext(data.customerId, mainCard.cardNumber);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("Customer not found", err);
        this.loading = false;
      }
    });
  }
}