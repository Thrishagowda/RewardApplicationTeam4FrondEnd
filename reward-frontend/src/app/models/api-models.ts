export interface Customer {
    customerId: number;
    firstName: string;
    lastName: string;
    doj: string;
    email: string;
    phoneNum: number;
    
    // CHANGE THIS: It is an Array [] based on your JSON
    creditCard?: CreditCard[]; 
    
    customerType: string;
    isActive: boolean;
  }
  export interface CreditCard {
    cardId: number;
    cardNumber: string;
    isCardActive: boolean;
    customer?: Customer;
    rewardPoints?: number;
  }
  
  export interface Transaction {
    transactionId: string;
    item: string;
    amount: number;
    
    transactionDate: string;  
    
    status: string;
    creditCard: CreditCard;
  }
  
  export interface RewardItem {
    id: number;
    name: string;
    category: string;
    pointsRequired: number;
    imageUrl: string;
  }
  
  export interface RedemptionRequest {
    itemNames: string[];
    totalPoints: number;
  }
  
  export interface RedemptionResponse {
    status: string;
    orderId: string;
    pointsBurned: number;
    remainingBalance: number;
  }
  
  export interface RedemptionHistory {
    orderId: string;
    itemsRedeemed: string; 
    pointsRedeemed: number;
    redemptionDate: string;
    status: string;
  }