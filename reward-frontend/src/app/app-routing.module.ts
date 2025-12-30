import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { RedemptionComponent } from './components/redemption/redemption.component';
import { HistoryComponent } from './components/history/history.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddCreditCardComponent } from './components/add-credit-card/add-credit-card.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

const routes: Routes = [
  // 1. Login Page (Public)
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard] },

  // 2. Protected Routes (Require Login)
  { path: '', component: CustomerListComponent, canActivate: [AuthGuard] }, 
  { path: 'dashboard/:id', component: CustomerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-customer', component: AddCustomerComponent, canActivate: [AuthGuard] },
  { path: 'add-card/:id', component: AddCreditCardComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: 'redeem', component: RedemptionComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },

  // 3. Fallback: Redirect unknown paths to Login
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }