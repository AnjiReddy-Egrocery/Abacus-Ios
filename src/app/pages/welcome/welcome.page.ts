import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-welcome',
   standalone: true,
  imports: [IonicModule, FormsModule, RouterModule, CommonModule],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
 
 @ViewChild('swiper') swiper!: ElementRef;
  isLastSlide = false;

  constructor(private router: Router, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();

    // Skip welcome if not first time
    const isFirstTime = await this.storage.get('firstTime');
    if (isFirstTime === false) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  next() {
    const swiperEl: any = this.swiper.nativeElement;
    swiperEl.swiper.slideNext();

    const index = swiperEl.swiper.activeIndex;
    this.isLastSlide = index === 2;
  }

  onSlideChange(event: any) {
    const swiper = event.target.swiper;
    this.isLastSlide = swiper.activeIndex === 2;
  }

  async skip() {
    await this.storage.set('firstTime', false);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async start() {
    await this.storage.set('firstTime', false);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}