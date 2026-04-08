import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { IonicModule } from '@ionic/angular';
import { PhonePePaymentPlugin } from 'src/app/plugin/phonepe.plugin';
import { PhonePayApi } from 'src/app/services/phone-pay-api';
import { Browser } from '@capacitor/browser';
// ADD THIS:




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
  orderToken: string = ''; // ✅ ADD THIS

  request: string = '';
  


   constructor(private route: ActivatedRoute,private router: Router,private paymentService: PhonePayApi) {}

  async ngOnInit() {
    
      
     
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


      // PhonePePaymentPlugin.init({
      //     environment: 'SANDBOX', // or PRODUCTION
      //     merchantId: 'M23EB6GY8RWOK',
      //     flowId: 'user-12345-' + Date.now(),
      //     enableLogging: true,
      //   });

      PhonePePaymentPlugin.init({
        environment: 'SANDBOX',
        merchantId: 'M23EB6GY8RWOK',
        flowId: 'follw_123',
        enableLogging: true
      }).then(result => {
        console.log('VS: ' + JSON.stringify(result));
        postMessage("Message: SDK Initialisation ->" + JSON.stringify(result));
      }).catch(error => {
        console.log('VS: error:' + error.message);
        postMessage("error:" + error.message);
      })


    
  }

 

  goBack(){
     this.router.navigate(['/work-sheet-subscription-courses-details']);
  }

  

    // 👉 Here integrate PhonePe / Razorpay later
//   async payNow() {
//     alert('STEP 1 CLICK WORKING');

//   console.log('🔥 Pay Now Clicked');
// try {
//     // 1. Token
//     await this.paymentService.generateToken();

//     // 2. Create Order
//     const order = await this.paymentService.createOrder(Number(this.totalAmount));

//     console.log('ORDER:', order);

//     // 3. Start SDK
//     await this.startPayment(order.orderId, order.token);


    

//   } catch (err) {
//     console.error('Payment Error:', err);
//   }
// }

// async startPayment(orderId: string, token: string) {

//     const payload = {
//       "orderId":orderId,
//       "merchantId": 'M23EB6GY8RWOK',
//       "token": token,
//       "paymentMode": {
//         "type": "PAY_PAGE"
//       }
//     };

//    const request = JSON.stringify(payload);

//    console.log("Payload",request);

  
//    try {
//     // const res = await PhonePePaymentPlugin.startTransaction({
//     //   request: request,
//     //   appSchema: 'ionicDemoApp',
//     //   showLoaderFlag: true
//     // });

//     PhonePePaymentPlugin.startTransaction({
//       request: request,
//       appSchema: 'ionicDemoApp',
//       showLoaderFlag: true
//     }).then(a => {
//   console.log('VS: ' + JSON.stringify(a));
//   postMessage(JSON.stringify(a));
// }).catch(error => {
//   console.log('VS: error:' + error.message);
//   postMessage("error:" + error.message);
// })

//     console.log('SDK RESPONSE:');

//     setTimeout(() => {
//       this.checkPaymentStatus(orderId);
//     }, 3000);

//   } catch (error: any) {
//     console.error("SDK ERROR:", error.message);
//   }
// }



async payNow() {
  try {
    // 1️⃣ Generate sandbox token
    await this.paymentService.generateToken();

    // 2️⃣ Create order
    const order = await this.paymentService.createOrder(Number(this.totalAmount));
    this.lastOrderId = order.orderId;
    this.orderToken = order.token;

    console.log('✅ Order created:', order);

    const payload = {
      orderId: this.lastOrderId,
      merchantId: 'M23EB6GY8RWOK',
      token: this.orderToken,
      paymentMode: {
        type: 'PAY_PAGE'
      }
    };

    const result = await PhonePePaymentPlugin.startTransaction({
      request: JSON.stringify(payload),
      appSchema: 'phonepe://',
      showLoaderFlag: true,
    });

    console.log('✅ SDK Result:', result);

    if (result.status === 'SUCCESS') {
      this.checkPaymentStatus(this.lastOrderId);
    } else {
      alert('❌ Payment cancelled/failed');
    }

  } catch (err) {
    console.error('❌ Payment Error:', err);
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
