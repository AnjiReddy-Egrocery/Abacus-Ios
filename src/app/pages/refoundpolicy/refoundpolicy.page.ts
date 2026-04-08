import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-refoundpolicy',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './refoundpolicy.page.html',
  styleUrls: ['./refoundpolicy.page.scss'],
})
export class RefoundpolicyPage implements OnInit {

  
  formattedAboutText: SafeHtml = '';

  constructor(private navCtrl: NavController, private sanitizer: DomSanitizer,private router: Router, private menu: MenuController) {
    this.buildRefundPolicy();
  }

    async goHome() {
       await this.menu.close();
    this.router.navigate(['/dashboard']);
  }


  ngOnInit(): void {}

  buildRefundPolicy() {
    const headingsStyle = 'color:#4d148c; font-weight:bold; font-size:1.2rem; margin-top:1rem;';
    const paragraphStyle = 'font-size:1rem; color:#000; line-height:1.5; margin:0.5rem 0 1rem 0;';

    const headings = [
      "Student Training Fees (Kids Training Programs)",
      "Instructor / Train-the-Trainer Program Fees",
      "Worksheets, Practice Sheets & Digital Downloads",
      "Batch Changes, Class Rescheduling & Missed Classes",
      "Technical Issues",
      "Acceptance of Refund Policy",
      "CONTACT US"
    ];

    const termsText = `
At AbacusTrainer.com, we aim to provide clear, transparent, and student-friendly policies. Please read the following refund terms carefully before enrolling in our programs or purchasing any services.

Student Training Fees (Kids Training Programs)

Students (or parents/guardians) will always receive a demo class before making any payment, ensuring full clarity about the teaching method, curriculum, platform and learning experience.
Student payments can be made in one-time full payment or in 1–2 EMIs, depending on the plan offered at the time of enrolment.
All student fees are strictly non-refundable, regardless of whether the payment was made in full or through EMIs.
If a student decides to drop out in the middle of the course, no refunds will be issued for the remaining or unused classes.
EMI instalments (if chosen) must still be completed, even if the student discontinues the course prematurely.
Seats and schedules are reserved based on enrollment; hence we cannot offer refunds once payment is made.

Instructor / Train-the-Trainer Program Fees

Instructor / Train-the-Trainer Program Fees
No partial refunds, cancellations, or adjustments will be allowed once fees are paid.
Training materials, modules, login access, and learning resources are fully delivered only after payment; therefore refunds are not applicable.

Worksheets, Practice Sheets & Digital Downloads

All worksheet purchases, practice materials, ebooks, downloadable files, and digital content are non-refundable.
Once accessed or downloaded, digital items cannot be returned.
Purchases of worksheets or practice sheets are final and cannot be exchanged or refunded.

Batch Changes, Class Rescheduling & Missed Classes

Refunds are not issued for missed classes.
Class reschedules may be offered at our discretion, depending on availability and validity of the course.
Batch changes may be allowed only when feasible; however, they do not qualify for a refund.

Technical Issues

If you face any technical issue accessing digital content or online classes, our support team will assist in resolving the issue.
However, technical issues do not qualify for refunds, unless the content is proven to be inaccessible due to a fault on our end.

Acceptance of Refund Policy

By completing payment for any student program, instructor training, worksheets, or digital products, you acknowledge and agree:
That you have received a demo session (where applicable)
That you have reviewed the course or material
That all fees are non-refundable
That you accept these terms fully without dispute

CONTACT US

For any queries, feedback or support, contact us at:
Email: info@abacustrainer.com
Address: Narsingi, Gandipet, Hyderabad, Telangana
Contact : 7799121321`;

    // Split by double line breaks for headings/paragraphs
    const lines = termsText.split('\n\n');

    let html = '';

    for (let line of lines) {
      line = line.trim();
      if (headings.includes(line)) {
        html += `<div style="${headingsStyle}">${line}</div>`;
      } else if (line.length > 0) {
        html += `<p style="${paragraphStyle}">${line}</p>`;
      }
    }

    // Make Angular trust this HTML
    this.formattedAboutText = this.sanitizer.bypassSecurityTrustHtml(html);
  }

  
  
}