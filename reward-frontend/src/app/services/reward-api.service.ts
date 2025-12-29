import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
// ADDED Customer import here
import { Transaction, RewardItem, RedemptionRequest, RedemptionResponse, RedemptionHistory, Customer } from '../models/api-models';

@Injectable({
  providedIn: 'root'
})
export class RewardApiService {

  private baseUrl = 'http://localhost:9090/api/v1';

  // CHANGED TO PUBLIC so RedemptionComponent can read it
  public customerId = 1; 
  public cardNumber = "6767090943431234"; 

  constructor(private http: HttpClient) { }

  // --- Helper to update context ---
  setCustomerContext(custId: number, cardNum: string) {
    this.customerId = custId;
    this.cardNumber = cardNum;
  }

  // --- Customer Operations ---
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/allCustomer`);
  }

  getCustomerById(custId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${custId}`);
  }

  // --- Transactions ---
  getTransactions(): Observable<Transaction[]> {
    const url = `${this.baseUrl}/customers/${this.customerId}/cards/${this.cardNumber}/transactions`;
    return this.http.get<Transaction[]>(url);
  }

  processTransactions(transactionIds: string[]): Observable<any> {
    const url = `${this.baseUrl}/customers/${this.customerId}/cards/${this.cardNumber}/transactions/process`;
    return this.http.post(url, transactionIds);
  }

  // --- Redemption & Catalog ---
  getCatalog(): Observable<RewardItem[]> {
    return this.http.get<RewardItem[]>(`${this.baseUrl}/rewards/catalog`);
  }

  redeemPoints(request: RedemptionRequest): Observable<RedemptionResponse> {
    const url = `${this.baseUrl}/customers/${this.customerId}/cards/${this.cardNumber}/redemptions`;
    return this.http.post<RedemptionResponse>(url, request);
  }

  getHistory(): Observable<RedemptionHistory[]> {
    const url = `${this.baseUrl}/customers/${this.customerId}/cards/${this.cardNumber}/redemptions/history`;
    return this.http.get<RedemptionHistory[]>(url);
  }
}