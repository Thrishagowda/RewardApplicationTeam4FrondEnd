import { Component, OnInit } from '@angular/core';
import { RewardApiService } from '../../services/reward-api.service';
import { Transaction } from '../../models/api-models';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = [];
  pendingCount = 0; // We track this to enable/disable the button
  
  isLoading = false;
  message = '';
  errorMsg = '';

  constructor(private apiService: RewardApiService) {}

  ngOnInit(): void {
    // Optional: this.loadTransactions();
  }

  loadTransactions() {
    this.isLoading = true;
    this.message = '';
    this.errorMsg = '';
    
    this.apiService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        // Count how many are pending so we know if there is work to do
        this.pendingCount = data.filter(t => t.status === 'PENDING').length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = "Failed to load transactions.";
        this.isLoading = false;
      }
    });
  }

  // --- NEW LOGIC: Process ALL Pending ---
  processAll() {
    // 1. Find all pending IDs automatically
    const pendingIds = this.transactions
      .filter(t => t.status === 'PENDING')
      .map(t => t.transactionId);

    if (pendingIds.length === 0) return;

    this.isLoading = true;

    // 2. Send them to backend
    this.apiService.processTransactions(pendingIds).subscribe({
      next: (res) => {
        this.message = `Success! Processed ${res.processedCount} transactions. Points Added: ${res.totalPointsAdded}`;
        this.isLoading = false;
        this.loadTransactions(); // Refresh list to update status to 'PROCESSED'
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = "Processing failed.";
        this.isLoading = false;
      }
    });
  }
}