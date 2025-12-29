import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Import all your components
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { RedemptionComponent } from './components/redemption/redemption.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  // 1. DEFAULT ROUTE: Show Customer List first
  { path: '', component: CustomerListComponent },

  // 2. Dashboard (Needs an ID, like /dashboard/1)
  { path: 'dashboard/:id', component: CustomerDashboardComponent },

  // 3. Other Pages
  { path: 'transactions', component: TransactionsComponent },
  { path: 'redeem', component: RedemptionComponent },
  { path: 'history', component: HistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }