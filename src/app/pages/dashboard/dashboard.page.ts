import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, IonMenu, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  
  
  constructor(private menuCtrl: MenuController,private router: Router) {}

  ngOnInit() {
  }

    closeMenu() {
         this.menuCtrl.close('mainMenu'); // pass your menuId

  }

    goToPlaywithNumbers(page: string) {
    this.menuCtrl.close('mainMenu'); // Close menu first
    this.router.navigateByUrl('/playwithnumbers', { replaceUrl: true });
  }



}
