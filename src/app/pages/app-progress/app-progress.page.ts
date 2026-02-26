import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-app-progress',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './app-progress.page.html',
  styleUrls: ['./app-progress.page.scss'],
})
export class AppProgressPage implements OnInit {

 formattedAboutText: SafeHtml = '';

  constructor(private navCtrl: NavController, private sanitizer: DomSanitizer,private router: Router, private menu: MenuController) {
    this.buildSettingsText();
  }

    async goHome() {
       await this.menu.close();
    this.router.navigate(['/dashboard']);
  }


  ngOnInit(): void {}

 buildSettingsText() {
  const headingsStyle = 'color:#4d148c; font-weight:bold; font-size:1.2rem; margin-top:1rem;';
  const subheadingsStyle = 'color:#4d148c; font-weight:bold; font-size:1.1rem; margin-top:0.8rem;';
  const paragraphStyle = 'font-size:1rem; color:#000; line-height:1.5; margin:0.5rem 0 1rem 0;';

  const html = `
    <div style="${headingsStyle}">Abacus Trainer Profile Progress Tracker</div>
    <p style="${paragraphStyle}">
     Track your learning journey and monitor your progress across different levels. This section helps you view completed lessons, practice performance, skill improvements, and overall growth. Stay motivated by checking your achievements and milestones as you advance through the Abacus training program.
    </p>

   
  `;

  // ✅ Tell Angular this HTML is safe
  this.formattedAboutText = this.sanitizer.bypassSecurityTrustHtml(html);
}
}


