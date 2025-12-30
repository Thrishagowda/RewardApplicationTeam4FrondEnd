import { Component, OnInit } from '@angular/core';
import { RewardApiService } from '../../services/reward-api.service';
import { RewardItem, RedemptionRequest } from '../../models/api-models';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.css']
})
export class RedemptionComponent implements OnInit {

  catalog: RewardItem[] = [];
  selectedItems: Set<string> = new Set(); 
  
  totalPointsRequired = 0;
  currentBalance = 0; // We will check this against the user's balance
  isLoading = false;
  
  successMsg = '';
  errorMsg = '';

  constructor(private apiService: RewardApiService) {}

  ngOnInit(): void {
    this.loadCatalog();
    this.loadUserBalance();
  }

  loadUserBalance() {
    this.apiService.getCustomerById(this.apiService.customerId).subscribe({
      next: (data) => {
        // FIX: Check if array has items, then read the first one [0]
        if (data.creditCard && data.creditCard.length > 0) {
          this.currentBalance = data.creditCard[0].rewardPoints || 0;
        } else {
          this.currentBalance = 0;
        }
      }
    });
  }

  loadCatalog() {
    this.isLoading = true;
    this.apiService.getCatalog().subscribe({
      next: (data) => {
        this.catalog = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading catalog", err);
        this.errorMsg = "Failed to load rewards. Is Backend running?";
        this.isLoading = false;
      }
    });
  }

  toggleItem(item: RewardItem, event: any) {
    if (event.target.checked) {
      this.selectedItems.add(item.name);
      this.totalPointsRequired += item.pointsRequired;
    } else {
      this.selectedItems.delete(item.name);
      this.totalPointsRequired -= item.pointsRequired;
    }
  }

  redeemPoints() {
    if (this.selectedItems.size === 0) return;

    // Frontend Check: Don't let them click if they don't have points
    if (this.totalPointsRequired > this.currentBalance) {
      this.errorMsg = "Insufficient Balance!";
      return;
    }

    this.isLoading = true;
    this.successMsg = '';
    this.errorMsg = '';

    const request: RedemptionRequest = {
      itemNames: Array.from(this.selectedItems),
      totalPoints: this.totalPointsRequired
    };

    this.apiService.redeemPoints(request).subscribe({
      next: (res) => {
        this.successMsg = `Success! Order ID: ${res.orderId}. New Balance: ${res.remainingBalance}`;
        this.currentBalance = res.remainingBalance; // Update UI immediately
        this.isLoading = false;
        this.selectedItems.clear();
        this.totalPointsRequired = 0;
        this.uncheckAll();
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Redemption Failed!';
        this.isLoading = false;
      }
    });
  }

  uncheckAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach(cb => cb.checked = false);
  }
}