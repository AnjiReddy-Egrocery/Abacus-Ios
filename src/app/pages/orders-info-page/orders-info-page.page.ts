import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BaseChartDirective } from 'ng2-charts';
import { OrderInfoServices } from 'src/app/services/order-info-services';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
@Component({
  selector: 'app-orders-info-page',
  standalone: true,
        imports: [IonicModule, FormsModule, CommonModule, BaseChartDirective],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './orders-info-page.page.html',
  styleUrls: ['./orders-info-page.page.scss'],
})
export class OrdersInfoPagePage implements OnInit {
  @ViewChild('rootLayout') rootLayout!: ElementRef;
studentId:any;
  orderId:any;

  order:any;
  subscriptions:any[]=[];

  constructor(
    private route: ActivatedRoute,
    private api: OrderInfoServices,
    private router: Router
  ) {}

  async ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.studentId = params['studentId'];
      this.orderId = params['orderId'];

      this.loadOrderInfo(this.studentId, this.orderId);

    });

  }

  async loadOrderInfo(studentId: any, orderId: any){

    const res:any = await this.api.getOrderInfo(studentId, orderId);

    console.log("ORDER INFO:",res);

    if(res?.result?.worksheetOrderInfo){

      this.order = res.result.worksheetOrderInfo[0];

      this.subscriptions = this.order.subscriptions;

    }

  }
async generatePDF(){

  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text("Order Receipt", 14, 20);

  pdf.setFontSize(12);
  pdf.text("Ordered On: " + this.formatDate(this.order?.orderedOn), 14, 40);
  pdf.text("Status: " + this.order?.state, 14, 50);
  pdf.text("Amount: " + this.order?.Amount, 14, 60);

  const tableData:any[] = [];

  this.subscriptions.forEach((sub:any, index:number)=>{
    tableData.push([
      index + 1,
      sub.courseType + " - " + sub.courseLevel,
      sub.amount
    ]);
  });

  autoTable(pdf,{
    startY: 80,
    head:[['S No','Course Info','Amount']],
    body:tableData
  });

  const pdfBase64 = pdf.output('datauristring').split(',')[1];

  const fileName = "OrderReceipt.pdf";

  await Filesystem.writeFile({
    path: fileName,
    data: pdfBase64,
    directory: Directory.Documents
  });

  await Share.share({
    title: 'Order Receipt',
    text: 'Download your receipt',
    url: fileName
  });

}

  goHome(){

 
    this.router.navigate(['/orders-page'],{
    queryParams:{
      studentId:this.studentId
    }
  });
  
  }

  formatDate(timestamp:string){

    const date = new Date(Number(timestamp)*1000);

    return date.toLocaleString('en-IN',{
      day:'2-digit',
      month:'short',
      year:'numeric',
      hour:'2-digit',
      minute:'2-digit'
    });

  }

}