import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-about-us',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

 formattedAboutText: SafeHtml = '';

  constructor(private navCtrl: NavController, private sanitizer: DomSanitizer,private router: Router, private menu: MenuController) {
    this.buildAboutText();
  }

    async goHome() {
       await this.menu.close();
    this.router.navigate(['/dashboard']);
  }


  ngOnInit(): void {}

  buildAboutText() {
    const headingsStyle = 'color:#4d148c; font-weight:bold; font-size:1.2rem; margin-top:1rem;';
    const subheadingsStyle = 'color:#4d148c; font-weight:bold; font-size:1.1rem; margin-top:0.8rem;';
    const paragraphStyle = 'font-size:1rem; color:#000; line-height:1.5; margin:0.5rem 0 1rem 0;';

    const html = `
      <div style="${headingsStyle}">Who We Are</div>
      <p style="${paragraphStyle}">
        Our Abacus Trainer Team believes that every child holds an essence of imagination, creativity, and profound insight. 
        The ability to reveal this potential can be found in the ancient tools of the Abacus and Vedic Maths. We are an interdisciplinary team integrating
        mathematics, technology, and education. We have empowered over 5,000 children (ages 4-15) with advanced concentration, mental calculation skills, 
        and self-assurance, guiding them to become global achievers.
      </p>

      <div style="${headingsStyle}">What Sets Us Apart</div>

      <div style="${subheadingsStyle}">Certified Expert Instructors</div>
      <p style="${paragraphStyle}">
        We help all learners with Junior Abacus (5 to 8 years) and Advanced Vedic Maths (12 to 15 years) in 6 to 10 progressive levels while tailoring to their
        pace and distinctive strengths.
      </p>

      <div style="${subheadingsStyle}">Flexible, Online Delivery</div>
      <p style="${paragraphStyle}">
        Lessons are accessible via desktop, tablet, or mobile, ensuring regional and global learning is not confined to a time or place. 
        Scheduling during weekdays, weekends, or after-school hours further enhances accessibility.
      </p>

      <div style="${subheadingsStyle}">Transparent Progress Tracking</div>
      <p style="${paragraphStyle}">
        Interactive dashboards with real-time updates and monthly mock assessments give tracking capabilities for achieving milestones, bringing both
        children and parents.
      </p>
    `;

    // ✅ Tell Angular this HTML is safe and preserve styles
    this.formattedAboutText = this.sanitizer.bypassSecurityTrustHtml(html);
  }
}