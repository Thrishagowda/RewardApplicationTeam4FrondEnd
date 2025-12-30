import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardApiService } from '../services/reward-api.service';
import { Customer, CreditCard } from '../models/api-models'; // Added CreditCard import

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  customer: Customer | null = null;
  selectedCard: CreditCard | null = null; // Track the currently selected card
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: RewardApiService,
    private router: Router
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
        
        // Default to the first card if available
        if (data.creditCard && data.creditCard.length > 0) {
           this.onCardSelect(data.creditCard[0]);
        }
        
        this.loading = false;
      },
      error: (err) => {
        console.error("Customer not found", err);
        this.loading = false;
      }
    });
  }

  // --- NEW: Handle Card Switching ---
  onCardSelect(card: CreditCard) {
    this.selectedCard = card;
    if (this.customer) {
      // Update global context so Redeem/Transactions use THIS card
      this.apiService.setCustomerContext(this.customer.customerId, card.cardNumber);
    }
  }

  deleteCustomer() {
    if(!this.customer) return;
    if(confirm(`Are you sure you want to deactivate ${this.customer.firstName}?`)) {
      this.apiService.deleteCustomer(this.customer.customerId).subscribe({
        next: (res) => {
          alert("Customer Deactivated Successfully");
          this.router.navigate(['/']); 
        },
        error: (err) => alert("Failed to deactivate customer.")
      });
    }
  }
}