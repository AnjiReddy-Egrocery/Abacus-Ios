import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PhonePayApi } from 'src/app/services/phone-pay-api';

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

   constructor(private route: ActivatedRoute,private router: Router,private paymentService: PhonePayApi) {}

  ngOnInit() {

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
    console.log('Pay Now Clicked');

    try {

      // ✅ STEP 1: TOKEN
      const tokenRes: any = await this.paymentService.generateToken().toPromise();
      const accessToken = tokenRes.access_token;

      console.log('Token:', accessToken);

      // ✅ STEP 2: CREATE ORDER
      const amountInPaisa = Number(this.totalAmount) * 100;
      const merchantOrderId = 'TX' + new Date().getTime();

      const request = {
        merchantOrderId: merchantOrderId,
        amount: amountInPaisa,
        payableAmount: amountInPaisa,
        metaInfo: {
          udf1: 'Test1',
          udf2: 'Test2'
        },
        paymentFlow: {
          type: 'PG_CHECKOUT'
        }
      };

      const orderRes: any = await this.paymentService
        .createOrder(accessToken, request)
        .toPromise();

      console.log('Order Response:', orderRes);

      const orderId = orderRes.orderId;
      const token = orderRes.token;

      // ✅ STEP 3: START PAYMENT
      this.startPayment(orderId, token);

    } catch (err) {
      console.error('Payment Error:', err);
    }
  }


  startPayment(orderId: String, token: any) {
     const payload = {
      orderId: orderId,
      merchantId: 'M23EB6GY8RWOK',
      token: token,
      paymentMode: {
        type: 'PAY_PAGE'
      }
    };

    const request = JSON.stringify(payload);

    console.log('Payment Payload:', request);

    // 🔥 Base64 Encode
    const base64Request = btoa(request);

    // 🔥 Payment URL
    const paymentUrl = `https://api.phonepe.com/apis/hermes/pg/v1/pay?request=${base64Request}`;

    console.log('Redirecting to:', paymentUrl);

    // 👉 Open PhonePe Page
    window.location.href = paymentUrl;
  }
  }


