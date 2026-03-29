import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { OrderResponse, OrderStatusResponse, TokenResponse } from '../model/phonepe.models';

@Injectable({
  providedIn: 'root',
})
export class PhonePayApi {
 private BASE_URL = 'https://api-preprod.phonepe.com/';
  private accessToken: string = '';

  // ---------------- TOKEN ----------------
  async generateToken(): Promise<string> {

    const body = new URLSearchParams();
    body.set('client_id', 'M23EB6GY8RWOK_2601021928');
    body.set('client_version', '1');
    body.set('client_secret', 'ZjBlZDlhNzQtOWRjOC00YzQzLWJkM2ItNDRiMTY0YTExMGZh');
    body.set('grant_type', 'client_credentials');

    const res: HttpResponse = await CapacitorHttp.post({
      url: `${this.BASE_URL}apis/identity-manager/v1/oauth/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: body.toString()
    });

    const data = res.data as TokenResponse;

    this.accessToken = data.access_token;

    console.log('✅ TOKEN:', this.accessToken);

    return this.accessToken;
  }

  // ---------------- CREATE ORDER ----------------
  async createOrder(amountInRupees: number): Promise<OrderResponse> {

    if (!this.accessToken) {
      throw new Error('Access token missing');
    }

    const amountInPaisa = Math.floor(amountInRupees * 100);
    const merchantOrderId = 'TX' + Date.now();

    const body = {
      merchantOrderId: merchantOrderId,
      amount: amountInPaisa,
     expireAfter: 3600,

      metaInfo: {
        udf1: 'StudentPayment',
        udf2: 'Abacus'
      },

      paymentFlow: {
        type: 'PG_CHECKOUT'
      }
    };

    const res: HttpResponse = await CapacitorHttp.post({
      url: `${this.BASE_URL}apis/pg/checkout/v2/sdk/order`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `O-Bearer ${this.accessToken}`
      },
      data: body
    });

    const order = res.data as OrderResponse;

    console.log('✅ ORDER:', order);

    return order;
  }

  // ---------------- CHECK STATUS ----------------
  async checkStatus(orderId: string): Promise<OrderStatusResponse> {

    if (!this.accessToken) {
      throw new Error('Access token missing');
    }

    const res: HttpResponse = await CapacitorHttp.get({
      url: `${this.BASE_URL}apis/pg/checkout/v2/order/${orderId}/status?details=true&errorContext=true`,
      headers: {
        Authorization: `O-Bearer ${this.accessToken}`
      }
    });

    const status = res.data as OrderStatusResponse;

    console.log('✅ STATUS:', status);

    return status;
  }
}