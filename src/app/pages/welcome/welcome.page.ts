import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import Swiper, { Pagination } from 'swiper';






@Component({
  selector: 'app-welcome',
   standalone: true,
  imports: [IonicModule, FormsModule, RouterModule, CommonModule],

  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
 

  constructor(private navCtrl: NavController) {}

  // Handle "Next" button click


  ngOnInit() {

  }

  

}


