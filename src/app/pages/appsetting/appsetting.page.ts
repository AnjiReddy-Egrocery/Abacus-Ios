import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-appsetting',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './appsetting.page.html',
  styleUrls: ['./appsetting.page.scss'],
})
export class AppsettingPage implements OnInit {

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
    <div style="${headingsStyle}">Account Settings</div>
    <p style="${paragraphStyle}">
      Manage your personal information and account details. You can update your profile, change password, and manage your login details to keep your account secure.
    </p>

    <div style="${headingsStyle}">Notifications</div>
    <p style="${paragraphStyle}">
      Control how you receive notifications from the app. Enable or disable class reminders, practice alerts, and important announcements so you never miss an update.
    </p>

    <div style="${headingsStyle}">Learning Preferences</div>
    <p style="${paragraphStyle}">
      Customize your learning experience. Choose your preferred language, adjust practice reminders, and personalize settings to suit your learning style.
    </p>

    <div style="${headingsStyle}">App Preferences</div>
    <p style="${paragraphStyle}">
      Modify app appearance and behavior. Switch between light and dark mode, adjust font size, and manage app performance settings for a better experience.
    </p>

    <div style="${headingsStyle}">Privacy & Security</div>
    <p style="${paragraphStyle}">
      Your privacy is important to us. View our Privacy Policy, Terms & Conditions, and learn how we protect your data. You can also request account deletion from here.
    </p>

    <div style="${headingsStyle}">Subscriptions & Payments</div>
    <p style="${paragraphStyle}">
      View your active plans, purchase history, and payment details. Manage your subscription and review refund policies easily.
    </p>

    <div style="${headingsStyle}">Help & Support</div>
    <p style="${paragraphStyle}">
      Need help? Check frequently asked questions, contact our support team, or send feedback to improve your experience.
    </p>

    <div style="${headingsStyle}">About App</div>
    <p style="${paragraphStyle}">
      Learn more about AbacusTrainer, app version details, and developer information.
    </p>

    <div style="${headingsStyle}">Logout</div>
    <p style="${paragraphStyle}">
      Sign out securely from your account.
    </p>
  `;

  // ✅ Tell Angular this HTML is safe
  this.formattedAboutText = this.sanitizer.bypassSecurityTrustHtml(html);
}
}


