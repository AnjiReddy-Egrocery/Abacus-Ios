import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PhonePayApi } from 'src/app/services/phone-pay-api';
import { registerPlugin } from '@capacitor/core';

const PhonePe = registerPlugin<any>('PhonePePlugin');

@Component({
  selector: 'app-check-out-page',
    standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './check-out-page.page.html',
  styleUrls: ['./check-out-page.page.scss'],
})
export class CheckOutPagePage  {

  studentId: any;
  workRnm: any;
  totalAmount: any;
  merchantRef: any;

  levelNames: string[] = [];
  levelPrices: string[] = [];

  lastOrderId: string = ''; // ✅ ADD THIS
  


   constructor(private route: ActivatedRoute,private router: Router,private paymentService: PhonePayApi) {}

  async ngOnInit() {
      const flowId = 'FLOW_' + Date.now();
      try {
    const flowId = 'FLOW_' + Date.now();

    await PhonePe.initSDK({
      merchantId: 'M23EB6GY8RWOK',
      flowId: flowId
    });

    console.log('✅ PhonePe INIT SUCCESS');

  } catch (e) {
    console.error('❌ PhonePe INIT FAILED', e);
  }
    this.route.queryParams.subscribe(params => {
      this.studentId = params['StudentId'];
      this.workRnm = params['WorkRNM'];
      this.totalAmount = params['TotalAmount'];
      this.merchantRef = params['merchantRef'];

      console.log('Payment Data:', params);
    });

    // 👉 OPTIONAL (if stored in service/localStorage)
    const cart = JSON.parse(localStorage.getItem('cartLevels') || '[]');

    this.levelNames = cart.map((x: any) => x.courseLevel);
    this.levelPrices = cart.map((x: any) => x.courseLevelPrice);
  }

  goBack(){
     this.router.navigate(['/work-sheet-subscription-courses-details']);
  }

  

    // 👉 Here integrate PhonePe / Razorpay later
  async payNow() {
    alert('STEP 1 CLICK WORKING');

  console.log('🔥 Pay Now Clicked');
try {
    // 1. Token
    await this.paymentService.generateToken();

    // 2. Create Order
    const order = await this.paymentService.createOrder(Number(this.totalAmount));

    console.log('ORDER:', order);

    // 3. Start SDK
    await this.startPayment(order.orderId, order.token);

  } catch (err) {
    console.error('Payment Error:', err);
  }
}
async startPayment(orderId: string, token: string) {

  try {
    this.lastOrderId = orderId;

    const res = await PhonePe.startTransaction({
      orderId: orderId,
      token: token,
      appSchema: 'abacusapp123'
    });

    console.log('✅ SDK RESPONSE:', res);

    // 👉 Wait before checking status (important)
    setTimeout(() => {
      this.checkPaymentStatus(orderId);
    }, 3000);

  } catch (err) {
    console.error('❌ SDK ERROR:', err);
    alert('Payment initiation failed');
  }
}
async checkPaymentStatus(orderId: string, retry = 0) {

  if (retry > 5) {
    alert('❌ Payment Failed');
    return;
  }

  try {

    const status = await this.paymentService.checkStatus(orderId);
    const state = status.state?.toUpperCase();

    console.log('STATUS:', state);

    if (state === 'COMPLETED' || state === 'SUCCESS') {

      alert('✅ Payment Success');
      // 👉 next screen ki vellachu

    } else if (state === 'FAILED') {

      alert('❌ Payment Failed');

    } else if (state === 'EXPIRED') {

      alert('⛔ Session Expired. Try again');

    } else {
      // ⏳ pending → retry
      setTimeout(() => {
        this.checkPaymentStatus(orderId, retry + 1);
      }, 3000);
    }

  } catch (err) {
    console.error('Status Error:', err);

    setTimeout(() => {
      this.checkPaymentStatus(orderId, retry + 1);
    }, 3000);
  }
}
}