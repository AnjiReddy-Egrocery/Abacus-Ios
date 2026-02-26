import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-splash',
   standalone: true,
  imports: [IonicModule],
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage  {

  constructor(private router: Router, private storage: Storage) { }



   async ngOnInit() {

    // 1️⃣ Initialize storage first
    await this.storage.create();

    // 2️⃣ Get login state
    const loggedIn = await this.storage.get('isLoggedIn');

    // 3️⃣ Navigate after splash delay
    setTimeout(() => {
      if (loggedIn) {
        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      } else {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    }, 3200);

  }

}
