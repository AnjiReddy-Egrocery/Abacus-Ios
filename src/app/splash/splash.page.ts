import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
   standalone: true,
  imports: [IonicModule],
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage  {

  constructor(private router: Router) { }

 async ngOnInit() {

    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3200);

  }

}
