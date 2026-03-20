import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, MenuController, NavController } from '@ionic/angular';
import { BaseChartDirective } from 'ng2-charts';
import { WorksheetOrder } from 'src/app/model/order.model';
import { OrderServices } from 'src/app/services/order-services';

@Component({
  selector: 'app-orders-page',
  standalone: true,
        imports: [IonicModule, FormsModule, CommonModule, BaseChartDirective],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './orders-page.page.html',
  styleUrls: ['./orders-page.page.scss'],
})
export class OrdersPagePage implements OnInit {
 orders: WorksheetOrder[] = [];
  studentId:any;
  emptyMessage = '';

  constructor(
    private api: OrderServices,
    private navCtrl: NavController,
    private router: Router, private menu: MenuController,
    private route: ActivatedRoute,
     private alertCtrl: AlertController,
  ) {}

  async ngOnInit() {

     this.route.queryParams.subscribe(params => {
       console.log("Received Params:", params);
      this.studentId = params['studentId'];
      this.loadOrders(this.studentId);
    });

  }


   async goHome() {
       await this.menu.close();
    this.router.navigate(['/dashboard']);
  }

  async loadOrders(studentId: any) {

   try {
    const  res:any = await this.api.getStudentOrders(studentId);

    console.log("Orders API Response:", res);

    if (res.errorCode === '200' && res.result?.worksheetOrders?.length > 0) {
      this.orders = res.result.worksheetOrders;
      this.emptyMessage = '';
    } else {
      // 🔹 No orders found
      this.orders = [];
      this.emptyMessage = res.errorMessage || 'No orders found for this student.';

      // Optional: show alert as well
      const alert = await this.alertCtrl.create({
        header: 'No Courses',
        message: this.emptyMessage,
        buttons: ['OK']
      });
      await alert.present();
      }
      // ⚠️ Ionic AlertController is better; here just demo for navCtrl
      // await alert.present();
    

  } catch (e) {
    console.error("Orders Load Error", e);
    this.orders = [];
    this.emptyMessage = 'Failed to load orders. Please try again later.';
  }
}

  openOrder(orderId:string){

    this.navCtrl.navigateForward('/orders-info-page', {
      queryParams:{
        studentId:this.studentId,
        orderId:orderId
      }
    });

  }

  goBack(){
    this.navCtrl.back();
  }

  formatDate(timestamp:string){

    try{

      const date = new Date(Number(timestamp) * 1000);

      return date.toLocaleString('en-IN',{
        day:'2-digit',
        month:'long',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit'
      });

    }catch{
      return '-';
    }

  }

}