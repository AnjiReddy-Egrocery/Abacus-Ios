export interface TokenResponse {
  access_token: string;
  encrypted_access_token?: string;
}

// ---------------- ORDER ----------------

export interface OrderRequest {
  merchantOrderId: string;
  amount: number;
  expireAfter: number;
  metaInfo: MetaInfo;
  paymentFlow: PaymentFlow;
}

export interface MetaInfo {
  udf1: string;
  udf2: string;
}

export interface PaymentFlow {
  type: string; // PG_CHECKOUT
}

export interface OrderResponse {
  orderId: string;
  state: string;
  expireAt: number;
  token: string;
}

// ---------------- STATUS ----------------

export interface OrderStatusResponse {
  orderId: string;
  state: string;
  amount: number;
  payableAmount: number;
  feeAmount: number;
  expireAt: number;
  paymentDetails: PaymentDetail[];
  errorContext?: ErrorContext;
}

export interface PaymentDetail {
  transactionId: string;
  paymentMode: string;
  timestamp: number;
  amount: number;
  state: string;
}

export interface ErrorContext {
  errorCode: string;
  detailedErrorCode?: string;
  description?: string;
}