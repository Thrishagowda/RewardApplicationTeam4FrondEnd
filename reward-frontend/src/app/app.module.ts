import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 1. IMPORT THESE TWO MODULES
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; 

// Import your components
import { TransactionsComponent } from './components/transactions/transactions.component';
import { RedemptionComponent } from './components/redemption/redemption.component';
import { HistoryComponent } from './components/history/history.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    RedemptionComponent,
    HistoryComponent,
    CustomerListComponent,
    CustomerDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    // 2. ADD THEM TO THIS LIST
    HttpClientModule, 
    FormsModule       
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }