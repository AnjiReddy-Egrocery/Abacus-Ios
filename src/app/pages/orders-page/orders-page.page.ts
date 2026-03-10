import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
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

  constructor(
    private api: OrderServices,
    private navCtrl: NavController,
    private router: Router, private menu: MenuController,
    private route: ActivatedRoute,
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

      const res = await this.api.getStudentOrders(studentId);

      if (res?.result?.worksheetOrders) {
        this.orders = res.result.worksheetOrders;
      }

      console.log("Orders:", this.orders);

    } catch (e) {
      console.error("Orders Load Error", e);
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