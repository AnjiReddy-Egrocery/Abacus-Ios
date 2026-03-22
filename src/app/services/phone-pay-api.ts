import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhonePayApi {
   constructor(private http: HttpClient) {}

  // 🔥 GENERATE TOKEN
  generateToken() {
    const body = new URLSearchParams();
    body.set('client_id', 'SU2512311150282994206185');
    body.set('client_version', '1');
    body.set('client_secret', '6108bcdf-e9e8-4d7f-9c8f-12724cd06134');
    body.set('grant_type', 'client_credentials');

    return this.http.post(
      'https://api.phonepe.com/apis/identity-manager/v1/oauth/token',
      body.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
  }

  // 🔥 CREATE ORDER
  createOrder(token: string, request: any) {
    return this.http.post(
      'https://api.phonepe.com/apis/pg/checkout/v2/sdk/order',
      request,
      {
        headers: {
          Authorization: `O-Bearer ${token}`
        }
      }
    );
  }

  // 🔥 CHECK STATUS (optional)
  checkStatus(token: string, orderId: string) {
    return this.http.get(
      `https://api.phonepe.com/apis/pg/checkout/v2/order/${orderId}/status?details=true&errorContext=true`,
      {
        headers: {
          Authorization: `O-Bearer ${token}`
        }
      }
    );
  }
}
