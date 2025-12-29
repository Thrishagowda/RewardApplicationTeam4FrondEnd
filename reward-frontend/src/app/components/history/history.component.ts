import { Component, OnInit } from '@angular/core';
import { RewardApiService } from '../../services/reward-api.service';
import { RedemptionHistory } from '../../models/api-models';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history: RedemptionHistory[] = [];
  isLoading = true; // Start loading immediately
  errorMsg = '';

  constructor(private apiService: RewardApiService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory() {
    this.apiService.getHistory().subscribe({
      next: (data) => {
        this.history = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading history", err);
        this.errorMsg = "Failed to load history.";
        this.isLoading = false;
      }
    });
  }
}