import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { CartApiService } from 'src/app/services/cart-api-service';
import { CartMangerSewrvice } from 'src/app/services/cart-manger-sewrvice';
export interface CartItem {
   courseType: string;
  levels: {
    cartId: string;
    courseLevel: string;
    courseLevelPrice: string;
  }[];
}
@Component({
  selector: 'app-cart-page',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './cart-page.page.html',
  styleUrls: ['./cart-page.page.scss'],
})
export class CartPagePage implements OnInit {
 cartItems: CartItem[] = [];
  workSheetRnm: string = '';
  studentId: string = '';
  totalAmount: number = 0;

  cartGroups: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private cartManager: CartMangerSewrvice,
    private api: CartApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.workSheetRnm = params['worksheetRnm'];
    this.studentId = params['studentId'];

    console.log("RNM:", this.workSheetRnm);
    console.log("StudentId:", this.studentId);

    this.loadCart();
  });
  }

 async loadCart() {

  try {

    console.log("LOAD CART RNM:", this.workSheetRnm);

    const res: any = await this.api.getCartList(this.workSheetRnm);

    if (res?.errorCode === '200' && res.result?.length > 0) {

      this.cartGroups = res.result;   // ✅ FULL RESPONSE STORE

      // flatten for total calculation
      this.cartItems = res.result.flatMap((g: any) =>
        g.courseLevels.map((l: any) => ({
          ...l,
          courseType: g.courseType
        }))
      );

      this.recalculateTotal();

    } else {
      this.cartGroups = [];
      this.cartItems = [];
    }

  } catch (err) {
    console.error(err);
  }
}

async removeCartItem(cartId: string) {
  try {
    const res: any = await this.api.deleteCartItem(cartId);

    if (res?.errorCode === '200') {

      this.cartGroups = this.cartGroups.map(group => {
        return {
          ...group,
          courseLevels: group.courseLevels.filter(
            (l: any) => l.cartId !== cartId
          )
        };
      }).filter(g => g.courseLevels.length > 0);

      this.recalculateTotal();
      this.showAlert('Item removed from cart');
    }

  } catch (err) {
    console.error(err);
  }
}



async checkout() {
  try {
    console.log('Checkout Clicked');

    // 🔥 Save cart data (IMPORTANT)
    localStorage.setItem('cartLevels', JSON.stringify(this.cartItems));

    const res: any = await this.api.checkout(
      this.workSheetRnm,
      this.studentId,
      this.totalAmount
    );

    console.log('Checkout Response:', res);

    if (res && res.errorCode === '200') {

      const result = res.result;

      const merchantRefNo = result?.MerchantRefNo;
      const amount = result?.price;

      console.log('OrderId:', merchantRefNo);
      console.log('Amount:', amount);

      // ✅ Navigate
      this.router.navigate(['/check-out-page'], {
        queryParams: {
          StudentId: this.studentId,
          WorkRNM: this.workSheetRnm,
          TotalAmount: amount,
          merchantRef: merchantRefNo
        }
      });

    } else {
      console.log('API Failed:', res);
    }

  } catch (err) {
    console.error('Checkout Error:', err);
  }
}
 recalculateTotal() {
  let total = 0;

  this.cartGroups.forEach(group => {
    group.courseLevels.forEach((level: any) => {
      total += Number(level.courseLevelPrice || 0);
    });
  });

  this.totalAmount = total;
}


  continueShopping() {
    this.router.navigate(['/work-sheet-subscription-courses']);
  }


  async showAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Info',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
