import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// 1. IMPORT THESE TWO MODULES
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule } from '@angular/forms'; 

// Import your components
import { TransactionsComponent } from './components/transactions/transactions.component';
import { RedemptionComponent } from './components/redemption/redemption.component';
import { HistoryComponent } from './components/history/history.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddCreditCardComponent } from './components/add-credit-card/add-credit-card.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    RedemptionComponent,
    HistoryComponent,
    CustomerListComponent,
    CustomerDashboardComponent,
    AddCustomerComponent,
    AddCreditCardComponent,
    LoginComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    // 2. ADD THEM TO THIS LIST
    HttpClientModule, 
    FormsModule       
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }