import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardApiService } from '../../services/reward-api.service';

@Component({
  selector: 'app-add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.css']
})
export class AddCreditCardComponent implements OnInit {

  customerId: number = 0;
  cardNumber: string = '';
  
  isLoading = false;
  message = '';
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: RewardApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get customer ID from URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.customerId = Number(id);
  }

  onSubmit() {
    this.isLoading = true;
    
    // Backend expects CreditCardDTO
    const cardData = {
      cardNumber: this.cardNumber,
      isCardActive: true
      // Add 'cardType' or 'expiry' here if your DTO requires it
    };

    this.apiService.addCreditCard(this.customerId, cardData).subscribe({
      next: (res) => {
        this.message = 'Card Linked Successfully!';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/dashboard', this.customerId]), 1500);
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Failed to add card. Duplicate number?';
        this.isLoading = false;
      }
    });
  }
}