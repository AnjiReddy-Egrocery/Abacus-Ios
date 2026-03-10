export interface Subscription {
  courseType: string;
  courseLevel: string;
  amount: string;
}

export interface WorksheetOrderInfo {
  orderedOn: string;
  state: string;
  paymentThrough: string;
  PaymentMethod: string;
  currency: string;
  Amount: string;
  subscriptions: Subscription[];
}

export interface OrderInfoResponse {
  status: string;
  result: {
    worksheetOrderInfo: WorksheetOrderInfo[];
  };
}